import "server-only";

import { getDesignContent, getDesignProject } from "@/lib/design-collection/content";
import { luxuryDetailHref, luxuryHref, luxuryPageHref } from "./luxury-links";
import { LuxuryBadge, LuxuryDisclosure, LuxuryHero, LuxuryLink, LuxurySection } from "./luxury-ui";
import { LuxuryChapterLinks, LuxuryCooperation, LuxuryInquiry, LuxuryServiceLinks, LuxuryServicePlans, LuxuryTechnicalCard, LuxuryTextList, LuxuryWebsiteWork } from "./luxury-content-shared";

export { LuxuryTechnicalProject, LuxuryBrandShowcase } from "./luxury-content-details";

export function LuxuryHome() {
  const { home, services, site, contact, portfolio } = getDesignContent();
  const featured = portfolio.websiteShowcases.filter((entry) => portfolio.settings.featuredIds.some((id) => id === entry.id));
  return <div className="lx-pages" data-deferred-sections>
    <LuxuryHero title={home.hero.title} description={home.hero.description} eyebrow={home.hero.eyebrow}>
      <div className="lx-actions">
        <LuxuryInquiry describedBy="home-inquiry-note" />
      </div>
      <p id="home-inquiry-note" className="lx-note">{contact.action.description}</p>
      <LuxuryChapterLinks items={[{ href: "/#services", label: "探索我們的服務" }, { href: "/portfolio", label: "查看作品展示" }]} />
      <p className="lx-note">{home.hero.portfolioNote}</p>
      <p lang="en">{site.tagline}</p>
      <p lang="en">{site.slogan}</p>
      <ul className="lx-index">{home.hero.serviceLabels.map((label) => <li key={label}>{label}</li>)}</ul>
      <p className="lx-note">從數位入口到企業系統，以整合思維連結每個技術環節。</p>
    </LuxuryHero>

    <LuxurySection id="about" title="讓技術成為企業成長的力量" eyebrow="ABOUT XPLORE KALEIDOSCOPE">
      <div id="brand" className="lx-reading lx-stack">
        <p>Xplore Kaleidoscope 整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業建立穩定、可擴充且符合實際營運需求的數位解決方案。</p>
        <p>從網站建置、系統整合到 AI 應用，我們重視技術品質、實際效益與長期維護，讓數位技術真正創造商業價值。</p>
      </div>
    </LuxurySection>

    <LuxurySection id="services" title="Our Services" eyebrow="SERVICES / WEB · JAVA · AI" description="從常見需求出發，規劃服務與交付內容；實際範圍依個別專案確認。">
      <div className="lx-stack">{home.services.map((service) => <article key={service.id} id={`service-${service.anchor}`} className="lx-story lx-stack">
        <p lang="en">{service.id} · {service.englishName}</p>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <LuxuryDisclosure title={`${service.name}：需求與可規劃交付`}>
          <dl className="lx-definition">
            <div>
              <dt>常見需求</dt>
              <dd>{service.need}</dd>
            </div>
            <div>
              <dt>XK 方案</dt>
              <dd>{service.description}</dd>
            </div>
            <div>
              <dt>可規劃交付</dt>
              <dd>{service.plannedDeliverables}</dd>
            </div>
          </dl>
        </LuxuryDisclosure>
        <LuxuryLink href={luxuryPageHref("services", service.serviceId)}>{service.learnMoreLabel}</LuxuryLink>
      </article>)}</div>
      <div className="lx-actions">
        <LuxuryLink href={luxuryPageHref("services")}>了解完整服務</LuxuryLink>
      </div>
    </LuxurySection>
    <LuxuryServicePlans />

    <LuxurySection id="featured-websites" title="精選網站展示" eyebrow="FEATURED WEBSITE SHOWCASES" description="透過餐飲、禮品與工業製造的自製展示案例，了解品牌故事、產品與服務可以如何呈現。各案例的展示性質與使用限制皆於卡片說明。">
      <div className="lx-stack">{featured.map((showcase) => <LuxuryWebsiteWork key={showcase.id} showcase={showcase} />)}</div>
      <div className="lx-actions">
        <LuxuryLink href={luxuryPageHref("portfolio", "website-cases")}>查看全部作品</LuxuryLink>
      </div>
    </LuxurySection>

    <LuxurySection id="technologies" title="Technology Capabilities" eyebrow="TECHNOLOGY / CONNECTED CAPABILITIES" description="以合適的技術與架構，實作企業所需的服務。">
      <div className="lx-grid">{home.technologyGroups.map((group) => <article key={group.name} className="lx-story lx-stack">
        <h3 lang="en">{group.name}</h3>
        <p>{group.description}</p>
        <LuxuryTextList items={group.items} />
      </article>)}</div>
      <p className="lx-note">XK 依照不同專案需求，選擇適合的技術與架構，提供具備擴充性及可維護性的數位解決方案。</p>
    </LuxurySection>
    <LuxurySection id="why-xk" title="Why Xplore Kaleidoscope" eyebrow="OUR APPROACH / BUILT FOR VALUE" description="從技術實作到商業價值，提供完整的數位解決方案。">
      <div className="lx-grid">{home.valuePropositions.map((value) => <article key={value.englishName} className="lx-story">
        <h3>{value.title}</h3>
        <p lang="en">{value.englishName}</p>
        <p>{value.description}</p>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="solutions" title="Digital Solutions for Business" eyebrow="SOLUTIONS / FROM NEED TO DIRECTION" description="依照企業需求探索方案方向；實作範圍與交付內容依個別專案確認。">
      <div className="lx-stack">{home.solutionDirections.map((direction) => <article key={direction.solutionId} className="lx-story lx-stack">
        <h3>{direction.title}</h3>
        <p lang="en">{direction.englishName}</p>
        <p>{direction.description}</p>
        <LuxuryLink href={luxuryHref(direction.href)}>了解方案方向</LuxuryLink>
      </article>)}</div>
      <div className="lx-actions">
        <LuxuryLink href={luxuryPageHref("solutions")}>了解解決方案</LuxuryLink>
      </div>
    </LuxurySection>

    <LuxurySection id="home-cooperation" title={services.page.process.title} description={services.page.process.description} eyebrow="WORKING TOGETHER">
      <LuxuryCooperation steps={services.process} />
    </LuxurySection>
    <LuxurySection id="contact" title="從專案需求，開始規劃下一步。" eyebrow="LET’S BUILD SOMETHING VALUABLE" description="無論是企業網站、Java 系統開發、系統整合或 AI 應用，先整理目標、現況與討論範圍，讓後續的詢價與交流更清楚。">
      <div className="lx-contact-panel lx-stack">
        <h3>{contact.action.state === "preparation" ? "先整理專案需求" : "開始專案詢價"}</h3>
        <p id="contact-inquiry-note">{contact.action.description}</p>
        <div className="lx-actions">
          <LuxuryInquiry describedBy="contact-inquiry-note" />
          <LuxuryLink href={luxuryPageHref("contact")}>查看聯絡資訊</LuxuryLink>
        </div>
      </div>
    </LuxurySection>
  </div>;
}

export function LuxuryAbout() {
  const { about, site } = getDesignContent();
  const { page } = about;
  return <div className="lx-pages">
    <LuxuryHero title={page.titleLines.join("")} description={page.description} eyebrow="ABOUT XPLORE KALEIDOSCOPE">
      <p lang="en">{site.slogan}</p>
      <p lang="en">{site.tagline}</p>
      <div className="lx-actions">
        <LuxuryLink href="#who-we-are" variant="button">認識我們</LuxuryLink>
      </div>
    </LuxuryHero>
    <LuxurySection id="who-we-are" title="我們是誰" eyebrow="WHO WE ARE" description={page.whoWeAre.introduction}>
      <div className="lx-reading lx-stack">
        <p>{page.whoWeAre.description}</p>
        <p className="lx-note">{page.whoWeAre.operatingModel}</p>
        <h3>我們重視</h3>
        <LuxuryTextList items={page.whoWeAre.priorities} />
      </div>
    </LuxurySection>
    <LuxurySection id="mission" title="我們的使命" eyebrow="OUR MISSION" description={page.mission.statement}>
      <p className="lx-reading">{page.mission.description}</p>
      <div className="lx-grid">{page.mission.pillars.map((pillar) => <article key={pillar.title} className="lx-story">
        <h3>{pillar.title}</h3>
        <p>{pillar.description}</p>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="vision" title="我們的願景" eyebrow="OUR VISION" description={page.vision.statement}>
      <div className="lx-reading">
        <h3>發展方向</h3>
        <LuxuryTextList items={page.vision.directions} />
        <p className="lx-note">以上為品牌逐步發展的方向。</p>
      </div>
    </LuxurySection>
    <LuxurySection id="capabilities" title="核心技術能力" eyebrow="CORE CAPABILITIES" description="從網站到企業系統，從系統整合到 AI 應用，連結不同需求所需的技術能力。">
      <div className="lx-stack">{about.capabilities.map((capability) => <article key={capability.id} className="lx-story lx-stack">
        <h3>{capability.title}</h3>
        <p lang="en">{capability.name}</p>
        <LuxuryTextList items={capability.items} />
      </article>)}</div>
      <p className="lx-note">以上為 XK 可提供的技術服務能力，不代表每項技術都已部署於目前官網。</p>
    </LuxurySection>
    <LuxurySection id="approach" title="我們的工作方式" eyebrow="OUR APPROACH" description="先理解問題，再選擇技術；以清楚的階段，讓規劃、實作與交付保持連貫。">
      <LuxuryCooperation steps={about.approach} />
    </LuxurySection>
    <LuxurySection id="founder" title={page.engineeringApproach.title} eyebrow={page.engineeringApproach.eyebrow} description={page.engineeringApproach.introduction}>
      <div className="lx-reading lx-stack">
        <p>{page.engineeringApproach.description}</p>
        <h3>專注領域</h3>
        <LuxuryTextList items={about.founder.focusAreas} />
      </div>
    </LuxurySection>
    <LuxurySection id="commitment" title="我們重視的不只是交付，更是長期價值。" eyebrow="OUR COMMITMENT" description="以清楚的服務理念，思考每一次技術選擇與合作。">
      <div className="lx-grid">{about.commitments.map((commitment) => <article key={commitment.name} className="lx-story">
        <h3>{commitment.title}</h3>
        <p lang="en">{commitment.name}</p>
        <p>{commitment.description}</p>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="about-next-step" title="讓我們一起探索下一個數位可能。" eyebrow="EXPLORE WHAT COMES NEXT" description="無論是企業網站、Java 系統、系統整合或 AI 應用，都可以從理解需求開始。">
      <div className="lx-contact-panel lx-actions">
        <LuxuryLink href={luxuryPageHref("home", "services")} variant="button">了解服務</LuxuryLink>
        <LuxuryLink href={luxuryPageHref("home", "contact")}>聯絡 XK</LuxuryLink>
        <LuxuryInquiry />
      </div>
    </LuxurySection>
  </div>;
}

export function LuxuryServices() {
  const { services, site } = getDesignContent();
  const { page } = services;
  return <div className="lx-pages">
    <LuxuryHero title={page.hero.titleLines.join("")} description={page.hero.description} eyebrow={page.hero.englishTitle}>
      <p lang="en">{site.tagline}</p>
      <p lang="en">Web · Java · AI</p>
      <p lang="en">{site.slogan}</p>
      <div className="lx-actions">
        <LuxuryLink href={luxuryHref(page.hero.primaryCta.href)} variant="button">{page.hero.primaryCta.label}</LuxuryLink>
        <LuxuryLink href={luxuryPageHref("quotation")}>立即試算方案</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.hero.secondaryCta.href)}>{page.hero.secondaryCta.label}</LuxuryLink>
      </div>
    </LuxuryHero>
    <LuxurySection id="service-overview" title={page.overview.title} description={page.overview.description} eyebrow="OUR SERVICES">
      <div className="lx-stack">{services.categories.map((service) => <article key={service.id} className="lx-story">
        <h3>{service.title}</h3>
        <p lang="en">{service.englishTitle}</p>
        <p>{service.summary}</p>
        <LuxuryLink href={`#${service.id}`}>查看服務內容</LuxuryLink>
      </article>)}</div>
    </LuxurySection>
    <LuxuryServicePlans showPricingGuide />
    {services.categories.map((service) => <LuxurySection key={service.id} id={service.id} title={service.title} eyebrow={service.englishTitle} description={service.summary}>
      <div className="lx-reading lx-stack">
        <p>{service.description}</p>
        <h3>適用情境</h3>
        <p>{service.scenario}</p>
      </div>
      <LuxuryDisclosure title={`${service.title}：服務內容與技術範圍`}>
        <div className="lx-grid">
          <div>
            <h3>服務內容</h3>
            <LuxuryTextList items={service.items} />
          </div>
          <div>
            <h3>技術範圍</h3>
            <LuxuryTextList items={service.technologies.map(({ name }) => name)} />
          </div>
        </div>
      </LuxuryDisclosure>
      {service.id === "website-development" && <aside className="lx-note lx-stack" aria-labelledby="one-page-website-title">
        <h3 id="one-page-website-title">{page.websiteGuide.title}</h3>
        <p>{page.websiteGuide.description}</p>
        <div className="lx-actions">
          <LuxuryLink href={luxuryHref(page.websiteGuide.samplesLink.href)} variant="button">{page.websiteGuide.samplesLink.label}</LuxuryLink>
          <LuxuryLink href={luxuryHref(page.websiteGuide.showcasesLink.href)}>{page.websiteGuide.showcasesLink.label}</LuxuryLink>
        </div>
      </aside>}
    </LuxurySection>)}
    <LuxurySection id="service-combinations" title={page.integration.title} description={page.integration.description} eyebrow="SERVICE INTEGRATION">
      <p className="lx-note">{page.integration.exampleLabel}</p>
      <div className="lx-stack">{services.examples.map((example) => <article key={example.title} className="lx-story">
        <h3>{example.title}</h3>
        <LuxuryTextList items={example.services} />
        <p>{example.description}</p>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="services-process" title={page.process.title} description={page.process.description} eyebrow="OUR PROCESS">
      <LuxuryCooperation steps={services.process} />
    </LuxurySection>
    <LuxurySection id="services-next-step" title={page.cta.title} description={page.cta.description}>
      <div className="lx-contact-panel lx-actions">
        <LuxuryLink href={luxuryHref(page.cta.primary.href)} variant="button">{page.cta.primary.label}</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.cta.secondary.href)}>{page.cta.secondary.label}</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.cta.home.href)}>{page.cta.home.label}</LuxuryLink>
        <LuxuryInquiry />
      </div>
    </LuxurySection>
  </div>;
}

export function LuxurySolutions() {
  const { solutions, services, portfolio, site } = getDesignContent();
  const { page, definitions } = solutions;
  return <div className="lx-pages">
    <LuxuryHero id="solutions-hero" title={page.hero.title} description={page.hero.description} eyebrow={page.hero.englishTitle}>
      <p lang="en">{site.tagline}</p>
      <p lang="en">{site.slogan}</p>
      <LuxuryBadge>{page.directionLabel}</LuxuryBadge>
      <div className="lx-actions">
        <LuxuryLink href={luxuryHref(page.hero.primaryCta.href)} variant="button">{page.hero.primaryCta.label}</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.hero.secondaryCta.href)}>{page.hero.secondaryCta.label}</LuxuryLink>
      </div>
    </LuxuryHero>
    <LuxurySection id="business-challenges" title={page.challenges.title} description={page.challenges.description} eyebrow="BUSINESS CHALLENGES">
      <div className="lx-grid">{definitions.map((solution) => <article key={solution.id} className="lx-story">
        <h3>{solution.challengeTitle}</h3>
        <LuxuryTextList items={solution.challenges} />
        <LuxuryLink href={`#${solution.anchor}`}>{solution.title}</LuxuryLink>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="solutions-overview" title={page.overview.title} description={page.overview.description} eyebrow="SOLUTION DIRECTIONS">
      <p className="lx-note">{page.directionLabel}</p>
      <div className="lx-stack">{definitions.map((solution) => <article key={solution.id} className="lx-story">
        <h3>{solution.title}</h3>
        <p lang="en">{solution.englishTitle}</p>
        <p>{solution.summary}</p>
        <LuxuryLink href={`#${solution.anchor}`}>查看規劃方向</LuxuryLink>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="solution-details" title={page.details.title} description={page.details.description} eyebrow="FROM CONTEXT TO IMPLEMENTATION">
      <div className="lx-stack">{definitions.map((solution) => {
        const reference = solutions.showcases.find(({ solutionId }) => solutionId === solution.id);
        const project = reference && getDesignProject(reference.slug);
        if (!reference || !project) throw new Error(`Missing Luxury related technical plan: ${solution.id}`);
        return <article key={solution.id} id={solution.anchor} aria-labelledby={`${solution.anchor}-title`} className="lx-story lx-stack" data-solution-status={solution.status}>
          <p lang="en">{solution.englishTitle}</p>
          <h3 id={`${solution.anchor}-title`}>{solution.title}</h3>
          <LuxuryBadge>{page.directionLabel}</LuxuryBadge>
          <h4>適用情境</h4>
          <p>{solution.audience}</p>
          <h4>需要理解的問題</h4>
          <LuxuryTextList items={solution.challenges} />
          <h4>方案定位</h4>
          <p>{solution.positioning}</p>
          <LuxuryDisclosure title={`${solution.title}：實施與交付方向`}>
            <div className="lx-stack">
              <h4>涉及能力與技術</h4>
              <LuxuryTextList items={solution.technologies.map(({ name }) => name)} />
              <h4>實施方向</h4>
              <ol className="lx-list">{solution.implementationSteps.map((step) => <li key={step.title}>
                <h5>{step.title}</h5>
                <p>{step.description}</p>
              </li>)}</ol>
              <h4>可規劃的交付</h4>
              <p className="lx-note">實際內容依需求、可用資料與約定範圍確認。</p>
              <LuxuryTextList items={solution.deliverables} />
              <h4>希望改善的面向</h4>
              <LuxuryTextList items={solution.improvementGoals} />
              <h4>相關技術服務</h4>
              <LuxuryServiceLinks ids={solution.serviceIds} />
            </div>
          </LuxuryDisclosure>
          {solution.id === "digital-presence" && <div className="lx-note">
            <h4>品牌網站展示</h4>
            <p>從{portfolio.websiteShowcases.filter((showcase) => portfolio.settings.featuredIds.some((id) => id === showcase.id)).map(({ title }) => title).join("、")}的品牌展示，了解品牌故事、商品資訊與企業介紹的網站呈現；網站範例則提供不同主題的版面參考。</p>
            <div className="lx-actions">
              <LuxuryLink href={luxuryPageHref("portfolio", "website-cases")}>查看展示案例</LuxuryLink>
              <LuxuryLink href={luxuryPageHref("portfolio", "website-samples")}>瀏覽網站範例</LuxuryLink>
            </div>
          </div>}
          <div className="lx-note lx-stack">
            <h4>{solution.id === "digital-presence" ? "延伸技術規劃" : "相關展示規劃"}</h4>
            <p>{reference.note}</p>
            <LuxuryBadge>{portfolio.page.statusLabels[project.status]}</LuxuryBadge>
            <LuxuryLink href={luxuryDetailHref("technical-project", project.slug)}>{project.title}</LuxuryLink>
          </div>
          <LuxuryLink href={luxuryHref(solution.cta.href)} aria-label={`${solution.cta.label}：${solution.title}`}>{solution.cta.label}</LuxuryLink>
        </article>;
      })}</div>
    </LuxurySection>
    <LuxurySection id="solution-technology" title={page.technology.title} description={page.technology.description} eyebrow="CONNECTING CAPABILITIES">
      <div className="lx-grid">{definitions.map((solution) => <article key={solution.id} className="lx-story">
        <h3>{solution.title}</h3>
        <p lang="en">{solution.englishTitle}</p>
        <dl className="lx-definition">
          <div>
            <dt>企業需求</dt>
            <dd>{solution.audience}</dd>
          </div>
          <div>
            <dt>技術能力</dt>
            <dd>
              <LuxuryTextList items={solution.technologies.map(({ name }) => name)} />
            </dd>
          </div>
          <div>
            <dt>對應技術服務</dt>
            <dd>
              <LuxuryServiceLinks ids={solution.serviceIds} />
            </dd>
          </div>
        </dl>
      </article>)}</div>
      <aside className="lx-note lx-stack">
        <h3>{page.technology.support.title}</h3>
        <p>{page.technology.support.description}</p>
        <LuxuryServiceLinks ids={[page.technology.support.serviceId]} />
      </aside>
    </LuxurySection>
    <LuxurySection id="solution-combinations" title={page.combinations.title} description={page.combinations.description} eyebrow="COMBINING SERVICES">
      <div className="lx-stack">{solutions.combinations.map((combination) => <article key={combination.title} className="lx-story lx-stack">
        <p>{combination.label}</p>
        <h3>{combination.title}</h3>
        <p>{combination.description}</p>
        <h4>相關方案方向</h4>
        <ul className="lx-list">{definitions.filter((solution) => combination.solutionIds.some((id) => id === solution.id)).map((solution) => <li key={solution.id}>
          <LuxuryLink href={`#${solution.anchor}`}>{solution.title}</LuxuryLink>
        </li>)}</ul>
        <h4>服務組合</h4>
        <LuxuryServiceLinks ids={combination.serviceIds} />
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="implementation-approach" title={page.approach.title} description={page.approach.description} eyebrow="OUR APPROACH">
      <LuxuryCooperation steps={services.process} />
    </LuxurySection>
    <LuxurySection id="why-xk-solutions" title={page.value.title} description={page.value.description} eyebrow="WORKING WITH XK">
      <div className="lx-grid">{solutions.valuePrinciples.map((principle) => <article key={principle.title} className="lx-story">
        <h3>{principle.title}</h3>
        <p>{principle.description}</p>
      </article>)}</div>
      <div className="lx-actions">
        <LuxuryLink href={luxuryHref(page.cta.aboutLink.href)}>{page.cta.aboutLink.label}</LuxuryLink>
      </div>
    </LuxurySection>
    <LuxurySection id="solutions-next-step" title={page.cta.title} description={page.cta.description}>
      <div className="lx-contact-panel lx-actions">
        <LuxuryLink href={luxuryHref(page.cta.primaryCta.href)} variant="button">{page.cta.primaryCta.label}</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.cta.secondaryCta.href)}>{page.cta.secondaryCta.label}</LuxuryLink>
        <LuxuryInquiry />
      </div>
    </LuxurySection>
  </div>;
}

export function LuxuryPortfolio() {
  const { portfolio, site } = getDesignContent();
  const { page } = portfolio;
  const brands = portfolio.websiteShowcases.filter((showcase) => showcase.kind === "brand-demo");
  const templates = portfolio.websiteShowcases.filter((showcase) => showcase.kind === "template");
  return <div className="lx-pages">
    <LuxuryHero id="portfolio-hero" title={page.hero.title} description={page.hero.description} eyebrow={page.hero.englishTitle}>
      <p lang="en">{site.tagline}</p>
      <p lang="en">{site.slogan}</p>
      <div className="lx-actions">
        <LuxuryLink href={luxuryHref(page.hero.primaryCta.href)} variant="button">{page.hero.primaryCta.label}</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.hero.secondaryCta.href)}>{page.hero.secondaryCta.label}</LuxuryLink>
      </div>
    </LuxuryHero>
    <LuxurySection id="portfolio-introduction" title={page.introduction.title} description={page.introduction.description} eyebrow="ABOUT THE PORTFOLIO">
      <LuxuryChapterLinks label="作品展示分類" items={[{ href: "#website-cases", label: "品牌網站展示案例" }, { href: "#website-samples", label: "第三方模板範例" }, { href: "#portfolio-projects", label: "技術展示規劃" }]} />
      <p className="lx-note">先瀏覽品牌展示、提案與自家服務推廣，了解各案的設計與實作範圍。第三方模板與技術展示規劃預設收合，可依需要展開閱讀。</p>
    </LuxurySection>
    <LuxurySection id="website-cases" title="品牌網站展示案例" eyebrow="BRAND WEBSITE SHOWCASES" description="從餐飲、送禮到網站服務與工業製造，探索品牌資訊的不同呈現方式。各項標示品牌展示、品牌提案或自家服務推廣性質，可先閱讀作品介紹，再前往展示網站。">
      <div className="lx-stack">{brands.map((showcase) => <LuxuryWebsiteWork key={showcase.id} showcase={showcase} />)}</div>
    </LuxurySection>
    <LuxurySection id="website-samples" title="網站模板範例" eyebrow="WEBSITE TEMPLATE SAMPLES" description="參考工作室、簡潔形象、產品 App 與餐廳的頁面安排。這些範例採用第三方模板，各卡片均標示原始來源；素材待整理的項目暫停外連。">
      <ul className="lx-list" aria-label="模板可用狀態">{templates.map((showcase) => <li key={showcase.id}>{showcase.title}：{portfolio.stateLabels[showcase.availability ?? "available"]}</li>)}</ul>
      <LuxuryDisclosure title={`查看 ${templates.length} 個第三方模板範例`}>
        <div className="lx-stack">{templates.map((showcase) => <LuxuryWebsiteWork key={showcase.id} showcase={showcase} />)}</div>
      </LuxuryDisclosure>
    </LuxurySection>
    <LuxurySection id="portfolio-projects" title={page.projects.title} description={page.projects.description} eyebrow="PROJECT PLANS">
      <ul className="lx-list" aria-label="技術展示規劃狀態">{portfolio.projects.map((project) => <li key={project.slug}>
        <span lang="en">{project.title}</span>：{page.statusLabels[project.status]}</li>)}</ul>
      <LuxuryDisclosure title={`查看 ${portfolio.projects.length} 個技術展示規劃（Planned）`}>
        <div className="lx-stack">{portfolio.projects.map((project) => <LuxuryTechnicalCard key={project.slug} project={project} />)}</div>
      </LuxuryDisclosure>
    </LuxurySection>
    <LuxurySection id="portfolio-technology" title={page.technology.title} description={page.technology.description} eyebrow="TECHNOLOGY DIRECTIONS">
      <div className="lx-stack">{portfolio.projects.map((project) => <article key={project.slug} className="lx-story lx-stack">
        <h3 lang="en">{project.category}</h3>
        <p lang="en">{project.title}</p>
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
          </div>{project.futureTechnologies.length > 0 && <div>
            <dt>{page.detail.futureLabel}</dt>
            <dd>
              <LuxuryTextList items={project.futureTechnologies} />
            </dd>
          </div>}</dl>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="portfolio-transparency" title={page.transparency.title} description={page.transparency.description} eyebrow="STATUS AND EVIDENCE">
      <div className="lx-grid">{page.transparency.principles.map((principle) => <article key={principle.title} className="lx-story">
        <h3>{principle.title}</h3>
        <p>{principle.description}</p>
      </article>)}</div>
    </LuxurySection>
    <LuxurySection id="portfolio-next-step" title={page.cta.title} description={page.cta.description}>
      <div className="lx-contact-panel lx-actions">
        <LuxuryLink href={luxuryHref(page.cta.primaryCta.href)} variant="button">{page.cta.primaryCta.label}</LuxuryLink>
        <LuxuryLink href={luxuryHref(page.cta.secondaryCta.href)}>{page.cta.secondaryCta.label}</LuxuryLink>
        <LuxuryInquiry />
      </div>
    </LuxurySection>
  </div>;
}
