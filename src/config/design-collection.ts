import { services as homepageServices } from "./homepage.ts";
import { portfolioProjects } from "./portfolio.ts";
import { serviceCategories } from "./services.ts";
import { solutionDefinitions } from "./solutions.ts";
import { brandWebsiteShowcases, getBrandShowcase } from "./website-showcases.ts";
import type { DesignContentPageKey, DesignPageDefinition, DesignStyleDefinition, DesignStyleId } from "../lib/design-collection/types.ts";

function freeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object") Object.values(value).forEach(freeze);
  return Object.freeze(value);
}

const contentPages = [
  { pageKey: "home", path: "/", kind: "simple" },
  { pageKey: "about", path: "/about", kind: "simple" },
  { pageKey: "services", path: "/services", kind: "simple" },
  { pageKey: "solutions", path: "/solutions", kind: "simple" },
  { pageKey: "portfolio", path: "/portfolio", kind: "simple" },
  { pageKey: "technical-project", path: "/portfolio", kind: "detail" },
  { pageKey: "brand-showcase", path: "/portfolio/showcases", kind: "detail" },
  { pageKey: "contact", path: "/contact", kind: "simple" },
  { pageKey: "quotation", path: "/quotation", kind: "simple" },
] as const satisfies readonly DesignPageDefinition[];

// Content landmarks only. Temporary errors, personal fields and preview IDs are
// intentionally not URL destinations. New styles declare anchors only when built.
const modernAnchors = {
  home: ["main-content", "about", "brand", "services", "service-plans", "featured-websites", "technologies", "why-xk", "solutions", "contact", ...homepageServices.map(({ anchor }) => `service-${anchor}`)],
  about: ["main-content", "who-we-are", "mission", "vision", "capabilities", "approach", "founder", "commitment", "about-next-step"],
  services: ["main-content", "service-overview", "service-plans", "pricing-guide", ...serviceCategories.map(({ id }) => id), "service-combinations", "services-process", "services-next-step"],
  solutions: ["main-content", "solutions-hero", "business-challenges", "solutions-overview", "solution-details", ...solutionDefinitions.map(({ anchor }) => anchor), "solution-technology", "solution-combinations", "implementation-approach", "why-xk-solutions", "solutions-next-step"],
  portfolio: ["main-content", "portfolio-hero", "portfolio-introduction", "website-cases", "website-samples", "portfolio-projects", "portfolio-technology", "portfolio-transparency", "portfolio-next-step"],
  "technical-project": ["main-content", "project-overview", "project-challenge", "project-solution", "project-technology", "project-evidence", "project-status", "project-services", "project-next-step"],
  "brand-showcase": ["main-content", "showcase-overview", "showcase-context", "showcase-preview", "showcase-implementation", "showcase-limitations", "showcase-next-step"],
  contact: ["main-content", "contact-hero", "contact-form", "contact-channels", "contact-preparation", "contact-process", "contact-data-note", "contact-next-step"],
  quotation: ["main-content", "quotation-introduction", "quotation-services", "quotation-builds", "quotation-addons", "quotation-complexity", "quotation-results", "quotation-print-summary", "quotation-next-step"],
} as const satisfies Record<DesignContentPageKey, readonly string[]>;

type PageAnchors = Readonly<Partial<Record<DesignContentPageKey, readonly string[]>>>;
const anchors: Readonly<Record<DesignStyleId, PageAnchors>> = {
  modern: modernAnchors,
  heritage: {},
  luxury: {},
};

/** DC-002 planning inventory. It does not create routes or authorize publication. */
export const designCollectionRegistry = freeze({
  version: 1,
  namespace: "/design-collection",
  styles: [
    { id: "modern", name: "Modern 現代專業", status: "implemented" },
    { id: "heritage", name: "Heritage 懷舊復古", status: "planned" },
    { id: "luxury", name: "Luxury 奢華精品", status: "planned" },
  ] as const satisfies readonly DesignStyleDefinition[],
  collection: { path: "/design-collection", status: "planned" } as const,
  contentPages,
  technicalProjectSlugs: portfolioProjects.map(({ slug }) => slug),
  brandShowcaseSlugs: brandWebsiteShowcases.flatMap(({ id }) => getBrandShowcase(id) ? [id] : []),
  anchors,
  collectionAnchors: [] as readonly string[],
});
