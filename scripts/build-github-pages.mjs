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

const portfolioPages = [
  {
    pagePath: "/portfolio",
    label: "Portfolio",
    title: "技術作品集 | Xplore Kaleidoscope",
    description: "探索 XK 的網站、Java 企業系統與 API 整合展示規劃，了解各專案的背景、技術方向與實際開發狀態。",
  },
  {
    pagePath: "/portfolio/corporate-website",
    label: "Corporate Website portfolio detail",
    title: "XK Corporate Website Showcase | XK 技術作品集",
    description: "XK Corporate Website Showcase 自製展示規劃，目前為 Planned；探索企業網站的品牌資訊、響應式版面與可維護前端方向，尚未提供完整案例系統的實作與部署證據。",
  },
  {
    pagePath: "/portfolio/enterprise-management",
    label: "Enterprise Management portfolio detail",
    title: "XK Enterprise Management System | XK 技術作品集",
    description: "XK Enterprise Management System 自製展示規劃，目前為 Planned；了解 Java 管理系統的流程、資料與權限規劃，模組範圍仍待確認，尚未提供實作完成證據。",
  },
  {
    pagePath: "/portfolio/integration-hub",
    label: "Integration Hub portfolio detail",
    title: "XK Enterprise Integration Hub | XK 技術作品集",
    description: "XK Enterprise Integration Hub 自製展示規劃，目前為 Planned；探索模擬系統之間的 API 與資料交換方向，AI 與 n8n 屬後續規劃，尚未提供實作完成證據。",
  },
];

for (const [relativePath, pagePath, label] of [
  ["index.html", "", "homepage"],
  ["about/index.html", "/about", "About Us"],
  ["services/index.html", "/services", "Services"],
  ["solutions/index.html", "/solutions", "Solutions"],
  ["contact/index.html", "/contact", "Contact"],
  ...portfolioPages.map(({ pagePath, label }) => [`${pagePath.slice(1)}/index.html`, pagePath, label]),
]) {
  const html = verifyExportedPage(relativePath, `${label} page`);
  verifyBrandUrl(metadataAttribute(html, "rel", "canonical", "href"), pagePath, `${label} canonical URL`);
  verifyBrandUrl(metadataAttribute(html, "property", "og:url", "content"), pagePath, `${label} Open Graph URL`);
  const robots = metadataAttribute(html, "name", "robots", "content") ?? "";
  assert.match(robots, /noindex/, `${label} must retain noindex metadata.`);
  assert.match(robots, /nofollow/, `${label} must retain nofollow metadata.`);
  assert.equal(tagAttribute(html.match(/<html\b[^>]*>/)?.[0], "lang"), "zh-TW", `${label} HTML language is incorrect.`);
  verifyReferencedAssets(html, pagePath, label);

  if (pagePath === "/solutions") {
    const title = "解決方案 | Xplore Kaleidoscope";
    const description = "探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。";
    assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title, "Solutions title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Solutions description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Solutions Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Solutions Open Graph description is incorrect.");
  }

  const portfolioPage = portfolioPages.find((page) => page.pagePath === pagePath);
  if (portfolioPage) {
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(head.match(/<title>([^<]*)<\/title>/)?.[1], portfolioPage.title, `${label} title is incorrect.`);
    assert.equal(metadataAttribute(html, "name", "description", "content"), portfolioPage.description, `${label} description is incorrect.`);
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), portfolioPage.title, `${label} Open Graph title is incorrect.`);
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), portfolioPage.description, `${label} Open Graph description is incorrect.`);
    assert.equal(metadataAttribute(html, "property", "og:locale", "content"), "zh_TW", `${label} Open Graph locale is incorrect.`);
    assert.equal(metadataAttribute(html, "property", "og:type", "content"), "website", `${label} Open Graph type is incorrect.`);
  }

  if (pagePath === "/contact") {
    const title = "聯絡我們 | Xplore Kaleidoscope";
    const description = "了解如何與 Xplore Kaleidoscope（XK）討論網站、Java 企業系統、系統整合與 AI 應用需求，查看已確認的聯絡資訊與合作準備事項。";
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(head.match(/<title>([^<]*)<\/title>/)?.[1], title, "Contact title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Contact description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Contact Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Contact Open Graph description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:locale", "content"), "zh_TW", "Contact Open Graph locale is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:type", "content"), "website", "Contact Open Graph type is incorrect.");

    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1, "Contact must have exactly one H1.");
    assert.equal(headings[0][1].replace(/<[^>]*>/g, "").trim(), "從理解需求，開始探索合作可能。", "Contact H1 is incorrect.");
    assert.deepEqual(
      [...main.matchAll(/<section\b[^>]*>/g)].map(([tag]) => tagAttribute(tag, "id")),
      ["contact-hero", "contact-channels", "contact-preparation", "contact-process", "contact-data-note", "contact-next-step"],
      "Contact must retain the six required sections in reading order.",
    );

    // The current milestone has no approved public channels or receiving service.
    // A future channel publication must update these acceptance expectations too.
    assert.ok(main.includes("正式聯絡管道確認中"), "Contact must show the honest unavailable state.");
    assert.ok(main.includes("目前尚未提供可公開的正式聯絡管道；可先了解服務與品牌，後續依確認資訊更新。"), "Contact unavailable-state explanation is missing.");
    const dataNote = main.match(/<section\b[^>]*\bid="contact-data-note"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
    assert.ok(dataNote.includes("本頁提供聯絡與合作準備資訊，目前沒有線上表單或需求提交功能。"), "Contact data note must describe the current no-form mode.");
    assert.ok(dataNote.includes("網站託管服務可能依其服務設定保留存取紀錄；本頁沒有表單，不代表託管服務完全不處理資料。"), "Contact data note must distinguish the page from hosting-provider access records.");
    assert.doesNotMatch(main, /<(?:form|input|textarea|select)\b/i, "Contact must not publish a form or input controls.");
    assert.doesNotMatch(main, /<button\b[^>]*\btype="submit"/i, "Contact must not publish a submit button.");
    assert.doesNotMatch(main, /\bhref="(?:mailto:|tel:)/i, "Contact must not publish an unconfirmed email or phone channel.");
    assert.doesNotMatch(main, /\bhref="[^"]*\/privacy(?:\/|[?#"])/i, "Contact must not link to the unpublished Privacy route.");
  }
}

function collectHtmlFiles(directory, prefix) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) files.push(...collectHtmlFiles(join(directory, entry.name), `${prefix}${entry.name}/`));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(`${prefix}${entry.name}`);
  }
  return files;
}

const portfolioRoot = join(output, "portfolio");
const portfolioSlugs = portfolioPages.flatMap(({ pagePath }) => pagePath.split("/").slice(2));
const exportedPortfolioSlugs = readdirSync(portfolioRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
assert.deepEqual(exportedPortfolioSlugs.sort(), portfolioSlugs.sort(), "Portfolio must export only the three registered detail slugs, without unknown or fallback routes.");
assert.deepEqual(
  collectHtmlFiles(portfolioRoot, "portfolio/").sort(),
  portfolioPages.map(({ pagePath }) => `${pagePath.slice(1)}/index.html`).sort(),
  "Portfolio HTML must contain only the overview and its three registered details.",
);

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
