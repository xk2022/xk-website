import "server-only";

import { notFound } from "next/navigation";

import { getDesignContent, getDesignProject, getDesignWebsiteShowcase } from "@/lib/design-collection/content";
import { heritageHref, heritagePageHref } from "./heritage-links";
import { HeritageBadge, HeritageHero, HeritageLink, HeritageList, HeritageSection } from "./heritage-ui";
import { HeritageChapters, HeritageFigure, HeritageInquiry, HeritageServiceLinks } from "./heritage-content-shared";

export function HeritageTechnicalProject({ slug }: { slug: string; }) {
  const project = getDesignProject(slug);
  if (!project) notFound();
  const { portfolio, services } = getDesignContent();
  const { detail } = portfolio.page;
  return <div className="htg-page" data-project-slug={project.slug} data-project-status={project.status}>
    <HeritageHero id="project-overview" title={project.title} description={project.summary} eyebrow={project.category}>
      <div className="htg-meta">
        <HeritageBadge>{portfolio.page.statusLabels[project.status]}</HeritageBadge>
        <p lang="en">{portfolio.page.projectTypeLabel}</p>
      </div>
      <h2>{detail.overview.title}</h2>
      <p className="htg-note">{detail.overview.description}</p>
      <p>{project.businessContext}</p>
      <HeritageChapters items={[{ href: "#project-solution", label: "方案與架構規劃" }, { href: "#project-evidence", label: "實作證據" }, { href: "#project-status", label: "目前狀態" }]} />
      <HeritageLink href={heritageHref(detail.backLink.href)}>{detail.backLink.label}</HeritageLink>
    </HeritageHero>
    <HeritageSection id="project-challenge" title={detail.challenge.title} description={detail.challenge.description} eyebrow="BUSINESS CHALLENGE">
      <div className="htg-reading">
        <HeritageList items={project.challenges} />
      </div>
    </HeritageSection>
    <HeritageSection id="project-solution" title={detail.solution.title} description={detail.solution.description} eyebrow="PROPOSED DIRECTION" variant="surface">
      <p className="htg-kicker">{detail.planningLabel}</p>
      <p className="htg-reading">{project.proposedSolution}</p>
      <div className="htg-detail-layout">
        <div className="htg-stack">
          <h3>規劃架構方向</h3>
          <ol className="htg-numbered-list">{project.proposedArchitecture.map((item, index) => <li key={item} className="htg-numbered-item">
            <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </li>)}</ol>
          <h3>規劃功能</h3>
          <HeritageList items={project.plannedFeatures} />
        </div>
        <aside className="htg-stack">
          <div className="htg-editorial-card">
            <h3>已實作功能</h3>{project.implementedFeatures.length ? <HeritageList items={project.implementedFeatures} /> : <p>{detail.emptyImplementation}</p>}</div>{project.futureFeatures.length > 0 && <div>
              <h3>{detail.futureLabel}</h3>
              <HeritageList items={project.futureFeatures} />
            </div>}<div>
            <h3>{detail.businessValueLabel}</h3>
            <HeritageList items={project.businessValue} />
          </div>
        </aside>
      </div>
    </HeritageSection>
    <HeritageSection id="project-technology" title={detail.technology.title} description={detail.technology.description} eyebrow="PLANNED TECHNOLOGY">
      <div className="htg-two-column">
        <div>
          <h3>規劃中技術</h3>
          <HeritageList items={project.plannedTechnologies} />
        </div>
        <div>
          <h3>已實作技術</h3>{project.implementedTechnologies.length ? <HeritageList items={project.implementedTechnologies} /> : <p>{detail.emptyImplementation}</p>}</div>{project.futureTechnologies.length > 0 && <div>
            <h3>{detail.futureLabel}</h3>
            <HeritageList items={project.futureTechnologies} />
          </div>}</div>
    </HeritageSection>
    <HeritageSection id="project-evidence" title={detail.evidence.title} description={detail.evidence.description} eyebrow="PROJECT MEDIA" variant="surface">
      {project.media.length ? <div className="htg-stack">{project.media.map((media) => <HeritageFigure key={media.src} image={media} caption={<>{media.source} · {media.creator} · {media.rights}</>} />)}</div> : <p className="htg-note">{detail.emptyMedia}</p>}
    </HeritageSection>
    <HeritageSection id="project-status" title={detail.status.title} description={detail.status.description} eyebrow="STATUS AND EVIDENCE">
      <HeritageBadge>{portfolio.page.statusLabels[project.status]}</HeritageBadge>
      <HeritageList items={project.statusEvidence.map(({ description }) => description)} />
      <div className="htg-two-column">
        <div className="htg-editorial-card">
          <h3>專案原始碼</h3>{project.sourceLink ? <HeritageLink href={heritageHref(project.sourceLink.href)}>{project.sourceLink.label}</HeritageLink> : <p>尚未提供經確認可公開的專案原始碼連結。</p>}</div>
        <div className="htg-editorial-card">
          <h3 lang="en">Live Demo</h3>{project.liveDemo ? <HeritageLink href={heritageHref(project.liveDemo.href)}>{project.liveDemo.label}</HeritageLink> : <p>目前沒有可驗證的公開 Live Demo。</p>}</div>
      </div>
    </HeritageSection>
    <HeritageSection id="project-services" title={detail.services.title} description={detail.services.description} eyebrow="RELATED SERVICES" variant="surface">
      <div className="htg-two-column">{project.serviceIds.map((id) => {
        const service = services.categories.find((entry) => entry.id === id);
        if (!service) throw new Error(`Unknown Heritage project service: ${id}`);
        return <article key={id} className="htg-editorial-card">
          <p className="htg-kicker" lang="en">{service.englishTitle}</p>
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
          <HeritageLink href={heritagePageHref("services", service.id)}>了解技術服務</HeritageLink>
        </article>;
      })}</div>
    </HeritageSection>
    <HeritageSection id="project-next-step" title={detail.nextStep.title} description={detail.nextStep.description} eyebrow="CONTINUE EXPLORING">
      <div className="htg-actions">
        <HeritageLink href={heritagePageHref("contact")} primary>{portfolio.page.cta.primaryCta.label}</HeritageLink>
        <HeritageLink href={heritagePageHref("services")}>了解服務</HeritageLink>
        <HeritageLink href={heritageHref(detail.backLink.href)}>{detail.backLink.label}</HeritageLink>
        <HeritageInquiry />
      </div>
    </HeritageSection>
  </div>;
}

export function HeritageBrandShowcase({ slug }: { slug: string; }) {
  const showcase = getDesignWebsiteShowcase(slug);
  if (!showcase || showcase.kind !== "brand-demo" || (showcase.availability ?? "available") !== "available" || !showcase.href || !showcase.image || !showcase.detail) notFound();
  const { portfolio, services } = getDesignContent();
  const { detail } = showcase;
  const websiteService = services.categories.find((service) => service.id === "website-development");
  if (!websiteService) throw new Error("Missing Heritage website development service");
  return <article className="htg-page" data-showcase-id={showcase.id} data-showcase-state="available" data-showcase-presentation={showcase.presentation}>
    <HeritageHero id="showcase-overview" title={showcase.title} description={showcase.summary} eyebrow={showcase.category}>
      <div className="htg-meta">
        <HeritageBadge>{portfolio.presentationLabels[showcase.presentation]}</HeritageBadge>
        <HeritageBadge>{portfolio.stateLabels.available}</HeritageBadge>
      </div>
      <p className="htg-note">{showcase.note}</p>
      <HeritageChapters items={[{ href: "#showcase-context", label: "背景與情境" }, { href: "#showcase-preview", label: "實際預覽與來源" }, { href: "#showcase-implementation", label: "設計與實作範圍" }, { href: "#showcase-limitations", label: "展示限制" }]} />
      <HeritageLink href={heritagePageHref("portfolio", "website-cases")}>返回品牌網站展示</HeritageLink>
    </HeritageHero>
    <HeritageSection id="showcase-context" title="展示背景與使用情境" eyebrow="CONTEXT & AUDIENCE" description={detail.context}>
      <div className="htg-lead-grid">
        <h3>使用對象與情境</h3>
        <p>{detail.audience}</p>
      </div>
    </HeritageSection>
    <HeritageSection id="showcase-preview" title="網站預覽與來源" eyebrow="WEBSITE PREVIEW" description="以展示網站的實際畫面了解內容與介面安排，完整互動可前往展示網站瀏覽。" variant="surface">
      <HeritageFigure image={showcase.image} caption={`${showcase.title}展示網站的實際預覽。`} />
      <div className="htg-stack">
        <h3>展示網站來源</h3>
        <HeritageLink href={showcase.href} target="_blank" rel="noopener noreferrer" aria-label={`${showcase.href}，開啟展示網站來源：${showcase.title}（另開分頁）`}>{showcase.href}</HeritageLink>
      </div>
    </HeritageSection>
    <HeritageSection id="showcase-implementation" title="設計取捨與實作範圍" eyebrow="DESIGN & IMPLEMENTATION" description="以下整理目前展示網站可觀察的內容安排與已實作功能。">
      <div className="htg-detail-layout">
        <div>
          <h3>設計取捨</h3>
          <HeritageList items={detail.designDecisions} />
        </div>
        <div>
          <h3>已實作功能</h3>
          <HeritageList items={detail.implementedFeatures} />
        </div>
      </div>
    </HeritageSection>
    <HeritageSection id="showcase-limitations" title="展示限制" eyebrow="SCOPE & LIMITATIONS" description="閱讀展示內容時，請一併參考下列素材與功能範圍。" variant="surface">
      <div className="htg-reading">
        <HeritageList items={detail.limitations} />
      </div>
    </HeritageSection>
    <HeritageSection id="showcase-next-step" title="延伸了解網站服務" eyebrow="RELATED SERVICES" description={websiteService.summary}>
      <p className="htg-reading">從展示的內容安排延伸了解網站服務，或查看目前可公開的聯絡資訊與需求準備方式。</p>
      <HeritageServiceLinks ids={[websiteService.id]} />
      <div className="htg-actions">
        <HeritageLink href={heritagePageHref("contact")}>查看聯絡資訊</HeritageLink>
        <HeritageLink href={heritagePageHref("portfolio", "website-cases")}>返回品牌網站展示</HeritageLink>
        <HeritageInquiry />
      </div>
    </HeritageSection>
  </article>;
}
