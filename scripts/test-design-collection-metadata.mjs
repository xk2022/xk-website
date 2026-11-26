import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { seoPages, seoProtectionPolicy } from "../src/config/seo.ts";
import { siteConfig } from "../src/config/site.ts";
import { createPageMetadata } from "../src/lib/seo.ts";
import { createDesignPageMetadata, describeDesignMetadata } from "../src/lib/design-collection/metadata.ts";
import { getPublishedDesignRoutes, identifyDesignRoute } from "../src/lib/design-collection/routes.ts";

function requestFor(route, styleId = route.styleId) {
  if (route.pageKey === "collection") return { pageKey: "collection" };
  return route.slug === null
    ? { pageKey: route.pageKey, styleId }
    : { pageKey: route.pageKey, styleId, slug: route.slug };
}

const published = seoPages.filter(({ availability }) => availability === "public");
const fixture = JSON.parse(readFileSync(new URL("./fixtures/design-collection-contract.json", import.meta.url), "utf8"));
const modern = fixture.modernRoutes.map(({ path }) => published.find((page) => page.path === path));
test("Modern 16, Gallery and Luxury 16 are the independent exact 33-page public inventory", () => {
  assert.equal(published.length, 33);
  assert.equal(getPublishedDesignRoutes().length, 33);
  assert.equal(modern.length, 16);
  assert.ok(modern.every(Boolean));
  assert.deepEqual(published.map(({ path }) => path).sort(), [...fixture.publishedPaths].sort());
});

for (const page of modern) {
  test(`Modern metadata is exactly unchanged: ${page.path}`, () => {
    const route = identifyDesignRoute(page.path);
    assert(route);
    const actual = createDesignPageMetadata(requestFor(route));
    assert.deepEqual(actual, createPageMetadata(page, siteConfig));
  });
}

for (const styleId of ["heritage", "luxury"]) {
  for (const page of modern) {
    test(`${styleId} ${page.path}: Modern canonical, presentation OG and exact publication state`, () => {
      const modern = identifyDesignRoute(page.path);
      const request = requestFor(modern, styleId);
      const contract = describeDesignMetadata(request);
      assert.equal(contract.availability, styleId === "luxury" ? "public" : "planned");
      assert.equal(contract.canonicalPath, page.path);
      assert.equal(contract.presentationPath, `/design-collection/${styleId}${page.path === "/" ? "" : page.path}`);
      assert.equal(contract.metadata.alternates.canonical, new URL(page.path, "https://www.xplorekaleidoscope.com").href);
      assert.equal(contract.metadata.openGraph.url, `https://www.xplorekaleidoscope.com${contract.presentationPath}`);
      assert.deepEqual(contract.metadata.robots, { index: false, follow: false });
      assert.equal(contract.metadata.twitter.card, "summary");
      assert(!("images" in contract.metadata.openGraph));
      assert(!("images" in contract.metadata.twitter));
      assert(!("languages" in contract.metadata.alternates));
      if (styleId === "luxury") {
        const expected = fixture.luxuryRoutes.find(({ canonicalPath }) => canonicalPath === page.path);
        assert.equal(contract.presentationPath, expected.path);
        const entry = published.find(({ path }) => path === expected.path);
        assert(entry);
        assert.deepEqual(createDesignPageMetadata(request), contract.metadata);
        assert.deepEqual(contract.metadata, { ...createPageMetadata(entry, siteConfig), alternates: { canonical: new URL(expected.canonicalPath, siteConfig.url).href } });
      } else assert.equal(createDesignPageMetadata(request), null);
    });
  }
}

test("Gallery publishes its independently approved copy and self canonical/OG through the shared SEO helper", () => {
  const value = describeDesignMetadata({ pageKey: "collection" });
  assert.equal(value.availability, "public");
  assert.equal(value.metadata.alternates.canonical, "https://www.xplorekaleidoscope.com/design-collection");
  assert.equal(value.metadata.openGraph.url, "https://www.xplorekaleidoscope.com/design-collection");
  const page = published.find(({ path }) => path === fixture.collectionRoute.path);
  assert.deepEqual(page, { path: fixture.collectionRoute.path, title: fixture.collectionRoute.title, description: fixture.collectionRoute.description, availability: "public" });
  assert.deepEqual(createDesignPageMetadata({ pageKey: "collection" }), createPageMetadata(page, siteConfig));
  assert.deepEqual(value.metadata.robots, { index: false, follow: false });
  assert.deepEqual(createDesignPageMetadata({ pageKey: "collection", hash: "design-styles" }), value.metadata);
});

test("Fragments never enter canonical or sharing metadata", () => {
  assert.deepEqual(
    createDesignPageMetadata({ styleId: "modern", pageKey: "contact", hash: "contact-channels" }),
    createDesignPageMetadata({ styleId: "modern", pageKey: "contact" }),
  );
});

for (const input of [null, {}, { styleId: "unknown", pageKey: "home" },
  { styleId: "modern", pageKey: "privacy" },
  { styleId: "modern", pageKey: "technical-project", slug: "unknown" },
  { styleId: "modern", pageKey: "home", origin: "https://unapproved.invalid" },
  { styleId: "modern", pageKey: "quotation", customerName: "PRIVATE_LABEL" }]) {
  test(`Invalid metadata request is rejected: ${JSON.stringify(input)}`, () => {
    assert.equal(describeDesignMetadata(input), null);
    assert.equal(createDesignPageMetadata(input), null);
  });
}

test("Metadata results do not mutate source or later calls", () => {
  const first = createDesignPageMetadata({ styleId: "modern", pageKey: "home" });
  first.description = "CHANGED_BY_CONSUMER";
  assert.deepEqual(createDesignPageMetadata({ styleId: "modern", pageKey: "home" }), createPageMetadata(published[0], siteConfig));
  assert.deepEqual(seoProtectionPolicy, { mode: "protected", publishSitemap: false });
  assert.deepEqual(seoPages.filter(({ path }) => path.startsWith("/design-collection")).map(({ path }) => path).sort(), [fixture.collectionRoute.path, ...fixture.luxuryRoutes.map(({ path }) => path)].sort());
});
