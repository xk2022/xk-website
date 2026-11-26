import "server-only";

import Image from "next/image";
import type { ReactNode } from "react";

import { getInquiryAction } from "@/config/inquiry";
import { getDesignContent, type DesignContent } from "@/lib/design-collection/content";
import { luxuryDetailHref, luxuryHref, luxuryPageHref } from "./luxury-links";
import { LuxuryBadge, LuxuryDisclosure, LuxuryLink, LuxurySection } from "./luxury-ui";

export type LuxuryWebsite = DesignContent["portfolio"]["websiteShowcases"][number];
export type LuxuryProject = DesignContent["portfolio"]["projects"][number];

export function LuxuryTextList({ items }: { items: readonly string[]; }) {
  return <ul className="lx-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function LuxuryInquiry({ context, describedBy }: { context?: string; describedBy?: string; }) {
  const action = getInquiryAction(getDesignContent().contact.channels, context);
  const text = context && action.state !== "preparation" ? "詢問方案" : action.label;
  return <LuxuryLink href={luxuryHref(action.href)} variant="button"
    data-inquiry-state={action.state} data-inquiry-context={context}
    aria-describedby={describedBy}
    aria-label={context && action.state !== "preparation" ? `${text}：${context}` : undefined}
  >{text}</LuxuryLink>;
}

export function LuxuryServiceLinks({ ids }: { ids: readonly string[]; }) {
  const categories = getDesignContent().services.categories;
  return <ul className="lx-actions">{ids.map((id) => {
    const service = categories.find((entry) => entry.id === id);
    if (!service) throw new Error(`Unknown Luxury service reference: ${id}`);
    return <li key={id}>
      <LuxuryLink href={luxuryPageHref("services", id)}>{service.title}</LuxuryLink>
    </li>;
  })}</ul>;
}

export function LuxuryChapterLinks({ items, label = "頁面內容" }: { items: readonly { href: string; label: string; }[]; label?: string; }) {
  return <nav className="lx-index" aria-label={label}>
    <ul className="lx-actions">{items.map((item) => <li key={item.href}>
      <LuxuryLink href={luxuryHref(item.href)}>{item.label}</LuxuryLink>
    </li>)}</ul>
  </nav>;
}

export function LuxuryCooperation({ steps }: { steps: readonly { name: string; title: string; description: string; }[]; }) {
  return <div className="lx-process">{steps.map((step) => <LuxuryDisclosure key={step.name}
    title={<>{step.title}<span lang="en"> · {step.name}</span>
    </>}>
    <p>{step.description}</p>
  </LuxuryDisclosure>)}</div>;
}

export function LuxuryPreview({ image, caption }: { image: NonNullable<LuxuryWebsite["image"]>; caption: ReactNode; }) {
  return <figure className="lx-figure">
    <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
      sizes="(min-width: 1280px) 1200px, 100vw" loading="lazy" unoptimized className="lx-work-image" />
    <figcaption className="lx-caption">{caption}</figcaption>
  </figure>;
}

/** Full-width image first; source, status and scope follow the original image. */
export function LuxuryWebsiteWork({ showcase }: { showcase: LuxuryWebsite; }) {
  const { presentationLabels, stateLabels } = getDesignContent().portfolio;
  const state = showcase.availability ?? "available";
  const available = state === "available" && showcase.image !== null && showcase.href !== null;
  return <article className="lx-work" data-showcase-id={showcase.id}
    data-showcase-state={state} data-showcase-presentation={showcase.presentation}>
    {available && showcase.image && <LuxuryPreview image={showcase.image} caption={`${showcase.title}展示網站的實際預覽。`} />}
    <div className="lx-work-info lx-stack">
      <div className="lx-meta">
        <p>{showcase.category}</p>
        <LuxuryBadge>{presentationLabels[showcase.presentation]}</LuxuryBadge>
        <LuxuryBadge>{stateLabels[state]}</LuxuryBadge>
      </div>
      <h3>{showcase.title}</h3>
      <p>{showcase.summary}</p>
      <LuxuryTextList items={showcase.highlights} />
      <p className="lx-note">{showcase.note}</p>
      <div className="lx-actions">
        {available && showcase.kind === "brand-demo" && showcase.detail && <LuxuryLink href={luxuryDetailHref("brand-showcase", showcase.id)}>查看作品介紹</LuxuryLink>}
        {available && showcase.href && <LuxuryLink href={showcase.href} target="_blank" rel="noopener noreferrer"
          aria-label={`開啟展示網站：${showcase.title}（另開分頁）`}>開啟展示網站</LuxuryLink>}
      </div>
      {!available && <p className="lx-note">{state === "reference-only" ? "素材待整理，暫停外連" : "展示網站準備中"}</p>}
      {showcase.attribution && <LuxuryLink href={showcase.attribution.href} target="_blank" rel="noopener noreferrer"
        aria-label={`模板來源：${showcase.attribution.label}，${showcase.title}（另開分頁）`}>模板來源：{showcase.attribution.label}</LuxuryLink>}
    </div>
  </article>;
}

export function LuxuryTechnicalCard({ project }: { project: LuxuryProject; }) {
  const page = getDesignContent().portfolio.page;
  return <article className="lx-story lx-stack" data-project-slug={project.slug} data-project-status={project.status}>
    <p lang="en">{project.category}</p>
    <h3 lang="en">{project.title}</h3>
    <div className="lx-meta">
      <LuxuryBadge>{page.statusLabels[project.status]}</LuxuryBadge>
      <p lang="en">{page.projectTypeLabel}</p>
    </div>
    <p>{project.summary}</p>
    <p className="lx-note">{page.detail.emptyMedia}</p>
    <dl className="lx-definition">
      <div>
        <dt>規劃中技術</dt>
        <dd>
          <LuxuryTextList items={project.plannedTechnologies} />
        </dd>
      </div>
      <div>
        <dt>已實作技術</dt>
        <dd>{project.implementedTechnologies.length ? <LuxuryTextList items={project.implementedTechnologies} /> : page.detail.emptyImplementation}</dd>
      </div>
    </dl>
    <LuxuryLink href={luxuryDetailHref("technical-project", project.slug)}>查看自製展示規劃</LuxuryLink>
  </article>;
}

export function LuxuryServicePlans({ showPricingGuide = false }: { showPricingGuide?: boolean; }) {
  const { plans, planContent } = getDesignContent().services;
  return <>
    <LuxurySection id="service-plans" title={planContent.title} description={planContent.description} eyebrow="WEBSITE PLAN DIRECTIONS">
      <div className="lx-stack">{plans.map((plan) => <article key={plan.id} data-service-plan-id={plan.id} className="lx-plan lx-stack">
        <LuxuryBadge>{plan.nature}</LuxuryBadge>
        <h3>{plan.title}</h3>
        <dl className="lx-definition">
          <div>
            <dt>適合對象</dt>
            <dd>{plan.audience}</dd>
          </div>
          <div>
            <dt>可討論範圍</dt>
            <dd>
              <LuxuryTextList items={plan.scope} />
            </dd>
          </div>
        </dl>
        <p>
          <strong>{planContent.priceLabel}</strong>
        </p>
        <p className="lx-note" id={`service-plan-${plan.id}-scope`}>{plan.scopeNote}</p>
        <LuxuryInquiry context={plan.title} describedBy={`service-plan-${plan.id}-scope`} />
      </article>)}</div>
      {!showPricingGuide && <div className="lx-actions">
        <LuxuryLink href={luxuryHref(planContent.pricingGuideLink.href)}>{planContent.pricingGuideLink.label}</LuxuryLink>
      </div>}
    </LuxurySection>
    {showPricingGuide && <LuxurySection id="pricing-guide" title={planContent.pricingGuide.title} description={planContent.pricingGuide.description} eyebrow="PRICING GUIDE">
      <div className="lx-grid">{planContent.pricingGuide.factors.map((factor) => <article key={factor.id} className="lx-story">
        <h3>{factor.title}</h3>
        <p>{factor.description}</p>
      </article>)}</div>
      <p className="lx-note">{planContent.pricingGuide.disclaimer}</p>
    </LuxurySection>}
  </>;
}
