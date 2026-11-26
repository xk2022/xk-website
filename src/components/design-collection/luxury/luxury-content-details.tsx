import "server-only";

import { notFound } from "next/navigation";

import { getDesignContent, getDesignProject, getDesignWebsiteShowcase } from "@/lib/design-collection/content";
import { luxuryHref, luxuryPageHref } from "./luxury-links";
import { LuxuryBadge, LuxuryDisclosure, LuxuryHero, LuxuryLink, LuxurySection } from "./luxury-ui";
import { LuxuryChapterLinks, LuxuryInquiry, LuxuryPreview, LuxuryServiceLinks, LuxuryTextList } from "./luxury-content-shared";

export function LuxuryTechnicalProject({ slug }: { slug: string; }) {
  const project = getDesignProject(slug);
  if (!project) notFound();
  const { portfolio, services } = getDesignContent();
  const { page } = portfolio;
  const { detail } = page;
  return <div className="lx-pages" data-project-slug={project.slug} data-project-status={project.status}>
    <LuxuryHero id="project-overview" title={project.title} titleLang="en" description={project.summary} eyebrow={project.category}>
      <div className="lx-meta">
        <LuxuryBadge>{page.statusLabels[project.status]}</LuxuryBadge>
        <p lang="en">{page.projectTypeLabel}</p>
      </div>
      <h2>{detail.overview.title}</h2>
      <p className="lx-note">{detail.overview.description}</p>
      <p>{project.businessContext}</p>
      <LuxuryChapterLinks items={[{ href: "#project-solution", label: "建議方案與架構規劃" }, { href: "#project-evidence", label: "系統畫面與實作證據" }, { href: "#project-status", label: "目前狀態與待確認事項" }]} />
      <LuxuryLink href={luxuryHref(detail.backLink.href)}>{detail.backLink.label}</LuxuryLink>
    </LuxuryHero>

    <LuxurySection id="project-challenge" title={detail.challenge.title} description={detail.challenge.description} eyebrow="BUSINESS CHALLENGE">
      <div className="lx-reading">
        <LuxuryTextList items={project.challenges} />
      </div>
    </LuxurySection>
    <LuxurySection id="project-solution" title={detail.solution.title} description={detail.solution.description} eyebrow="PROPOSED DIRECTION">
      <div className="lx-reading lx-stack">
        <LuxuryBadge>{detail.planningLabel}</LuxuryBadge>
        <p>{project.proposedSolution}</p>
      </div>
      <LuxuryDisclosure title="規劃架構方向" open>
        <ol className="lx-list">{project.proposedArchitecture.map((item) => <li key={item}>{item}</li>)}</ol>
      </LuxuryDisclosure>
      <div className="lx-grid">
        <div className="lx-story">
          <h3>規劃功能</h3>
          <LuxuryTextList items={project.plannedFeatures} />
        </div>
        <div className="lx-story">
          <h3>已實作功能</h3>{project.implementedFeatures.length ? <LuxuryTextList items={project.implementedFeatures} /> : <p>{detail.emptyImplementation}</p>}</div>
        {project.futureFeatures.length > 0 && <div className="lx-story">
          <h3>{detail.futureLabel}</h3>
          <LuxuryTextList items={project.futureFeatures} />
        </div>}
        <div className="lx-story">
          <h3>{detail.businessValueLabel}</h3>
          <LuxuryTextList items={project.businessValue} />
        </div>
      </div>
    </LuxurySection>
    <LuxurySection id="project-technology" title={detail.technology.title} description={detail.technology.description} eyebrow="PLANNED TECHNOLOGY">
      <div className="lx-grid">
        <div className="lx-story">
          <h3>規劃中技術</h3>
          <LuxuryTextList items={project.plannedTechnologies} />
        </div>
        <div className="lx-story">
          <h3>已實作技術</h3>{project.implementedTechnologies.length ? <LuxuryTextList items={project.implementedTechnologies} /> : <p>{detail.emptyImplementation}</p>}</div>
        {project.futureTechnologies.length > 0 && <div className="lx-story">
          <h3>{detail.futureLabel}</h3>
          <LuxuryTextList items={project.futureTechnologies} />
        </div>}
      </div>
    </LuxurySection>
    <LuxurySection id="project-evidence" title={detail.evidence.title} description={detail.evidence.description} eyebrow="PROJECT MEDIA">
      {project.media.length ? <div className="lx-stack">{project.media.map((media) => <LuxuryPreview key={media.src} image={media} caption={<>{media.source} · {media.creator} · {media.rights}</>} />)}</div> : <p className="lx-note">{detail.emptyMedia}</p>}
    </LuxurySection>
    <LuxurySection id="project-status" title={detail.status.title} description={detail.status.description} eyebrow="STATUS AND EVIDENCE">
      <div className="lx-reading lx-stack">
        <LuxuryBadge>{page.statusLabels[project.status]}</LuxuryBadge>
        <LuxuryTextList items={project.statusEvidence.map(({ description }) => description)} />
      </div>
      <div className="lx-grid">
        <div className="lx-story">
          <h3>專案原始碼</h3>{project.sourceLink ? <LuxuryLink href={luxuryHref(project.sourceLink.href)}>{project.sourceLink.label}</LuxuryLink> : <p>尚未提供經確認可公開的專案原始碼連結。</p>}</div>
        <div className="lx-story">
          <h3 lang="en">Live Demo</h3>{project.liveDemo ? <LuxuryLink href={luxuryHref(project.liveDemo.href)}>{project.liveDemo.label}</LuxuryLink> : <p>目前沒有可驗證的公開 Live Demo。</p>}</div>
      </div>
    </LuxurySection>
    <LuxurySection id="project-services" title={detail.services.title} description={detail.services.description} eyebrow="RELATED SERVICES">
      <div className="lx-stack">{project.serviceIds.map((id) => {
        const service = services.categories.find((entry) => entry.id === id);
        if (!service) throw new Error(`Unknown Luxury project service: ${id}`);
        return <article key={id} className="lx-story">
          <p lang="en">{service.englishTitle}</p>
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
          <LuxuryLink href={luxuryPageHref("services", service.id)}>了解技術服務</LuxuryLink>
        </article>;
      })}</div>
    </LuxurySection>
    <LuxurySection id="project-next-step" title={detail.nextStep.title} description={detail.nextStep.description} eyebrow="CONTINUE EXPLORING">
      <div className="lx-contact-panel lx-actions">
        <LuxuryLink href={luxuryPageHref("contact")} variant="button">{page.cta.primaryCta.label}</LuxuryLink>
        <LuxuryLink href={luxuryPageHref("services")}>了解服務</LuxuryLink>
        <LuxuryLink href={luxuryHref(detail.backLink.href)}>{detail.backLink.label}</LuxuryLink>
        <LuxuryInquiry />
      </div>
    </LuxurySection>
  </div>;
}

export function LuxuryBrandShowcase({ slug }: { slug: string; }) {
  const showcase = getDesignWebsiteShowcase(slug);
  if (!showcase || showcase.kind !== "brand-demo" || (showcase.availability ?? "available") !== "available" || !showcase.href || !showcase.image || !showcase.detail) notFound();
  const { portfolio, services } = getDesignContent();
  const { detail } = showcase;
  const websiteService = services.categories.find(({ id }) => id === "website-development");
  if (!websiteService) throw new Error("Missing Luxury website-development service");
  return <article className="lx-pages" data-showcase-id={showcase.id} data-showcase-state="available" data-showcase-presentation={showcase.presentation}>
    <LuxuryHero id="showcase-overview" title={showcase.title} description={showcase.summary} eyebrow={showcase.category}>
      <div className="lx-meta">
        <LuxuryBadge>{portfolio.presentationLabels[showcase.presentation]}</LuxuryBadge>
        <LuxuryBadge>{portfolio.stateLabels.available}</LuxuryBadge>
      </div>
      <p className="lx-note">{showcase.note}</p>
      <LuxuryChapterLinks items={[{ href: "#showcase-context", label: "展示背景與使用情境" }, { href: "#showcase-preview", label: "網站預覽與來源" }, { href: "#showcase-limitations", label: "展示限制" }]} />
    </LuxuryHero>
    <LuxurySection id="showcase-context" title="展示背景與使用情境" description={detail.context} eyebrow="CONTEXT & AUDIENCE">
      <div className="lx-reading lx-stack">
        <h3>使用對象與情境</h3>
        <p>{detail.audience}</p>
      </div>
    </LuxurySection>
    <LuxurySection id="showcase-preview" title="網站預覽與來源" description="以展示網站的實際畫面了解內容與介面安排，完整互動可前往展示網站瀏覽。" eyebrow="WEBSITE PREVIEW">
      <LuxuryPreview image={showcase.image} caption={`${showcase.title}展示網站的實際預覽。`} />
      <div className="lx-work-info lx-stack">
        <h3>展示網站來源</h3>
        <LuxuryLink href={showcase.href} target="_blank" rel="noopener noreferrer"
          aria-label={`${showcase.href}，開啟展示網站來源：${showcase.title}（另開分頁）`}>{showcase.href}</LuxuryLink>
      </div>
    </LuxurySection>
    <LuxurySection id="showcase-implementation" title="設計取捨與實作範圍" description="以下整理目前展示網站可觀察的內容安排與已實作功能。" eyebrow="DESIGN & IMPLEMENTATION">
      <div className="lx-stack">
        <div className="lx-story">
          <h3>設計取捨</h3>
          <LuxuryTextList items={detail.designDecisions} />
        </div>
        <div className="lx-story">
          <h3>已實作功能</h3>
          <LuxuryTextList items={detail.implementedFeatures} />
        </div>
      </div>
    </LuxurySection>
    <LuxurySection id="showcase-limitations" title="展示限制" description="閱讀展示內容時，請一併參考下列素材與功能範圍。" eyebrow="SCOPE & LIMITATIONS">
      <div className="lx-reading">
        <LuxuryTextList items={detail.limitations} />
      </div>
    </LuxurySection>
    <LuxurySection id="showcase-next-step" title="延伸了解網站服務" description={websiteService.summary} eyebrow="RELATED SERVICES">
      <div className="lx-contact-panel lx-stack">
        <p>從展示的內容安排延伸了解網站服務，或查看目前可公開的聯絡資訊與需求準備方式。</p>
        <LuxuryServiceLinks ids={[websiteService.id]} />
        <div className="lx-actions">
          <LuxuryLink href={luxuryPageHref("contact")}>查看聯絡資訊</LuxuryLink>
          <LuxuryLink href={luxuryPageHref("portfolio", "website-cases")}>返回品牌網站展示</LuxuryLink>
          <LuxuryInquiry />
        </div>
      </div>
    </LuxurySection>
  </article>;
}
