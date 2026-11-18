import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const basePath = (process.env.XK_PAGES_BASE_PATH ?? "/xk-website").replace(/\/+$/, "");
assert.match(basePath, /^(\/[A-Za-z0-9._~-]+)*$/, "XK_PAGES_BASE_PATH must be empty or a URL path such as /xk-website.");

const result = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, XK_PAGES_EXPORT: "1", XK_PAGES_BASE_PATH: basePath },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = join(root, "out");
// The development tool is never part of a public static deployment. A notFound()
// build normally omits it already; remove any generated route payloads as well.
rmSync(join(output, "dev"), { recursive: true, force: true });
rmSync(join(output, "dev.html"), { force: true });
rmSync(join(output, "dev.txt"), { force: true });
writeFileSync(join(output, ".nojekyll"), "");

assert.ok(existsSync(join(output, "404.html")), "Missing GitHub Pages 404 document.");

function verifyExportedPage(relativePath, label) {
  const path = join(output, relativePath);
  assert.ok(existsSync(path), `Missing exported ${label}.`);
  const html = readFileSync(path, "utf8");
  assert.match(html, /noindex/, `${label} must retain construction-stage noindex metadata.`);
  assert.ok(html.includes(`${basePath}/_next/static/`), `${label} asset URLs do not match the Pages base path.`);
  return html;
}

function tagAttribute(tag, name) {
  return tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function metadataAttribute(html, selectorAttribute, selectorValue, targetAttribute) {
  const tags = html.match(/<(?:meta|link)\b[^>]*>/g) ?? [];
  const tag = tags.find((value) => tagAttribute(value, selectorAttribute) === selectorValue);
  return tagAttribute(tag, targetAttribute);
}

function verifyBrandUrl(value, expectedPath, label) {
  assert.ok(value, `${label} is missing.`);
  const url = new URL(value);
  assert.equal(url.origin, "https://xplorekaleidoscope.com", `${label} origin is incorrect.`);
  assert.equal(url.pathname.replace(/\/$/, ""), expectedPath, `${label} path is incorrect.`);
  assert.equal(url.search, "", `${label} must not contain a query string.`);
  assert.equal(url.hash, "", `${label} must not contain a fragment.`);
}

const assetOrigin = "https://pages.invalid";
const checkedAssets = new Set();

function verifyAsset(reference, fromUrl, label) {
  if (!reference || reference.startsWith("#")) return;
  const url = new URL(reference.replaceAll("&amp;", "&"), fromUrl);
  // Remote and embedded resources are covered by browser/network checks.
  if (url.origin !== assetOrigin) return;

  assert.ok(url.pathname.startsWith(`${basePath}/`), `${label} asset is missing the Pages base path: ${reference}`);
  const relativePath = decodeURIComponent(url.pathname.slice(basePath.length)).replace(/^\/+/, "");
  const assetPath = resolve(output, relativePath);
  assert.ok(assetPath.startsWith(`${output}${sep}`), `${label} asset escapes the output directory: ${reference}`);
  assert.ok(existsSync(assetPath) && statSync(assetPath).isFile(), `${label} references a missing asset: ${reference}`);

  if (checkedAssets.has(assetPath)) return;
  checkedAssets.add(assetPath);
  if (assetPath.endsWith(".css")) {
    const css = readFileSync(assetPath, "utf8");
    for (const match of css.matchAll(/url\(\s*(["']?)([^"'()\s]+)\1\s*\)/g)) {
      verifyAsset(match[2], url, label);
    }
  }
}

function verifyReferencedAssets(html, pagePath, label) {
  const fromUrl = new URL(`${basePath}${pagePath}/`, assetOrigin);
  for (const tag of html.match(/<(?:script|link|img|source|video|audio)\b[^>]*>/g) ?? []) {
    if (tag.startsWith("<link")) {
      const rel = tagAttribute(tag, "rel") ?? "";
      if (/\b(?:stylesheet|preload|modulepreload|icon|apple-touch-icon|mask-icon)\b/.test(rel)) {
        verifyAsset(tagAttribute(tag, "href"), fromUrl, label);
      }
    } else {
      verifyAsset(tagAttribute(tag, "src"), fromUrl, label);
      verifyAsset(tagAttribute(tag, "poster"), fromUrl, label);
      const srcSet = tagAttribute(tag, "srcSet") ?? tagAttribute(tag, "srcset");
      if (srcSet && !srcSet.startsWith("data:")) {
        for (const candidate of srcSet.split(",")) {
          verifyAsset(candidate.trim().split(/\s+/)[0], fromUrl, label);
        }
      }
    }
  }
}

for (const [relativePath, pagePath, label] of [
  ["index.html", "", "homepage"],
  ["about/index.html", "/about", "About Us"],
  ["services/index.html", "/services", "Services"],
  ["solutions/index.html", "/solutions", "Solutions"],
]) {
  const html = verifyExportedPage(relativePath, `${label} page`);
  verifyBrandUrl(metadataAttribute(html, "rel", "canonical", "href"), pagePath, `${label} canonical URL`);
  verifyBrandUrl(metadataAttribute(html, "property", "og:url", "content"), pagePath, `${label} Open Graph URL`);
  const robots = metadataAttribute(html, "name", "robots", "content") ?? "";
  assert.match(robots, /noindex/, `${label} must retain noindex metadata.`);
  assert.match(robots, /nofollow/, `${label} must retain nofollow metadata.`);
  verifyReferencedAssets(html, pagePath, label);

  if (pagePath === "/solutions") {
    const title = "解決方案 | Xplore Kaleidoscope";
    const description = "探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。";
    assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title, "Solutions title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Solutions description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Solutions Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Solutions Open Graph description is incorrect.");
  }
}

function verifyStaticTree(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) verifyStaticTree(path);
    else if (entry.isFile() && /\.(html|txt|json)$/.test(entry.name)) {
      const content = readFileSync(path, "utf8");
      assert.ok(!content.includes("/dev/design-system"), `Development route leaked into ${path}.`);
    }
  }
}
verifyStaticTree(output);
console.log(`GitHub Pages static artifact verified: out/ (base path: ${basePath || "/"}).`);
