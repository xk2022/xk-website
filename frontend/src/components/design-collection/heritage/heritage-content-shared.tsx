import "server-only";

import Image from "next/image";
import type { ReactNode } from "react";

import { getInquiryAction } from "@/config/inquiry";
import { getDesignContent, type DesignContent } from "@/lib/design-collection/content";
import { heritageDetailHref, heritageHref, heritagePageHref } from "./heritage-links";
import { HeritageBadge, HeritageLink, HeritageList, HeritageSection } from "./heritage-ui";

export type HeritageShowcase = DesignContent["portfolio"]["websiteShowcases"][number];
export type HeritageProject = DesignContent["portfolio"]["projects"][number];

export function HeritageInquiry({ context, descriptionId }: { context?: string; descriptionId?: string; }) {
  const { contact } = getDesignContent();
  const action = getInquiryAction(contact.channels, context);
  const label = context && action.state !== "preparation" ? "詢問方案" : action.label;
  return <HeritageLink
    href={heritageHref(action.href)}
    primary
    data-inquiry-state={action.state}
    data-inquiry-context={context}
    aria-describedby={descriptionId}
    aria-label={context && action.state !== "preparation" ? `${label}：${context}` : undefined}
  >{label}</HeritageLink>;
}

export function HeritageServiceLinks({ ids }: { ids: readonly string[]; }) {
  const { services } = getDesignContent();
  return <ul className="htg-actions">{ids.map((id) => {
    const service = services.categories.find((entry) => entry.id === id);
    if (!service) throw new Error(`Unknown Heritage service: ${id}`);
    return <li key={id}>
      <HeritageLink href={heritagePageHref("services", service.id)}>{service.title}</HeritageLink>
    </li>;
  })}</ul>;
}

export function HeritageProcess({ steps }: { steps: readonly { name: string; title: string; description: string; }[]; }) {
  return <ol className="htg-numbered-list">{steps.map((step, index) => <li key={step.name} className="htg-numbered-item">
    <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div className="htg-stack">
      <p className="htg-kicker" lang="en">{step.name}</p>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  </li>)}</ol>;
}

export function HeritageChapters({ items, label = "本頁章節" }: { items: readonly { href: string; label: string; }[]; label?: string; }) {
  return <nav aria-label={label} className="htg-index">
    <ol className="htg-index-list">{items.map((item, index) => <li key={item.href}>
      <HeritageLink href={heritageHref(item.href)}>
        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}　</span>{item.label}</HeritageLink>
    </li>)}</ol>
  </nav>;
}

export function HeritageFigure({ image, caption }: { image: NonNullable<HeritageShowcase["image"]>; caption: ReactNode; }) {
  return <figure className="htg-figure">
    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized loading="lazy" sizes="(min-width: 1000px) 740px, 100vw" className="htg-image" />
    <figcaption className="htg-caption">{caption}</figcaption>
  </figure>;
}

export function HeritageWebsiteEntry({ showcase, number }: { showcase: HeritageShowcase; number?: number; }) {
  const { portfolio } = getDesignContent();
  const state = showcase.availability ?? "available";
  const available = state === "available" && showcase.href !== null && showcase.image !== null;
  return <article className="htg-editorial-card" data-showcase-id={showcase.id} data-showcase-state={state} data-showcase-presentation={showcase.presentation}>
    <div className="htg-detail-layout">
      {available && showcase.image ? <HeritageFigure image={showcase.image} caption={<>{showcase.title}展示網站的實際預覽。</>} /> : (
        <div className="htg-note">
          <p>{portfolio.stateLabels[state]}</p>
          <p>{state === "reference-only" ? "素材待整理，暫停外連" : "展示網站準備中"}</p>
        </div>
      )}
      <div className="htg-stack">
        <p className="htg-kicker">{number === undefined ? "" : `${String(number).padStart(2, "0")} / `}{showcase.category}</p>
        <div className="htg-meta">
          <HeritageBadge>{portfolio.presentationLabels[showcase.presentation]}</HeritageBadge>
          <HeritageBadge>{portfolio.stateLabels[state]}</HeritageBadge>
        </div>
        <h3>{showcase.title}</h3>
        <p>{showcase.summary}</p>
        <HeritageList items={showcase.highlights} />
        <p className="htg-note">{showcase.note}</p>
        <div className="htg-actions">
          {available && showcase.kind === "brand-demo" && showcase.detail && <HeritageLink href={heritageDetailHref("brand-showcase", showcase.id)}>查看作品介紹</HeritageLink>}
          {available && showcase.href && <HeritageLink href={showcase.href} target="_blank" rel="noopener noreferrer" aria-label={`開啟展示網站：${showcase.title}（另開分頁）`}>開啟展示網站</HeritageLink>}
        </div>
        {showcase.attribution && <HeritageLink href={showcase.attribution.href} target="_blank" rel="noopener noreferrer" aria-label={`查看${showcase.title}的模板來源：${showcase.attribution.label}（另開分頁）`}>模板來源：{showcase.attribution.label}</HeritageLink>}
      </div>
    </div>
  </article>;
}

export function HeritageProjectEntry({ project }: { project: HeritageProject; }) {
  const { portfolio } = getDesignContent();
  return <article className="htg-editorial-card" data-project-slug={project.slug} data-project-status={project.status}>
    <div className="htg-stack">
      <p className="htg-kicker" lang="en">{project.category}</p>
      <h3 lang="en">{project.title}</h3>
      <div className="htg-meta">
        <HeritageBadge>{portfolio.page.statusLabels[project.status]}</HeritageBadge>
        <p lang="en">{portfolio.page.projectTypeLabel}</p>
      </div>
      <p>{project.summary}</p>
      <p className="htg-note">{portfolio.page.detail.emptyMedia}</p>
      <dl className="htg-definition-list">
        <div>
          <dt>規劃中技術</dt>
          <dd>
            <HeritageList items={project.plannedTechnologies} />
          </dd>
        </div>
        <div>
          <dt>已實作技術</dt>
          <dd>{project.implementedTechnologies.length ? <HeritageList items={project.implementedTechnologies} /> : portfolio.page.detail.emptyImplementation}</dd>
        </div>
      </dl>
      <HeritageLink href={heritageDetailHref("technical-project", project.slug)}>查看自製展示規劃</HeritageLink>
    </div>
  </article>;
}

export function HeritagePlans({ pricing = false }: { pricing?: boolean; }) {
  const { services } = getDesignContent();
  const content = services.planContent;
  return <>
    <HeritageSection id="service-plans" title={content.title} description={content.description} eyebrow="WEBSITE PLAN DIRECTIONS" variant="surface">
      <div className="htg-three-column">{services.plans.map((plan) => <article key={plan.id} data-service-plan-id={plan.id} className="htg-editorial-card">
        <div className="htg-stack">
          <HeritageBadge>{plan.nature}</HeritageBadge>
          <h3>{plan.title}</h3>
          <dl className="htg-definition-list">
            <div>
              <dt>適合對象</dt>
              <dd>{plan.audience}</dd>
            </div>
            <div>
              <dt>可討論範圍</dt>
              <dd>
                <HeritageList items={plan.scope} />
              </dd>
            </div>
          </dl>
          <p>
            <strong>{content.priceLabel}</strong>
          </p>
          <p id={`service-plan-${plan.id}-scope`} className="htg-note">{plan.scopeNote}</p>
          <HeritageInquiry context={plan.title} descriptionId={`service-plan-${plan.id}-scope`} />
        </div>
      </article>)}</div>
      {!pricing && <div className="htg-actions">
        <HeritageLink href={heritageHref(content.pricingGuideLink.href)}>{content.pricingGuideLink.label}</HeritageLink>
      </div>}
    </HeritageSection>
    {pricing && <HeritageSection id="pricing-guide" title={content.pricingGuide.title} description={content.pricingGuide.description} eyebrow="PRICING GUIDE">
      <div className="htg-three-column">{content.pricingGuide.factors.map((factor) => <article key={factor.id} className="htg-editorial-card">
        <h3>{factor.title}</h3>
        <p>{factor.description}</p>
      </article>)}</div>
      <p className="htg-note">{content.pricingGuide.disclaimer}</p>
      <HeritageLink href={heritagePageHref("quotation")}>立即試算方案</HeritageLink>
    </HeritageSection>}
  </>;
}
