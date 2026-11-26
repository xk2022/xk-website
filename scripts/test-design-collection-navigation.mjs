import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { normalizeDesignPathname, resolveStyleSwitch } from "../src/lib/design-collection/navigation.ts";
import { resolveDesignContentHref } from "../src/lib/design-collection/routes.ts";

const fixture = JSON.parse(readFileSync(new URL("./fixtures/design-collection-contract.json", import.meta.url)));
const names = { modern: "Modern 現代專業", heritage: "Heritage 懷舊復古", luxury: "Luxury 奢華精品" };
const styles = Object.keys(names);
const routeRows = styles.flatMap((styleId) => fixture[`${styleId}Routes`].map((row) => ({
  path: row.path, styleId, pageKey: row.pageKey,
  slug: ["technical-project", "brand-showcase"].includes(row.pageKey) ? row.path.split("/").at(-1) : null,
  anchors: fixture.semanticAnchors[row.pageKey],
})));
const model = {
  styles: styles.map((id) => ({ id, name: names[id], homeHref: fixture.styleHomePaths[id] })),
  routes: [...routeRows, { path: fixture.collectionRoute.path, styleId: null, pageKey: "collection", slug: null, anchors: fixture.collectionRoute.anchors }],
  collectionHref: fixture.collectionRoute.path,
};
const before = JSON.stringify(model);
for (const source of routeRows) for (const style of styles) {
  test(`DC6-NAV ${source.styleId} ${source.path} -> ${style}: identity, slug, public hash and trailing slash`, () => {
    const target = routeRows.find((row) => row.styleId === style && row.pageKey === source.pageKey && row.slug === source.slug);
    const hash = source.anchors.at(-1);
    const actual = resolveStyleSwitch(model, source.path, `#${hash}`, style);
    assert.deepEqual(actual, { styleId: style, name: names[style], href: `${target.path}#${hash}`, current: source.styleId === style, fallback: false, reason: "same-content", hashPreserved: true });
    assert.deepEqual(resolveStyleSwitch(model, source.path === "/" ? "/" : `${source.path}/`, `#${hash}`, style), actual);
    assert.equal(resolveDesignContentHref(source.path, style), target.path);
  });
}
for (const style of styles) {
  test(`DC6-NAV ${style}: Gallery is explicit homepage fallback, never a Modern content page`, () => {
    const actual = resolveStyleSwitch(model, fixture.collectionRoute.path, "#design-styles", style);
    assert.equal(actual.href, fixture.styleHomePaths[style]);
    assert.equal(actual.reason, "gallery");
    assert.equal(actual.fallback, true);
    assert.equal(actual.current, false);
    assert.equal(actual.hashPreserved, false);
  });
  for (const pathname of ["/not-real", "/privacy", "/design-collection/modern", "/design-collection/luxury/portfolio/not-real", "/about?customer=DO_NOT_FORWARD", "//about", "/about//", "/../contact", "/%2e%2e/contact", "/ABOUT", "https://evil.invalid/about", " /about", "/about\\x"]) {
    test(`DC6-NAV ${style}: unavailable/unsafe source ${pathname} has truthful home fallback`, () => {
      const actual = resolveStyleSwitch(model, pathname, "#DO_NOT_FORWARD", style);
      assert.equal(actual.href, fixture.styleHomePaths[style]);
      assert.equal(actual.reason, "unknown-page");
      assert.equal(actual.fallback, true);
      assert.equal(actual.current, false);
      assert.equal(actual.hashPreserved, false);
    });
  }
  for (const hash of ["", "#contact-inquiry-name", "#quotation-customer", "#DC006_QA_NAME", "#who-we-are?customer=private", "##mission", "#%6dission", "#mission/other", "#mission\n", "#<script>"]) {
    test(`DC6-NAV ${style}: do not forward unsupported/private hash ${JSON.stringify(hash)}`, () => {
      const actual = resolveStyleSwitch(model, "/about", hash, style);
      assert.equal(actual.href, routeRows.find((r) => r.styleId === style && r.pageKey === "about").path);
      assert.equal(actual.hashPreserved, false);
    });
  }
}
test("DC6-NAV hash must be declared by both source and target", () => {
  const noTargetAnchor = { ...model, routes: model.routes.map((r) => r.styleId === "heritage" && r.pageKey === "about" ? { ...r, anchors: [] } : r) };
  assert.equal(resolveStyleSwitch(noTargetAnchor, "/about", "#mission", "heritage").hashPreserved, false);
  const noSourceAnchor = { ...model, routes: model.routes.map((r) => r.styleId === "modern" && r.pageKey === "about" ? { ...r, anchors: [] } : r) };
  assert.equal(resolveStyleSwitch(noSourceAnchor, "/about", "#mission", "heritage").hashPreserved, false);
});
test("DC6-NAV a missing counterpart is distinguished from an unknown source", () => {
  const partial = { ...model, routes: model.routes.filter((r) => !(r.styleId === "luxury" && r.pageKey === "about")) };
  const actual = resolveStyleSwitch(partial, "/about", "#mission", "luxury");
  assert.equal(actual.reason, "missing-counterpart");
  assert.equal(actual.href, fixture.styleHomePaths.luxury);
  assert.equal(actual.hashPreserved, false);
  assert.equal(actual.fallback, true);
  assert.equal(resolveStyleSwitch({ ...partial, routes: partial.routes.filter((r) => !(r.styleId === "luxury" && r.pageKey === "home")) }, "/about", "", "luxury"), null);
  assert.equal(resolveStyleSwitch(model, "/", "", "unpublished"), null);
});
test("DC6-NAV preserve external/source/mailto/unknown references without inventing prefixes", () => {
  for (const href of ["mailto:system.xk2022@gmail.com?subject=test", "https://showcase.xplorekaleidoscope.com/march-tangbao/", "https://web.xplorekaleidoscope.com/", "/not-published", "#website-cases"]) {
    for (const style of styles) assert.equal(resolveDesignContentHref(href, style), href);
  }
  for (const style of styles) assert.equal(resolveDesignContentHref("/design-collection#compare-pages", style), "/design-collection#compare-pages");
});
test("DC6-NAV only strict single-trailing-slash paths are normalized", () => {
  assert.equal(normalizeDesignPathname("/"), "/");
  assert.equal(normalizeDesignPathname("/about/"), "/about");
  for (const path of ["/about?x=1", "/about#mission", "/about//", "//about", "/a/../about", "/%61bout", "/about\n", "/about\t", null]) assert.equal(normalizeDesignPathname(path), null);
});
test("DC6-NAV all decisions leave the public model unchanged", () => assert.equal(JSON.stringify(model), before));
