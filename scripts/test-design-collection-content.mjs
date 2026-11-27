import assert from "node:assert/strict";
import test from "node:test";

import * as site from "../src/config/site.ts";
import * as about from "../src/config/about.ts";
import * as home from "../src/config/homepage.ts";
import * as services from "../src/config/services.ts";
import * as plans from "../src/config/service-plans.ts";
import * as solutions from "../src/config/solutions.ts";
import * as related from "../src/config/solution-showcases.ts";
import * as portfolio from "../src/config/portfolio.ts";
import * as websites from "../src/config/website-showcases.ts";
import * as contact from "../src/config/contact.ts";
import * as contactPage from "../src/config/contact-page.ts";
import * as contactInquiry from "../src/config/contact-inquiry.ts";
import * as inquiry from "../src/config/inquiry.ts";
import * as quotation from "../src/config/quotation.ts";

// Capture sources, including Lucide objects, before the adapter is evaluated.
const originalState = new Map();
function capture(value) {
  if (value === null || !["object", "function"].includes(typeof value) || originalState.has(value)) return;
  const descriptors = Object.getOwnPropertyDescriptors(value);
  originalState.set(value, { frozen: Object.isFrozen(value), descriptors });
  if (typeof value === "function") return;
  for (const descriptor of Object.values(descriptors)) {
    if ("value" in descriptor) capture(descriptor.value);
  }
}
for (const configExports of [site, about, home, services, plans, solutions, related, portfolio,
  websites, contact, contactPage, contactInquiry, inquiry, quotation]) {
  Object.values(configExports).forEach(capture);
}

const {
  getDesignContent,
  getDesignService,
  getDesignSolution,
  getDesignProject,
  getDesignWebsiteShowcase,
} = await import("../src/lib/design-collection/content.ts");
const content = getDesignContent();

// Independent acceptance facts: do not derive order, states or prices from adapter output.
const serviceIds = ["website-development", "java-enterprise", "system-integration", "ai-automation", "cloud-infrastructure"];
const solutionIds = ["digital-presence", "enterprise-management", "system-integration", "ai-workflow"];
const projectIds = ["corporate-website", "enterprise-management", "integration-hub"];
const brandIds = ["march-tangbao", "hongjia-birdnest", "yupinyuan-bento", "campaign-website-design", "honest-diecut", "qiangang-windows"];
const buildIds = ["lp", "brand", "corp", "shop", "app", "app-optimization", "ai-chatbot", "ai-rag", "ai-custom"];
const addonIds = ["ai-images", "logo", "brand-visual", "copywriting", "product-content", "multilingual", "line-integration", "advanced-seo", "analytics", "inquiry-form", "booking", "payment", "membership", "content-cms", "domain", "hosting", "annual-maintenance"];

function visit(value, inspect, path = "content") {
  inspect(value, path);
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) visit(child, inspect, `${path}.${key}`);
  }
}

test("DC-CONTENT-01: one style-neutral snapshot has the eight content domains", () => {
  assert.equal(getDesignContent(), content);
  assert.deepEqual(Object.keys(content), ["site", "about", "home", "services", "solutions", "portfolio", "contact", "quotation"]);
  for (const style of ["modern", "heritage", "luxury"]) assert.equal(Object.hasOwn(content, style), false);
});

test("DC-CONTENT-02: the established brand and root origin remain exact", () => {
  assert.equal(content.site.name, "Xplore Kaleidoscope");
  assert.equal(content.site.url, "https://www.xplorekaleidoscope.com");
  assert.equal(content.site.locale, "zh-TW");
  assert.deepEqual(content.site, site.siteConfig);
});

test("DC-CONTENT-03: unconfirmed founder fields stay null", () => {
  assert.equal(content.about.founder.name, null);
  assert.equal(content.about.founder.photo, null);
  assert.deepEqual(content.about.founder, about.founderProfile);
});

test("DC-CONTENT-04: about content keeps public copy and drops presentation icons", () => {
  assert.deepEqual(content.about.page.titleLines, ["探索可能性，", "創造數位價值。"]);
  assert.equal(content.about.page.mission.pillars.length, 3);
  assert.equal(content.about.commitments.length, 4);
  assert.equal(content.about.capabilities.length, 5);
  assert.equal(content.about.approach.length, 5);
  assert.equal(Object.hasOwn(content.about.page.mission.pillars[0], "Icon"), false);
  assert.equal(content.about.page.whoWeAre.operatingModel, about.aboutPage.whoWeAre.operatingModel);
});

test("DC-CONTENT-05: Home Maintenance is not renamed to the detailed cloud category", () => {
  assert.deepEqual(content.home.services.map(({ id }) => id), ["R01", "R02", "R03", "R04", "R05"]);
  assert.equal(content.home.services[4].name, "系統維護與技術支援");
  assert.equal(content.home.services[4].anchor, "maintenance");
  assert.equal(content.home.services[4].serviceId, "cloud-infrastructure");
  assert.equal(content.services.categories[4].title, "雲端與基礎架構");
  assert.deepEqual(content.services.categories.map(({ id }) => id), serviceIds);
});

test("DC-CONTENT-06: Home technology, value and proposed directions remain source content", () => {
  assert.deepEqual(content.home.hero, home.homepageHero);
  assert.deepEqual(content.home.technologyGroups, home.technologyGroups);
  assert.deepEqual(content.home.valuePropositions, home.valuePropositions);
  assert.deepEqual(content.home.solutionDirections.map(({ solutionId }) => solutionId), ["digital-presence", "enterprise-management", "ai-workflow"]);
  assert.ok(content.home.solutionDirections.every(({ status }) => status === "proposed-direction"));
  assert.equal(content.home.solutionDirections[0].href, "/solutions#solution-digital-presence");
});

test("DC-CONTENT-07: Services retain scope-only plans and the shared process", () => {
  assert.deepEqual(content.services.plans.map(({ id }) => id), ["one-page", "corporate", "integration"]);
  assert.ok(content.services.plans.every((plan) => !Object.hasOwn(plan, "price")));
  assert.equal(content.services.planContent.priceLabel, "依需求報價");
  assert.deepEqual(content.services.plans[2].serviceIds, ["website-development", "system-integration"]);
  assert.deepEqual(content.services.process, services.serviceProcessSteps);
  assert.deepEqual(content.services.examples, services.serviceSolutionExamples);
  assert.equal(content.services.planSources[0].blobSha, "02a2685b81f23988fe49d6d0ea03f71fd8c40c43");
});

test("DC-CONTENT-08: solution IDs, proposal status and service relationships are intact", () => {
  assert.deepEqual(content.solutions.definitions.map(({ id }) => id), solutionIds);
  assert.ok(content.solutions.definitions.every(({ status }) => status === "proposed-direction"));
  assert.deepEqual(getDesignSolution("ai-workflow").serviceIds, ["ai-automation", "system-integration"]);
  assert.equal(content.solutions.combinations.length, 3);
  assert.equal(content.solutions.valuePrinciples.length, 4);
  assert.ok(content.solutions.combinations.every(({ label }) => label === "需求組合示例"));
});

test("DC-CONTENT-09: the AI-related showcase remains a future direction of the planned hub", () => {
  const relation = content.solutions.showcases.find(({ solutionId }) => solutionId === "ai-workflow");
  assert.equal(relation.slug, "integration-hub");
  assert.equal(relation.note, "此展示以系統整合為規劃主軸；AI 與 n8n 屬後續方向，尚未實作。");
  assert.equal(getDesignProject(relation.slug).status, "PLANNED");
});

test("DC-CONTENT-10: technical projects keep their order and all empty/null evidence gates", () => {
  assert.deepEqual(content.portfolio.projects.map(({ slug }) => slug), projectIds);
  for (const project of content.portfolio.projects) {
    assert.equal(project.status, "PLANNED");
    assert.equal(project.type, "demonstration");
    assert.deepEqual(project.implementedFeatures, []);
    assert.deepEqual(project.implementedTechnologies, []);
    assert.deepEqual(project.media, []);
    assert.equal(project.sourceLink, null);
    assert.equal(project.liveDemo, null);
    assert.ok(project.statusEvidence.every(({ reference, verifiedAt }) => reference === null && verifiedAt === null));
  }
});

test("DC-CONTENT-11: portfolio business and planned/future text is preserved verbatim", () => {
  for (const original of portfolio.portfolioProjects) {
    const project = getDesignProject(original.slug);
    for (const key of ["businessContext", "challenges", "proposedSolution", "proposedArchitecture", "plannedFeatures", "futureFeatures", "plannedTechnologies", "futureTechnologies", "businessValue", "serviceIds", "metadataDescription"]) {
      assert.deepEqual(project[key], original[key]);
    }
  }
});

test("DC-CONTENT-12: approved showcase ordering, original featured IDs and labels survive", () => {
  assert.deepEqual(content.portfolio.websiteShowcases.map(({ id }) => id), [...brandIds, "demo-001", "demo-002", "demo-003", "demo-004"]);
  assert.deepEqual(content.portfolio.settings.brandOrder, brandIds);
  assert.deepEqual(content.portfolio.settings.featuredIds, ["march-tangbao", "hongjia-birdnest", "honest-diecut"]);
  assert.equal(content.portfolio.settings.groups.brand.id, "website-cases");
  assert.equal(content.portfolio.settings.groups.templates.id, "website-samples");
  assert.equal(content.portfolio.stateLabels["reference-only"], "素材待整理，暫停外連");
});

test("DC-CONTENT-13: the windows proposal is available without becoming client delivery", () => {
  const proposal = getDesignWebsiteShowcase("qiangang-windows");
  assert.equal(proposal.presentation, "brand-proposal");
  assert.equal(proposal.availability, "available");
  assert.equal(proposal.href, "https://showcase.xplorekaleidoscope.com/qiangang-windows/");
  assert.equal(proposal.title, "萬花筒塑鋼門窗");
  assert.equal(proposal.image.src, "/images/showcases/kaleidoscope-windows.webp");
  assert.match(proposal.image.alt, /萬花筒塑鋼門窗.*虛構品牌/);
  assert.match(proposal.note, /虛構品牌.*模擬操作/);
  assert.doesNotMatch(JSON.stringify(proposal), /千剛實業|大園看樣/);
  assert.ok(proposal.detail.limitations.some((line) => line.includes("品牌提案展示")));
  assert.deepEqual([proposal.image.width, proposal.image.height], [1280, 720]);
});

test("DC-CONTENT-14: unavailable templates retain null media/links, sourceHref and attribution", () => {
  const expected = {
    "demo-002": ["https://xk2022.github.io/single-demo002/", "Start Bootstrap · Creative"],
    "demo-003": ["https://xk2022.github.io/single-demo003/", "TemplateMag · GadgetLanding"],
  };
  for (const [id, [sourceHref, label]] of Object.entries(expected)) {
    const sample = getDesignWebsiteShowcase(id);
    assert.equal(sample.availability, "reference-only");
    assert.equal(sample.href, null);
    assert.equal(sample.image, null);
    assert.equal(sample.sourceHref, sourceHref);
    assert.equal(sample.attribution.label, label);
    assert.equal(Object.hasOwn(sample, "detail"), false);
  }
});

test("DC-CONTENT-15: public showcase fields, optional absence and external hrefs are not rewritten", () => {
  for (const original of websites.websiteShowcases) {
    const showcase = getDesignWebsiteShowcase(original.id);
    assert.deepEqual(showcase, original);
  }
  assert.equal(Object.hasOwn(getDesignWebsiteShowcase("march-tangbao"), "availability"), false);
  const expectedHrefs = {
    "march-tangbao": "https://showcase.xplorekaleidoscope.com/march-tangbao/",
    "hongjia-birdnest": "https://showcase.xplorekaleidoscope.com/hongjia-birdnest/",
    "yupinyuan-bento": "https://showcase.xplorekaleidoscope.com/yupinyuan-bento/",
    "campaign-website-design": "https://web.xplorekaleidoscope.com/",
    "honest-diecut": "https://showcase.xplorekaleidoscope.com/honest/",
    "qiangang-windows": "https://showcase.xplorekaleidoscope.com/qiangang-windows/",
  };
  for (const [id, href] of Object.entries(expectedHrefs)) {
    assert.equal(getDesignWebsiteShowcase(id).href, href);
  }
});

test("DC-CONTENT-16: Contact exposes only the established channel and local-draft contract", () => {
  assert.equal(content.contact.availability, "channels-only");
  assert.deepEqual(content.contact.channels, [{ label: "Email 專案詢價", href: "mailto:system.xk2022@gmail.com" }]);
  assert.equal(content.contact.inquiry.mode, "email-draft");
  assert.deepEqual(content.contact.inquiry.limits, { name: 80, email: 254, messageMin: 10, messageMax: 2000, mailtoMax: 1800 });
  assert.deepEqual(content.contact.inquiry.services.map(({ id }) => id), serviceIds);
  assert.deepEqual(content.contact.serviceLinks.map(({ href }) => href), serviceIds.map((id) => `/services#${id}`));
  assert.equal(Object.hasOwn(content.contact, "values"), false);
});

test("DC-CONTENT-17: shared Contact copy and static mailto prompts are unaltered", () => {
  for (const key of ["availability", "metadata", "hero", "channels", "preparation", "process", "dataNote", "cta"]) {
    assert.deepEqual(content.contact.page[key], contactPage.contactPage[key]);
  }
  assert.deepEqual(content.contact.emailTemplate, inquiry.inquiryEmailTemplate);
  assert.deepEqual(content.contact.action, inquiry.inquiryAction);
  assert.equal(content.contact.action.state, "direct");
  assert.equal(new URL(content.contact.action.href).pathname, "system.xk2022@gmail.com");
  assert.ok(content.contact.action.description.includes("不會代為寄信"));
});

test("DC-CONTENT-18: quotation IDs, prices and compatibility remain authoritative source values", () => {
  assert.deepEqual(content.quotation.catalog, quotation.quotationCatalog);
  assert.equal(content.quotation.catalog.publication, "reference-awaiting-owner-review");
  assert.deepEqual(content.quotation.catalog.builds.map(({ id }) => id), buildIds);
  assert.deepEqual(content.quotation.catalog.addons.map(({ id }) => id), addonIds);
  assert.deepEqual(content.quotation.catalog.builds[0].price, { kind: "range", min: 15000, max: 30000 });
  assert.deepEqual(content.quotation.catalog.builds[4].price, { kind: "from", min: 80000 });
  assert.ok(content.quotation.catalog.builds.every(({ includedAddonIds }) => includedAddonIds.length === 0));
});

test("DC-CONTENT-19: annual unknowns and company/provisional price provenance are not normalized", () => {
  const catalog = content.quotation.catalog;
  assert.deepEqual(catalog.addons.filter(({ billing }) => billing === "annual").map(({ id }) => id), ["domain", "hosting", "annual-maintenance"]);
  assert.ok(catalog.addons.filter(({ billing }) => billing === "annual").every(({ price }) => price.kind === "quote"));
  assert.equal(catalog.builds.find(({ id }) => id === "brand").reference.kind, "task-provisional");
  assert.equal(catalog.builds.find(({ id }) => id === "corp").reference.kind, "company-reference");
  assert.equal(catalog.addons.find(({ id }) => id === "membership").reference.kind, "unpriced");
  const source = content.quotation.sources.find(({ id }) => id === "company-website-pricing");
  assert.equal(source.commit, "5be640ab11811b24706101ea13db73185e9ce4d8");
  assert.equal(source.blob, "59fea2a9d9805bbbfa7407a01ce5ce275a737a77");
  assert.deepEqual(source.sections, ["§4 網站建置報價"]);
});

test("DC-CONTENT-20: all by-ID helpers return the same frozen DTO records", () => {
  for (const id of serviceIds) assert.equal(getDesignService(id), content.services.categories.find((entry) => entry.id === id));
  for (const id of solutionIds) assert.equal(getDesignSolution(id), content.solutions.definitions.find((entry) => entry.id === id));
  for (const slug of projectIds) assert.equal(getDesignProject(slug), content.portfolio.projects.find((entry) => entry.slug === slug));
  for (const id of [...brandIds, "demo-001", "demo-002", "demo-003", "demo-004"]) {
    assert.equal(getDesignWebsiteShowcase(id), content.portfolio.websiteShowcases.find((entry) => entry.id === id));
  }
});

test("DC-CONTENT-21: invalid, encoded and prototype-like IDs are rejected without coercion", () => {
  const invalid = ["", "unknown", " website-development ", "corporate-website/", "demo-002?preview=1", "%6darch-tangbao", "__proto__", "constructor", null, undefined, 42, Symbol("id"), {}];
  for (const lookup of [getDesignService, getDesignSolution, getDesignProject, getDesignWebsiteShowcase]) {
    for (const id of invalid) assert.equal(lookup(id), undefined);
  }
});

test("DC-CONTENT-22: DTO is JSON-lossless plain data without icons, functions, symbols or source prose", () => {
  visit(content, (value, path) => {
    assert.ok(value === null || ["object", "string", "number", "boolean"].includes(typeof value), path);
    if (value && typeof value === "object") {
      assert.ok(Array.isArray(value) || Object.getPrototypeOf(value) === Object.prototype, path);
      assert.deepEqual(Object.getOwnPropertySymbols(value), []);
      for (const key of ["Icon", "$$typeof", "sourceRefs", "supports"]) assert.equal(Object.hasOwn(value, key), false, `${path}.${key}`);
    }
  });
  assert.deepEqual(JSON.parse(JSON.stringify(content)), content);
  assert.equal(JSON.stringify(content).includes("一人全職品牌定位"), false);
});

test("DC-CONTENT-23: every DTO object is separately owned and deeply frozen", () => {
  visit(content, (value, path) => {
    if (value && typeof value === "object") {
      assert.equal(Object.isFrozen(value), true, path);
      assert.equal(originalState.has(value), false, `source alias at ${path}`);
    }
  });
  assert.throws(() => { content.site.name = "Changed"; }, TypeError);
  assert.throws(() => { content.portfolio.projects.push({}); }, TypeError);
  assert.throws(() => { content.quotation.catalog.builds[0].price.min = 0; }, TypeError);
  assert.throws(() => { content.about.page.mission.pillars[0].title = "Changed"; }, TypeError);
});

test("DC-CONTENT-24: importing and reading the adapter does not mutate or freeze source objects", () => {
  for (const [value, before] of originalState) {
    assert.equal(Object.isFrozen(value), before.frozen);
    const after = Object.getOwnPropertyDescriptors(value);
    assert.deepEqual(Reflect.ownKeys(after), Reflect.ownKeys(before.descriptors));
    for (const key of Reflect.ownKeys(before.descriptors)) {
      const previous = before.descriptors[key];
      const current = after[key];
      for (const property of ["value", "writable", "enumerable", "configurable", "get", "set"]) {
        assert.equal(current[property], previous[property]);
      }
    }
  }
  assert.equal(site.siteConfig.name, "Xplore Kaleidoscope");
});
