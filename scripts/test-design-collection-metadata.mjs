import assert from "node:assert/strict";
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
test("Modern public inventory remains the independent 16-page baseline", () => {
  assert.equal(published.length, 16);
  assert.equal(getPublishedDesignRoutes().length, 16);
});

for (const page of published) {
  test(`Modern metadata is exactly unchanged: ${page.path}`, () => {
    const route = identifyDesignRoute(page.path);
    assert(route);
    const actual = createDesignPageMetadata(requestFor(route));
    assert.deepEqual(actual, createPageMetadata(page, siteConfig));
  });
}

for (const styleId of ["heritage", "luxury"]) {
  for (const page of published) {
    test(`${styleId} ${page.path}: Modern canonical, presentation OG, unpublished`, () => {
      const modern = identifyDesignRoute(page.path);
      const request = requestFor(modern, styleId);
      const contract = describeDesignMetadata(request);
      assert.equal(contract.availability, "planned");
      assert.equal(contract.canonicalPath, page.path);
      assert.equal(contract.presentationPath, `/design-collection/${styleId}${page.path === "/" ? "" : page.path}`);
      assert.equal(contract.metadata.alternates.canonical, new URL(page.path, "https://www.xplorekaleidoscope.com").href);
      assert.equal(contract.metadata.openGraph.url, `https://www.xplorekaleidoscope.com${contract.presentationPath}`);
      assert.deepEqual(contract.metadata.robots, { index: false, follow: false });
      assert.equal(contract.metadata.twitter.card, "summary");
      assert(!("images" in contract.metadata.openGraph));
      assert(!("images" in contract.metadata.twitter));
      assert(!("languages" in contract.metadata.alternates));
      assert.equal(createDesignPageMetadata(request), null);
    });
  }
}

test("Gallery metadata stays a plan with its own canonical and OG URL", () => {
  const value = describeDesignMetadata({ pageKey: "collection" });
  assert.equal(value.availability, "planned");
  assert.equal(value.metadata.alternates.canonical, "https://www.xplorekaleidoscope.com/design-collection");
  assert.equal(value.metadata.openGraph.url, "https://www.xplorekaleidoscope.com/design-collection");
  assert.equal(createDesignPageMetadata({ pageKey: "collection" }), null);
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
  assert(!seoPages.some(({ path }) => path.startsWith("/design-collection")));
});
