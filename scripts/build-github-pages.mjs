import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const basePath = (process.env.XK_PAGES_BASE_PATH ?? "/xk-website").replace(/\/+$/, "");
assert.match(basePath, /^(\/[A-Za-z0-9._~-]+)*$/, "XK_PAGES_BASE_PATH must be empty or a URL path such as /xk-website.");
const { privacyPolicy, privacyDraftMarker, privacyPageMetadata } = await import(new URL("../src/config/privacy.ts", import.meta.url));
const { websiteShowcases } = await import(new URL("../src/config/website-showcases.ts", import.meta.url));
const [{ seoPages, getSeoPage, seoProtectionPolicy }, { siteConfig }, seo, navigation] = await Promise.all([
  import(new URL("../src/config/seo.ts", import.meta.url)),
  import(new URL("../src/config/site.ts", import.meta.url)),
  import(new URL("../src/lib/seo.ts", import.meta.url)),
  import(new URL("../src/config/navigation.ts", import.meta.url)),
]);
assert.deepEqual(seoProtectionPolicy, { mode: "protected", publishSitemap: false }, "SEO protection must remain enabled.");
assert.ok(["draft", "approved"].includes(privacyPolicy.status), "Unknown Privacy policy status.");
const privacyApproved = privacyPolicy.status === "approved";
const privacySectionIds = ["policy-scope", "data-collection", "data-use", "retention", "third-parties", "cookies-tracking", "your-rights", "privacy-contact", "policy-updates"];
assert.deepEqual(privacyPolicy.sections.map(({ id }) => id), privacySectionIds, "Privacy must retain its nine required sections.");

if (privacyApproved) {
  // Structural consistency only; this cannot establish owner/legal approval.
  assert.ok(privacyPolicy.version?.trim() && !/^draft/i.test(privacyPolicy.version), "Approved Privacy requires a non-draft version.");
  assert.ok(privacyPolicy.controllerName?.trim(), "Approved Privacy requires a confirmed controller.");
  assert.match(privacyPolicy.effectiveDate ?? "", /^\d{4}-\d{2}-\d{2}$/, "Approved Privacy requires an effective date.");
  const date = new Date(`${privacyPolicy.effectiveDate}T00:00:00Z`);
  assert.ok(!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === privacyPolicy.effectiveDate, "Privacy effective date is invalid.");
  assert.ok(privacyPolicy.rightsContact?.label.trim(), "Approved Privacy requires a rights-contact label.");
  const contact = new URL(privacyPolicy.rightsContact.href);
  assert.ok(
    (contact.protocol === "https:" && !!contact.hostname && !contact.username && !contact.password) ||
    (contact.protocol === "mailto:" && /^[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(contact.pathname) && !contact.search && !contact.hash),
    "Approved Privacy requires a valid HTTPS or mailto rights contact.",
  );
}

const result = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, XK_PAGES_EXPORT: "1", XK_PAGES_BASE_PATH: basePath, XK_PRIVACY_PREVIEW: "0" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = join(root, "out");
// The development tool is never part of a public static deployment. A notFound()
// build normally omits it already; remove any generated route payloads as well.
rmSync(join(output, "dev"), { recursive: true, force: true });
rmSync(join(output, "dev.html"), { force: true });
rmSync(join(output, "dev.txt"), { force: true });
if (!privacyApproved) {
  rmSync(join(output, "privacy"), { recursive: true, force: true });
  rmSync(join(output, "privacy.html"), { force: true });
  rmSync(join(output, "privacy.txt"), { force: true });
  assert.ok(!readdirSync(output).some((name) => name === "privacy" || name.startsWith("privacy.")), "Draft Privacy route or payload remains in the public export.");
}
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
    title: "作品展示 | Xplore Kaleidoscope",
    description: "瀏覽 XK 的品牌網站展示、一頁式網站範例與技術展示規劃，探索餐飲、禮贈及工業情境的網站內容與介面風格。",
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

const exportedPages = [
  ["index.html", "", "homepage"],
  ["about/index.html", "/about", "About Us"],
  ["services/index.html", "/services", "Services"],
  ["solutions/index.html", "/solutions", "Solutions"],
  ["contact/index.html", "/contact", "Contact"],
  ...(privacyApproved ? [["privacy/index.html", "/privacy", "Privacy"]] : []),
  ...portfolioPages.map(({ pagePath, label }) => [`${pagePath.slice(1)}/index.html`, pagePath, label]),
];

for (const [relativePath, pagePath, label] of exportedPages) {
  const html = verifyExportedPage(relativePath, `${label} page`);
  verifyBrandUrl(metadataAttribute(html, "rel", "canonical", "href"), pagePath, `${label} canonical URL`);
  verifyBrandUrl(metadataAttribute(html, "property", "og:url", "content"), pagePath, `${label} Open Graph URL`);
  const robots = metadataAttribute(html, "name", "robots", "content") ?? "";
  assert.match(robots, /noindex/, `${label} must retain noindex metadata.`);
  assert.match(robots, /nofollow/, `${label} must retain nofollow metadata.`);
  assert.equal(tagAttribute(html.match(/<html\b[^>]*>/)?.[0], "lang"), "zh-TW", `${label} HTML language is incorrect.`);
  verifyReferencedAssets(html, pagePath, label);
  verifySeoMetadata(html, getSeoPage(pagePath || "/"), label);

  if (pagePath === "/solutions") {
    const title = "解決方案 | Xplore Kaleidoscope";
    const description = "探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。";
    assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title, "Solutions title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Solutions description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Solutions Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Solutions Open Graph description is incorrect.");
  }

  const portfolioPage = portfolioPages.find((page) => page.pagePath === pagePath);
  if (pagePath === "/portfolio") {
    const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.equal(websiteShowcases.length, 10, "Portfolio must retain six brand entries and four template samples.");
    assert.equal(new Set(websiteShowcases.map(({ id }) => id)).size, 10, "Website showcase IDs must be unique.");
    const brandOrder = ["march-tangbao", "hongjia-birdnest", "yupinyuan-bento", "campaign-website-design", "honest-diecut", "qiangang-windows"];
    assert.deepEqual(websiteShowcases.filter(({ kind }) => kind === "brand-demo").map(({ id }) => id), brandOrder, "Keep the owner-approved brand order.");
    let previousPosition = -1;
    for (const id of brandOrder) {
      const position = visibleHtml.indexOf(`data-showcase-id="${id}"`);
      assert.ok(position > previousPosition, `Incorrect rendered brand order: ${id}.`);
      previousPosition = position;
    }
    for (const id of ["website-cases", "website-samples", "portfolio-projects"]) {
      assert.ok(visibleHtml.includes(`id="${id}"`), `Missing Portfolio category anchor: ${id}.`);
    }
    for (const showcase of websiteShowcases) {
      if (showcase.availability === "preparing") {
        assert.equal(showcase.href, null, "Preparing entries must not expose unavailable links.");
        assert.equal(showcase.image, null, "Preparing entries must not fabricate previews.");
        assert.ok(visibleHtml.includes(`data-showcase-id="${showcase.id}" data-showcase-state="preparing"`), "Missing explicit preparing state.");
        continue;
      }
      assert.ok(visibleHtml.includes(`href="${showcase.href}"`), `Missing public showcase link: ${showcase.id}.`);
      assert.ok(visibleHtml.includes(`src="${basePath}${showcase.image.src}"`), `Incorrect showcase preview base path: ${showcase.id}.`);
      assert.ok(existsSync(join(output, showcase.image.src)), `Missing local preview: ${showcase.id}.`);
      if (showcase.kind === "template") {
        assert.ok(showcase.attribution?.href && visibleHtml.includes(`href="${showcase.attribution.href}"`), `Missing template attribution: ${showcase.id}.`);
      }
    }
  }
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
    if (!privacyApproved) {
      assert.doesNotMatch(main, /\bhref="[^"]*\/privacy(?:\/|[?#"])/i, "Contact must not link to the unpublished Privacy route.");
    }
  }

  if (pagePath === "/privacy") {
    const title = "隱私權政策 | Xplore Kaleidoscope";
    const description = "了解 Xplore Kaleidoscope 網站的個人資料處理、第三方服務與隱私權相關資訊。";
    assert.equal(privacyPageMetadata.title, title, "Privacy metadata config title is incorrect.");
    assert.equal(privacyPageMetadata.description, description, "Privacy metadata config description is incorrect.");
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(head.match(/<title>([^<]*)<\/title>/)?.[1], title, "Privacy title is incorrect.");
    assert.equal(metadataAttribute(html, "name", "description", "content"), description, "Privacy description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:title", "content"), title, "Privacy Open Graph title is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:description", "content"), description, "Privacy Open Graph description is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:locale", "content"), "zh_TW", "Privacy Open Graph locale is incorrect.");
    assert.equal(metadataAttribute(html, "property", "og:type", "content"), "website", "Privacy Open Graph type is incorrect.");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1, "Privacy must have exactly one H1.");
    assert.equal(headings[0][1].replace(/<[^>]*>/g, "").trim(), "隱私權政策", "Privacy H1 is incorrect.");
    assert.deepEqual([...main.matchAll(/<section\b[^>]*>/g)].map(([tag]) => tagAttribute(tag, "id")), privacySectionIds, "Privacy section order is incorrect.");
    const text = decodePublicText(main);
    assert.ok(text.includes(privacyPolicy.version) && text.includes(privacyPolicy.effectiveDate), "Privacy version or effective date is missing.");
    assert.ok(!text.includes(privacyDraftMarker), "Approved Privacy must not render the draft marker.");
  }
}

function verifySeoMetadata(html, page, label) {
  assert.equal(page.availability, "public", `${label} must be public in the SEO registry.`);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const titles = [...head.matchAll(/<title>([^<]*)<\/title>/g)];
  assert.equal(titles.length, 1, `${label} must have one HTML title.`);
  assert.equal(decodePublicText(titles[0][1]), page.title, `${label} exact SEO title is incorrect.`);
  const tags = head.match(/<(?:meta|link)\b[^>]*>/g) ?? [];
  function oneValue(attribute, value, target = "content") {
    const matches = tags.filter((tag) => tagAttribute(tag, attribute) === value);
    assert.equal(matches.length, 1, `${label} must have one ${value} metadata entry.`);
    return decodePublicText(tagAttribute(matches[0], target) ?? "");
  }
  assert.equal(oneValue("name", "description"), page.description, `${label} exact SEO description is incorrect.`);
  const canonical = oneValue("rel", "canonical", "href");
  const openGraphUrl = oneValue("property", "og:url");
  const expectedUrl = seo.getBrandUrl(page.path, siteConfig.url);
  for (const url of [canonical, openGraphUrl]) {
    verifyBrandUrl(url, page.path === "/" ? "" : page.path, `${label} SEO URL`);
    assert.equal(url.replace(/\/$/, ""), expectedUrl.replace(/\/$/, ""), `${label} SEO URL differs from the registry.`);
  }
  for (const [name, value] of [
    ["og:title", page.title], ["og:description", page.description],
    ["og:site_name", siteConfig.name], ["og:locale", "zh_TW"], ["og:type", "website"],
  ]) assert.equal(oneValue("property", name), value, `${label} ${name} is incorrect.`);
  for (const [name, value] of [["twitter:card", "summary"], ["twitter:title", page.title], ["twitter:description", page.description]]) {
    assert.equal(oneValue("name", name), value, `${label} ${name} is incorrect.`);
  }
  const robots = new Set(oneValue("name", "robots").toLowerCase().split(/[,\s]+/));
  assert.ok(robots.has("noindex") && robots.has("nofollow"), `${label} must retain both index protections.`);
  assert.ok(!robots.has("index") && !robots.has("follow"), `${label} must not contain contradictory index directives.`);
  for (const tag of tags) {
    const name = tagAttribute(tag, "name") ?? tagAttribute(tag, "property") ?? "";
    assert.ok(!/^og:image(?::|$)|^twitter:(?:image|site|creator)(?::|$)/.test(name), `${label} contains an unapproved share image or social handle.`);
    assert.equal(tagAttribute(tag, "hreflang"), undefined, `${label} must not invent language alternates.`);
  }
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((match) => tagAttribute(match[1], "type") === "application/ld+json");
  assert.equal(scripts.length, 1, `${label} must contain exactly one WebSite JSON-LD script.`);
  assert.ok(!scripts[0][2].includes("<"), `${label} JSON-LD must escape HTML-sensitive text.`);
  const website = JSON.parse(scripts[0][2]);
  assert.deepEqual(website, {
    "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name,
    url: new URL("/", siteConfig.url).href, inLanguage: "zh-TW",
  }, `${label} JSON-LD must contain only the five true WebSite fields.`);
  assert.deepEqual(website, seo.createWebsiteJsonLd(siteConfig), `${label} JSON-LD differs from the shared source.`);
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

const publicSeoPages = seoPages.filter(({ availability }) => availability === "public");
const publicPaths = new Set(publicSeoPages.map(({ path }) => path));
assert.equal(new Set(seoPages.map(({ path }) => path)).size, seoPages.length, "SEO registry paths must be unique.");
assert.deepEqual([...publicPaths].sort(), exportedPages.map(([, path]) => path || "/").sort(), "SEO public paths must match every required exported page.");
assert.equal(getSeoPage("/privacy").availability, privacyApproved ? "public" : "draft", "Privacy SEO availability must match its publication state.");
const errorHtml = new Set(["404.html", "404/index.html", "_not-found/index.html"]);
assert.deepEqual(
  collectHtmlFiles(output, "").filter((path) => !errorHtml.has(path)).sort(),
  exportedPages.map(([path]) => path).sort(),
  "SEO registry must match all actual public HTML; unknown routes must not be silently excluded.",
);
for (const route of navigation.plannedRoutes) {
  assert.equal(publicPaths.has(route.path), route.status === "implemented", `${route.path} navigation and SEO availability disagree.`);
}
for (const link of [...navigation.primaryNavigation, navigation.contactNavigation]) {
  assert.ok(publicPaths.has(new URL(link.href, siteConfig.url).pathname), "Navigation must target a public SEO page.");
}
for (const page of portfolioPages) {
  const seoPage = getSeoPage(page.pagePath);
  assert.equal(seoPage.title, page.title, "Portfolio SEO title must retain its exact content.");
  assert.equal(seoPage.description, page.description, "Portfolio SEO description must retain its exact content.");
}

const robotsPath = join(output, "robots.txt");
assert.ok(existsSync(robotsPath), "Missing protected robots.txt export.");
const expectedRobots = seo.createRobotsMetadata(basePath, seoPages);
const rules = {
  userAgent: "*", allow: `${basePath}/`,
  disallow: [`${basePath}/dev/`, ...seoPages.filter(({ availability }) => availability === "draft").map(({ path }) => `${basePath}${path}`)],
};
assert.deepEqual(expectedRobots, { rules }, "Robots must allow public noindex reading and exclude only development/draft paths.");
const robotLines = readFileSync(robotsPath, "utf8").split(/\r?\n/).map((line) => line.split("#")[0].trim()).filter(Boolean);
assert.deepEqual(
  robotLines.map((line) => line.replace(/^([^:]+):\s*/, (_, name) => `${name.toLowerCase()}: `)).sort(),
  ["user-agent: *", `allow: ${rules.allow}`, ...rules.disallow.map((path) => `disallow: ${path}`)].sort(),
  "Robots output must match its exact protected rules, without Sitemap or nonstandard Noindex directives.",
);
assert.ok(!readdirSync(output).some((name) => /^sitemap(?:\.|$)/i.test(name)), "Protected mode must not publish a sitemap document, route or payload.");

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

function decodePublicText(text) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
  for (let pass = 0; pass < 2; pass++) {
    text = text.replaceAll("\\\\", "\\").replaceAll('\\"', '"')
      .replace(/\\u([\da-f]{4})/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
      .replace(/&#(x[\da-f]+|\d+);/gi, (entity, code) => {
        const point = parseInt(code.replace(/^x/i, ""), /^x/i.test(code) ? 16 : 10);
        return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
      })
      .replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => entities[name]);
  }
  return text;
}

if (!privacyApproved) {
  const draftMarkers = [privacyDraftMarker, ...privacyPolicy.sections.flatMap(({ paragraphs }) => paragraphs)];
  assert.ok(draftMarkers.every((marker) => typeof marker === "string" && marker.trim()), "Privacy draft markers must contain real review text.");
  function verifyNoDraftText(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) verifyNoDraftText(path);
      else if (entry.isFile() && /\.(html|txt|json|js|mjs|map|css|svg|xml|webmanifest)$/.test(entry.name)) {
        const text = decodePublicText(readFileSync(path, "utf8"));
        assert.ok(!draftMarkers.some((marker) => text.includes(marker)), `Unapproved Privacy draft text leaked into ${path}.`);
      }
    }
  }
  verifyNoDraftText(output);
}
console.log(`GitHub Pages static artifact verified: out/ (base path: ${basePath || "/"}).`);
