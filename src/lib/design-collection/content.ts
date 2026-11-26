import { siteConfig } from "@/config/site";
import { aboutPage, aboutCapabilities, aboutApproach, founderProfile, aboutCommitments } from "@/config/about";
import { homepageHero, services as homepageServices, technologyGroups, valuePropositions, solutionDirections } from "@/config/homepage";
import { servicesPage, serviceCategories, serviceProcessSteps, serviceSolutionExamples } from "@/config/services";
import { servicePlans, servicePlanContent, servicePlanSources } from "@/config/service-plans";
import { solutionsPage, solutionDefinitions, solutionCombinations, solutionsValuePrinciples } from "@/config/solutions";
import { solutionShowcases } from "@/config/solution-showcases";
import { portfolioPage, portfolioProjects } from "@/config/portfolio";
import { websiteShowcases, presentationLabels, showcaseStateLabels, showcaseSettings, type WebsiteShowcase } from "@/config/website-showcases";
import { verifiedContactChannels } from "@/config/contact";
import { contactPage, contactAvailability, contactServiceLinks } from "@/config/contact-page";
import { contactInquiry } from "@/config/contact-inquiry";
import { inquiryAction, inquiryEmailTemplate } from "@/config/inquiry";
import { quotationCatalog, quotationSources } from "@/config/quotation";

type ReadonlyDto<T> = T extends readonly (infer Item)[]
  ? readonly ReadonlyDto<Item>[]
  : T extends object ? { readonly [Key in keyof T]: ReadonlyDto<T[Key]> } : T;

/** Copy selected plain data before freezing; never freeze configuration or icons. */
function copyReadonly<T>(value: T, path = "content"): ReadonlyDto<T> {
  if (value === null || typeof value === "string" || typeof value === "boolean"
    || (typeof value === "number" && Number.isFinite(value))) {
    return value as ReadonlyDto<T>;
  }
  if (Array.isArray(value)) {
    return Object.freeze(value.map((entry, index) => copyReadonly(entry, `${path}[${index}]`))) as ReadonlyDto<T>;
  }
  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype
    || Object.getOwnPropertySymbols(value).length > 0) {
    throw new TypeError(`Non-plain design content at ${path}`);
  }
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, copyReadonly(entry, `${path}.${key}`)]),
  )) as ReadonlyDto<T>;
}

function websiteContent(showcase: WebsiteShowcase) {
  return {
    id: showcase.id,
    title: showcase.title,
    kind: showcase.kind,
    presentation: showcase.presentation,
    category: showcase.category,
    summary: showcase.summary,
    highlights: showcase.highlights,
    note: showcase.note,
    href: showcase.href,
    image: showcase.image,
    ...(showcase.availability === undefined ? {} : { availability: showcase.availability }),
    ...(showcase.attribution === undefined ? {} : { attribution: showcase.attribution }),
    ...(showcase.sourceHref === undefined ? {} : { sourceHref: showcase.sourceHref }),
    ...(showcase.detail === undefined ? {} : { detail: showcase.detail }),
  };
}

const content = copyReadonly({
  site: {
    name: siteConfig.name,
    abbreviation: siteConfig.abbreviation,
    url: siteConfig.url,
    locale: siteConfig.locale,
    tagline: siteConfig.tagline,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
  },
  about: {
    page: {
      titleLines: aboutPage.titleLines,
      description: aboutPage.description,
      whoWeAre: aboutPage.whoWeAre,
      engineeringApproach: aboutPage.engineeringApproach,
      mission: {
        statement: aboutPage.mission.statement,
        description: aboutPage.mission.description,
        pillars: aboutPage.mission.pillars.map(({ title, description }) => ({ title, description })),
      },
      vision: aboutPage.vision,
    },
    capabilities: aboutCapabilities.map(({ id, name, title, items }) => ({ id, name, title, items })),
    approach: aboutApproach.map(({ name, title, description }) => ({ name, title, description })),
    founder: {
      name: founderProfile.name,
      photo: founderProfile.photo,
      role: founderProfile.role,
      introduction: founderProfile.introduction,
      description: founderProfile.description,
      focusAreas: founderProfile.focusAreas,
    },
    commitments: aboutCommitments.map(({ name, title, description }) => ({ name, title, description })),
  },
  home: {
    hero: homepageHero,
    services: homepageServices.map(({ id, anchor, name, englishName, description, need,
      plannedDeliverables, serviceId, learnMoreLabel, items }) => ({
      id, anchor, name, englishName, description, need, plannedDeliverables, serviceId, learnMoreLabel, items,
    })),
    technologyGroups: technologyGroups.map(({ name, description, items }) => ({ name, description, items })),
    valuePropositions: valuePropositions.map(({ title, englishName, description }) => ({ title, englishName, description })),
    solutionDirections: solutionDirections.map(({ title, englishName, solutionId, description, href, serviceIds, status }) => ({
      title, englishName, solutionId, description, href, serviceIds, status,
    })),
  },
  services: {
    page: servicesPage,
    categories: serviceCategories.map(({ id, number, title, englishTitle, summary, description, items, technologies, scenario }) => ({
      id, number, title, englishTitle, summary, description, items,
      technologies: technologies.map(({ name }) => ({ name })),
      scenario,
    })),
    process: serviceProcessSteps.map(({ name, title, description }) => ({ name, title, description })),
    examples: serviceSolutionExamples.map(({ title, services, description }) => ({ title, services, description })),
    plans: servicePlans.map(({ id, title, nature, audience, scope, scopeNote, serviceIds, sourceIds }) => ({
      id, title, nature, audience, scope, scopeNote, serviceIds, sourceIds,
    })),
    planContent: servicePlanContent,
    planSources: servicePlanSources.map(({ id, repository, commit, path, blobSha }) => ({ id, repository, commit, path, blobSha })),
  },
  solutions: {
    page: {
      directionLabel: solutionsPage.directionLabel,
      hero: solutionsPage.hero,
      challenges: solutionsPage.challenges,
      overview: solutionsPage.overview,
      details: solutionsPage.details,
      technology: {
        title: solutionsPage.technology.title,
        description: solutionsPage.technology.description,
        support: {
          title: solutionsPage.technology.support.title,
          description: solutionsPage.technology.support.description,
          serviceId: solutionsPage.technology.support.serviceId,
        },
      },
      combinations: solutionsPage.combinations,
      approach: solutionsPage.approach,
      value: solutionsPage.value,
      cta: solutionsPage.cta,
    },
    definitions: solutionDefinitions.map(({ id, anchor, title, englishTitle, summary, audience, challengeTitle,
      challenges, positioning, technologies, implementationSteps, improvementGoals, deliverables, serviceIds, status, cta }) => ({
      id, anchor, title, englishTitle, summary, audience, challengeTitle, challenges, positioning,
      technologies: technologies.map(({ name, fromServiceId }) => ({ name, fromServiceId })),
      implementationSteps: implementationSteps.map(({ title, description }) => ({ title, description })),
      improvementGoals, deliverables, serviceIds, status, cta,
    })),
    combinations: solutionCombinations.map(({ title, description, solutionIds, serviceIds, label }) => ({
      title, description, solutionIds, serviceIds, label,
    })),
    valuePrinciples: solutionsValuePrinciples.map(({ title, description }) => ({ title, description })),
    showcases: solutionDefinitions.map(({ id }) => ({
      solutionId: id,
      slug: solutionShowcases[id].slug,
      note: solutionShowcases[id].note,
    })),
  },
  portfolio: {
    page: portfolioPage,
    projects: portfolioProjects.map(({ slug, title, category, type, summary, businessContext, challenges,
      proposedSolution, proposedArchitecture, plannedFeatures, futureFeatures, implementedFeatures,
      plannedTechnologies, futureTechnologies, implementedTechnologies, businessValue, status,
      statusEvidence, serviceIds, media, sourceLink, liveDemo, metadataDescription }) => ({
      slug, title, category, type, summary, businessContext, challenges, proposedSolution, proposedArchitecture,
      plannedFeatures, futureFeatures, implementedFeatures, plannedTechnologies, futureTechnologies,
      implementedTechnologies, businessValue, status,
      statusEvidence: statusEvidence.map(({ kind, description, reference, verifiedAt }) => ({ kind, description, reference, verifiedAt })),
      serviceIds,
      media: media.map(({ src, alt, width, height, type, source, creator, rights, sourceCommit, capturedAt, review }) => ({
        src, alt, width, height, type, source, creator, rights, sourceCommit, capturedAt, review,
      })),
      sourceLink,
      liveDemo,
      metadataDescription,
    })),
    websiteShowcases: websiteShowcases.map(websiteContent),
    presentationLabels,
    stateLabels: showcaseStateLabels,
    settings: showcaseSettings,
  },
  contact: {
    availability: contactAvailability,
    channels: verifiedContactChannels.map(({ label, href }) => ({ label, href })),
    page: {
      availability: contactPage.availability,
      metadata: contactPage.metadata,
      hero: contactPage.hero,
      channels: contactPage.channels,
      preparation: contactPage.preparation,
      process: contactPage.process,
      dataNote: contactPage.dataNote,
      cta: contactPage.cta,
    },
    serviceLinks: contactServiceLinks.map(({ id, href, label }) => ({ id, href, label })),
    inquiry: {
      mode: contactInquiry.mode,
      title: contactInquiry.title,
      description: contactInquiry.description,
      subject: contactInquiry.subject,
      limits: contactInquiry.limits,
      services: contactInquiry.services.map(({ id, title }) => ({ id, title })),
    },
    emailTemplate: { subject: inquiryEmailTemplate.subject, fields: inquiryEmailTemplate.fields },
    action: { state: inquiryAction.state, label: inquiryAction.label, href: inquiryAction.href, description: inquiryAction.description },
  },
  quotation: {
    catalog: quotationCatalog,
    sources: quotationSources.map(({ id, repository, commit, path, blob, sections, boundary }) => ({
      id, repository, commit, path, blob, sections, boundary,
    })),
  },
});

export type DesignContent = typeof content;

/** One style-neutral, immutable snapshot; hrefs retain their original destinations. */
export function getDesignContent(): DesignContent {
  return content;
}

export function getDesignService(id: string) {
  return content.services.categories.find((entry) => entry.id === id);
}

export function getDesignSolution(id: string) {
  return content.solutions.definitions.find((entry) => entry.id === id);
}

export function getDesignProject(slug: string) {
  return content.portfolio.projects.find((entry) => entry.slug === slug);
}

export function getDesignWebsiteShowcase(id: string) {
  return content.portfolio.websiteShowcases.find((entry) => entry.id === id);
}
