import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { designCollectionRegistry } from "../src/config/design-collection.ts";
import { seoPages } from "../src/config/seo.ts";
import { describeDesignRoute, getPublishedDesignRoutes, identifyDesignRoute, resolveDesignHref } from "../src/lib/design-collection/routes.ts";

const fixture = JSON.parse(readFileSync(new URL("./fixtures/design-collection-contract.json", import.meta.url), "utf8"));
const requestFor = (route, styleId = "modern") => ({ pageKey: route.pageKey, styleId, ...(route.slug ? { slug: route.slug } : {}) });

test("DC2-ROUTE-01: independent style, nine content keys and collection publication inventory", () => {
  assert.deepEqual(Object.fromEntries(designCollectionRegistry.styles.map(({ id, status }) => [id, status])), fixture.styleStatus);
  assert.equal(designCollectionRegistry.collection.status, fixture.collectionStatus);
  assert.equal(designCollectionRegistry.namespace, fixture.namespace);
  assert.deepEqual(designCollectionRegistry.contentPages.map(({ pageKey }) => pageKey), fixture.contentPageKeys);
  assert.deepEqual(designCollectionRegistry.technicalProjectSlugs, fixture.technicalProjectSlugs);
  assert.deepEqual(designCollectionRegistry.brandShowcaseSlugs, fixture.brandShowcaseSlugs);
});

test("DC3-ROUTE-01: independent exact 17-path publication with the original Modern 16", () => {
  const published = getPublishedDesignRoutes();
  assert.equal(published.length, 17);
  assert.deepEqual(published.map(({ presentationPath }) => presentationPath).sort(), [...fixture.publishedPaths].sort());
  assert.deepEqual(published.filter(({ styleId }) => styleId === "modern").map(({ presentationPath }) => presentationPath), fixture.modernRoutes.map(({ path }) => path));
  assert.ok(published.every(({ styleId, availability }) => (styleId === "modern" || styleId === null) && availability === "public"));
  assert.deepEqual(published.map(({ presentationPath }) => presentationPath).sort(), seoPages.filter(({ availability }) => availability === "public").map(({ path }) => path).sort());
});

for (const route of fixture.modernRoutes) {
  test(`DC2-ROUTE-MODERN: ${route.path} round trips and keeps its metadata paths`, () => {
    const request = requestFor(route);
    const actual = describeDesignRoute(request);
    assert.deepEqual(actual, { ...request, slug: route.slug ?? null, canonicalPath: route.path, presentationPath: route.path, availability: "public", hash: null, hashPreserved: false });
    assert.equal(resolveDesignHref(request), route.path);
    assert.deepEqual(identifyDesignRoute(route.path), actual);
    assert.deepEqual(identifyDesignRoute(route.path === "/" ? "/" : route.path + "/"), actual);
    assert.deepEqual(identifyDesignRoute("https://www.xplorekaleidoscope.com" + route.path), actual);
  });
}

for (const styleId of ["heritage", "luxury"]) {
  test(`DC2-ROUTE-PLANNED: all ${styleId} 16 destinations have Modern canonicals but no hrefs`, () => {
    for (const route of fixture.modernRoutes) {
      const request = requestFor(route, styleId);
      const expected = fixture.namespace + "/" + styleId + (route.path === "/" ? "" : route.path);
      const descriptor = describeDesignRoute(request);
      assert.equal(descriptor.canonicalPath, route.path);
      assert.equal(descriptor.presentationPath, expected);
      assert.equal(descriptor.availability, "planned");
      assert.equal(resolveDesignHref(request), null);
      assert.deepEqual(identifyDesignRoute(expected), descriptor);
      assert.deepEqual(identifyDesignRoute(expected + "/"), descriptor);
    }
  });
}

test("DC3-ROUTE-02: Gallery is public without a style and only preserves its two declared anchors", () => {
  const descriptor = describeDesignRoute({ pageKey: "collection" });
  assert.deepEqual(descriptor, { pageKey: "collection", styleId: null, slug: null, canonicalPath: "/design-collection", presentationPath: "/design-collection", availability: "public", hash: null, hashPreserved: false });
  assert.deepEqual(describeDesignRoute({ pageKey: "collection", styleId: null }), descriptor);
  assert.deepEqual(identifyDesignRoute("/design-collection/"), descriptor);
  assert.equal(resolveDesignHref({ pageKey: "collection" }), fixture.collectionRoute.path);
  assert.deepEqual(designCollectionRegistry.collectionAnchors, fixture.collectionRoute.anchors);
  for (const hash of fixture.collectionRoute.anchors) {
    const request = { pageKey: "collection", hash };
    const expected = { ...descriptor, hash, hashPreserved: true };
    assert.deepEqual(describeDesignRoute(request), expected);
    assert.equal(resolveDesignHref(request), `${fixture.collectionRoute.path}#${hash}`);
    assert.deepEqual(identifyDesignRoute(`${fixture.collectionRoute.path}#${hash}`), expected);
  }
  for (const hash of ["contact-form", "quotation-results", "PRIVATE_CUSTOMER", "design-styles%2Fprivate"]) {
    assert.deepEqual(describeDesignRoute({ pageKey: "collection", hash }), descriptor);
    assert.equal(resolveDesignHref({ pageKey: "collection", hash }), fixture.collectionRoute.path);
  }
});

test("DC2-ROUTE-04: future 49-route formula is collision-free without publishing plans", () => {
  const paths = new Set([describeDesignRoute({ pageKey: "collection" }).presentationPath]);
  for (const styleId of Object.keys(fixture.styleStatus)) for (const route of fixture.modernRoutes) paths.add(describeDesignRoute(requestFor(route, styleId)).presentationPath);
  assert.equal(paths.size, 49);
  assert.deepEqual(fixture.stages.map(({ total }) => total), [16, 17, 33, 49]);
  for (const stage of fixture.stages) assert.equal(stage.modern + stage.collection + stage.heritage + stage.luxury, stage.total);
  assert.equal(getPublishedDesignRoutes().length, fixture.stages[1].total);
});

for (const example of fixture.anchorExamples) {
  test(`DC2-ROUTE-ANCHOR: preserves only declared ${example.href}`, () => {
    const request = { pageKey: example.pageKey, styleId: "modern", ...(example.slug ? { slug: example.slug } : {}), hash: example.hash };
    const descriptor = describeDesignRoute(request);
    assert.equal(descriptor.hash, example.hash);
    assert.equal(descriptor.hashPreserved, true);
    assert.equal(resolveDesignHref(request), example.href);
    assert.deepEqual(identifyDesignRoute(example.href), descriptor);
    assert.deepEqual(describeDesignRoute({ ...request, hash: "#" + example.hash }), descriptor);
    assert.ok(!descriptor.canonicalPath.includes("#") && !descriptor.presentationPath.includes("#"));
  });
}

test("DC2-ROUTE-05: unknown and unsafe fragments are dropped without retaining personal text", () => {
  for (const hash of ["", "missing-section", "contact?email=PRIVATE", "customerName=PRIVATE", "../contact", "contact%2Fsecret", "#contact#other"]) {
    const route = describeDesignRoute({ pageKey: "contact", styleId: "modern", hash });
    assert.equal(route.hash, null);
    assert.equal(route.hashPreserved, false);
    assert.equal(resolveDesignHref({ pageKey: "contact", styleId: "modern", hash }), "/contact");
    assert.ok(!JSON.stringify(route).includes("PRIVATE"));
  }
  assert.equal(identifyDesignRoute("/contact#unknown").hashPreserved, false);
});

test("DC2-ROUTE-06: planned styles do not claim Modern anchors already exist", () => {
  const descriptor = describeDesignRoute({ pageKey: "contact", styleId: "heritage", hash: "contact-form" });
  assert.equal(descriptor.hash, null);
  assert.equal(descriptor.hashPreserved, false);
  assert.equal(resolveDesignHref({ pageKey: "contact", styleId: "heritage", hash: "contact-form" }), null);
});

const invalidRequests = [
  null, undefined, false, 1, "home", [], {}, new Date(),
  { styleId: "unknown", pageKey: "home" }, { styleId: "Modern", pageKey: "home" },
  { pageKey: "home" }, { styleId: "modern", pageKey: "privacy" }, { styleId: "modern", pageKey: "dev" },
  { styleId: "modern", pageKey: "collection" }, { styleId: "heritage", pageKey: "collection" },
  { pageKey: "collection", slug: "about" }, { pageKey: "collection", slug: undefined },
  { styleId: "modern", pageKey: "about", slug: "corporate-website" },
  { styleId: "modern", pageKey: "about", slug: undefined },
  { styleId: "modern", pageKey: "technical-project" },
  { styleId: "modern", pageKey: "technical-project", slug: "unknown" },
  { styleId: "modern", pageKey: "technical-project", slug: "march-tangbao" },
  { styleId: "modern", pageKey: "brand-showcase", slug: "corporate-website" },
  { styleId: "modern", pageKey: "brand-showcase", slug: "demo-001" },
  { styleId: "modern", pageKey: "brand-showcase", slug: "../qiangang-windows" },
  { styleId: "modern", pageKey: "brand-showcase", slug: "qiangang-windows%2Fprivate" },
  { styleId: "modern", pageKey: "brand-showcase", slug: "qiangang-windows?email=PRIVATE" },
  { styleId: "modern", pageKey: "home", hash: 7 },
  { styleId: "heritage", pageKey: "home", allowPlanned: true },
  { styleId: "modern", pageKey: "home", customerName: "PRIVATE" },
  Object.assign(Object.create({ styleId: "modern" }), { pageKey: "home" }),
];
test("DC2-ROUTE-07: invalid identities/combinations/data and planned-link bypass attempts fail closed", () => {
  for (const request of invalidRequests) {
    assert.equal(describeDesignRoute(request), null);
    assert.equal(resolveDesignHref(request), null);
  }
});

const rejectedPaths = [
  "", "about", "?email=PRIVATE", "#contact", "/modern", "/modern/about", "/design-collection/modern", "/design-collection/modern/about",
  "/privacy", "/dev/design-system", "/sitemap.xml", "/api/contact", "/services/website-development",
  "/design-collection/unknown", "/design-collection/heritage/privacy", "/design-collection/luxury/dev/design-system",
  "/design-collection/heritage/services/website-development", "/design-collection/luxury/portfolio/unknown",
  "/portfolio/showcases/demo-001", "/portfolio/corporate-website/other", "/about//", "//www.xplorekaleidoscope.com/about",
  "/about/../contact", "/about/./", "/%61bout", "/portfolio/showcases/qiangang-windows%2Fprivate", "/about/%2e%2e/contact",
  "/about\\..\\contact", "/about?email=PRIVATE", "/contact#contact-form?name=PRIVATE", "/about\n",
  "https://example.com/about", "https://xplorekaleidoscope.com/about", "https://xk2022.github.io/xk-website/about",
  "http://www.xplorekaleidoscope.com/about", "https://www.xplorekaleidoscope.com.evil.example/about",
  "https://user@www.xplorekaleidoscope.com/about", "https://www.xplorekaleidoscope.com/about/../contact",
  "https://www.xplorekaleidoscope.com/about?project=PRIVATE", "mailto:system.xk2022@gmail.com",
  "/" + "a".repeat(5000), "/about#" + "a".repeat(5000),
];
test("DC2-ROUTE-08: strict reverse lookup rejects unknowns, aliases, traversal, query PII and external destinations", () => {
  for (const path of rejectedPaths) assert.equal(identifyDesignRoute(path), null, path);
  for (const value of [null, undefined, {}, [], 42]) assert.equal(identifyDesignRoute(value), null);
});

test("DC2-ROUTE-09: declared global/semantic anchors do not cross page boundaries", () => {
  assert.equal(resolveDesignHref({ pageKey: "about", styleId: "modern", hash: "approach" }), "/about#approach");
  assert.equal(resolveDesignHref({ pageKey: "about", styleId: "modern", hash: "contact-form" }), "/about");
  assert.equal(resolveDesignHref({ pageKey: "home", styleId: "modern", hash: "main-content" }), "/#main-content");
  assert.equal(resolveDesignHref({ pageKey: "contact", styleId: "modern", hash: "contact-inquiry-email" }), "/contact");
});

test("DC2-ROUTE-10: descriptions and lookups do not mutate requests or publication state", () => {
  const request = Object.freeze({ styleId: "modern", pageKey: "services", hash: "pricing-guide" });
  const before = JSON.stringify(designCollectionRegistry);
  assert.equal(resolveDesignHref(request), "/services#pricing-guide");
  identifyDesignRoute("/design-collection/luxury/quotation");
  assert.equal(JSON.stringify(designCollectionRegistry), before);
  assert.equal(request.hash, "pricing-guide");
  assert.ok(Object.isFrozen(designCollectionRegistry) && Object.isFrozen(designCollectionRegistry.styles));
  assert.ok(Object.isFrozen(getPublishedDesignRoutes()) && Object.isFrozen(describeDesignRoute(request)));
});
