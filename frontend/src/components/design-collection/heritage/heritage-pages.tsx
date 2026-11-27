import "server-only";

import { getDesignContent, getDesignProject } from "@/lib/design-collection/content";
import { heritageDetailHref, heritageHref, heritagePageHref } from "./heritage-links";
import { HeritageBadge, HeritageHero, HeritageLink, HeritageList, HeritageSection } from "./heritage-ui";
import { HeritageChapters, HeritageInquiry, HeritagePlans, HeritageProcess, HeritageProjectEntry, HeritageServiceLinks, HeritageWebsiteEntry } from "./heritage-content-shared";

export { HeritageTechnicalProject, HeritageBrandShowcase } from "./heritage-content-details";

export function HeritageHome() {
  const { home, site, services, portfolio, contact } = getDesignContent();
  const featured = portfolio.websiteShowcases.filter((entry) => portfolio.settings.featuredIds.some((id) => id === entry.id));
  return <div className="htg-page" data-deferred-sections>
    <HeritageHero id="home-hero" title={home.hero.title} description={home.hero.description} eyebrow={home.hero.eyebrow}>
      <p className="htg-kicker" lang="en">READING INDEX</p>
      <h2>從需求出發，連結每一項技術。</h2>
      <p>{home.hero.portfolioNote}</p>
      <HeritageChapters items={[{ href: "/modern#services", label: "服務目錄" }, { href: "/modern#featured-websites", label: "作品圖說" }, { href: "/modern#contact", label: "合作與下一步" }]} />
      <div className="htg-actions">
        <HeritageInquiry descriptionId="home-inquiry-note" />
        <HeritageLink href={heritagePageHref("quotation")}>立即試算方案</HeritageLink>
      </div>
      <p id="home-inquiry-note" className="htg-note">{contact.action.description}</p>
      <p lang="en">{site.tagline}</p>
      <p lang="en">{site.slogan}</p>
      <HeritageList items={home.hero.serviceLabels} />
      <p className="htg-note">從數位入口到企業系統，以整合思維連結每個技術環節。</p>
      <HeritageLink href={heritagePageHref("portfolio")}>查看作品展示</HeritageLink>
    </HeritageHero>

    <HeritageSection id="about" title="讓技術成為企業成長的力量" eyebrow="ABOUT XPLORE KALEIDOSCOPE">
      <div id="brand" className="htg-lead-grid">
        <p>Xplore Kaleidoscope 整合網站開發、Java 企業系統、系統架構與 AI 應用技術，協助企業建立穩定、可擴充且符合實際營運需求的數位解決方案。</p>
        <p>從網站建置、系統整合到 AI 應用，我們重視技術品質、實際效益與長期維護，讓數位技術真正創造商業價值。</p>
      </div>
    </HeritageSection>

    <HeritageSection id="services" title="Our Services" eyebrow="01 / SERVICE DIRECTORY" description="從常見需求出發，規劃服務與交付內容；實際範圍依個別專案確認。">
      <div className="htg-numbered-list">{home.services.map((service) => <article key={service.id} id={`service-${service.anchor}`} className="htg-numbered-item">
        <p className="htg-number">{service.id}</p>
        <div className="htg-two-column">
          <div className="htg-stack">
            <h3>{service.name}</h3>
            <p className="htg-kicker" lang="en">{service.englishName}</p>
          </div>
          <div className="htg-stack">
            <dl className="htg-definition-list">
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
            <HeritageLink href={heritagePageHref("services", service.serviceId)}>{service.learnMoreLabel}</HeritageLink>
          </div>
        </div>
      </article>)}</div>
      <HeritageLink href={heritagePageHref("services")}>了解完整服務</HeritageLink>
    </HeritageSection>
    <HeritagePlans />

    <HeritageSection id="featured-websites" title="精選網站展示" eyebrow="02 / SELECTED WORKS" description="透過餐飲、禮品與工業製造的自製展示案例，了解品牌故事、產品與服務可以如何呈現。各案例的展示性質與使用限制皆於卡片說明。" variant="surface">
      <div className="htg-stack">{featured.map((showcase, index) => <HeritageWebsiteEntry key={showcase.id} showcase={showcase} number={index + 1} />)}</div>
      <HeritageLink href={heritagePageHref("portfolio", "website-cases")}>查看全部作品</HeritageLink>
    </HeritageSection>

    <HeritageSection id="technologies" title="Technology Capabilities" eyebrow="TECHNOLOGY / CONNECTED CAPABILITIES" description="以合適的技術與架構，實作企業所需的服務。">
      <div className="htg-two-column">{home.technologyGroups.map((group) => <article key={group.name} className="htg-editorial-card">
        <h3 lang="en">{group.name}</h3>
        <p>{group.description}</p>
        <HeritageList items={group.items} />
      </article>)}</div>
      <p className="htg-note">XK 依照不同專案需求，選擇適合的技術與架構，提供具備擴充性及可維護性的數位解決方案。</p>
    </HeritageSection>
    <HeritageSection id="why-xk" title="Why Xplore Kaleidoscope" eyebrow="OUR APPROACH / BUILT FOR VALUE" description="從技術實作到商業價值，提供完整的數位解決方案。" variant="surface">
      <ol className="htg-numbered-list">{home.valuePropositions.map((value, index) => <li key={value.englishName} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="htg-stack">
          <h3>{value.title}</h3>
          <p className="htg-kicker" lang="en">{value.englishName}</p>
          <p>{value.description}</p>
        </div>
      </li>)}</ol>
    </HeritageSection>
    <HeritageSection id="solutions" title="Digital Solutions for Business" eyebrow="SOLUTIONS / FROM NEED TO DIRECTION" description="依照企業需求探索方案方向；實作範圍與交付內容依個別專案確認。">
      <ol className="htg-numbered-list">{home.solutionDirections.map((direction, index) => <li key={direction.solutionId} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="htg-two-column">
          <div>
            <h3>{direction.title}</h3>
            <p className="htg-kicker" lang="en">{direction.englishName}</p>
          </div>
          <div>
            <p>{direction.description}</p>
            <HeritageLink href={heritageHref(direction.href)}>了解方案方向</HeritageLink>
          </div>
        </div>
      </li>)}</ol>
      <HeritageLink href={heritagePageHref("solutions")}>了解解決方案</HeritageLink>
    </HeritageSection>
    <HeritageSection id="contact" title="從專案需求，開始規劃下一步。" eyebrow="03 / WORKING TOGETHER" description="無論是企業網站、Java 系統開發、系統整合或 AI 應用，先整理目標、現況與討論範圍，讓後續的詢價與交流更清楚。">
      <div className="htg-lead-grid">
        <div>
          <h3>{services.page.process.title}</h3>
          <HeritageProcess steps={services.process} />
          <p className="htg-note">{services.page.process.description}</p>
        </div>
        <aside className="htg-editorial-card">
          <h3>{contact.action.state === "preparation" ? "先整理專案需求" : "開始專案詢價"}</h3>
          <p id="contact-inquiry-note">{contact.action.description}</p>
          <div className="htg-actions">
            <HeritageInquiry descriptionId="contact-inquiry-note" />
            <HeritageLink href={heritagePageHref("contact")}>查看聯絡資訊</HeritageLink>
            <HeritageLink href={heritagePageHref("quotation")}>立即試算方案</HeritageLink>
          </div>
          <p className="htg-note">試算提供參考估價，實際範圍與費用依需求另行確認。</p>
        </aside>
      </div>
    </HeritageSection>
  </div>;
}

export function HeritageAbout() {
  const { about, site } = getDesignContent();
  const page = about.page;
  return <div className="htg-page">
    <HeritageHero title={page.titleLines.join("")} description={page.description} eyebrow="ABOUT XPLORE KALEIDOSCOPE">
      <p lang="en">{site.slogan}</p>
      <p lang="en">{site.tagline}</p>
      <HeritageChapters items={[{ href: "#who-we-are", label: "我們是誰" }, { href: "#capabilities", label: "核心技術能力" }, { href: "#approach", label: "工作方式" }]} />
    </HeritageHero>
    <HeritageSection id="who-we-are" title="我們是誰" eyebrow="WHO WE ARE" description={page.whoWeAre.introduction}>
      <div className="htg-lead-grid">
        <div className="htg-stack">
          <p>{page.whoWeAre.description}</p>
          <p className="htg-note">{page.whoWeAre.operatingModel}</p>
        </div>
        <aside>
          <h3>我們重視</h3>
          <HeritageList items={page.whoWeAre.priorities} />
        </aside>
      </div>
    </HeritageSection>
    <HeritageSection id="mission" title="我們的使命" eyebrow="OUR MISSION" description={page.mission.statement} variant="surface">
      <p className="htg-reading">{page.mission.description}</p>
      <div className="htg-three-column">{page.mission.pillars.map((pillar) => <article key={pillar.title} className="htg-editorial-card">
        <h3>{pillar.title}</h3>
        <p>{pillar.description}</p>
      </article>)}</div>
    </HeritageSection>
    <HeritageSection id="vision" title="我們的願景" eyebrow="OUR VISION" description={page.vision.statement}>
      <div className="htg-lead-grid">
        <h3>發展方向</h3>
        <div>
          <HeritageList items={page.vision.directions} />
          <p className="htg-note">以上為品牌逐步發展的方向。</p>
        </div>
      </div>
    </HeritageSection>
    <HeritageSection id="capabilities" title="核心技術能力" eyebrow="CORE CAPABILITIES" description="從網站到企業系統，從系統整合到 AI 應用，連結不同需求所需的技術能力。" variant="surface">
      <ol className="htg-numbered-list">{about.capabilities.map((capability) => <li key={capability.id} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{capability.id}</span>
        <div className="htg-two-column">
          <div>
            <h3>{capability.title}</h3>
            <p className="htg-kicker" lang="en">{capability.name}</p>
          </div>
          <HeritageList items={capability.items} />
        </div>
      </li>)}</ol>
      <p className="htg-note">以上為 XK 可提供的技術服務能力，不代表每項技術都已部署於目前官網。</p>
    </HeritageSection>
    <HeritageSection id="approach" title="我們的工作方式" eyebrow="OUR APPROACH" description="先理解問題，再選擇技術；以清楚的階段，讓規劃、實作與交付保持連貫。">
      <HeritageProcess steps={about.approach} />
    </HeritageSection>
    <HeritageSection id="founder" title={page.engineeringApproach.title} eyebrow={page.engineeringApproach.eyebrow} description={page.engineeringApproach.introduction} variant="surface">
      <div className="htg-lead-grid">
        <p>{page.engineeringApproach.description}</p>
        <aside>
          <h3>專注領域</h3>
          <HeritageList items={about.founder.focusAreas} />
        </aside>
      </div>
    </HeritageSection>
    <HeritageSection id="commitment" title="我們重視的不只是交付，更是長期價值。" eyebrow="OUR COMMITMENT" description="以清楚的服務理念，思考每一次技術選擇與合作。">
      <div className="htg-two-column">{about.commitments.map((commitment) => <article key={commitment.name} className="htg-editorial-card">
        <p className="htg-kicker" lang="en">{commitment.name}</p>
        <h3>{commitment.title}</h3>
        <p>{commitment.description}</p>
      </article>)}</div>
    </HeritageSection>
    <HeritageSection id="about-next-step" title="讓我們一起探索下一個數位可能。" eyebrow="EXPLORE WHAT COMES NEXT" description="無論是企業網站、Java 系統、系統整合或 AI 應用，都可以從理解需求開始。" variant="surface">
      <div className="htg-actions">
        <HeritageLink href={heritagePageHref("home", "services")} primary>了解服務</HeritageLink>
        <HeritageLink href={heritagePageHref("home", "contact")}>聯絡 XK</HeritageLink>
        <HeritageInquiry />
      </div>
    </HeritageSection>
  </div>;
}

export function HeritageServices() {
  const { services, site } = getDesignContent();
  const { page } = services;
  return <div className="htg-page">
    <HeritageHero title={page.hero.titleLines.join("")} description={page.hero.description} eyebrow={page.hero.englishTitle}>
      <p lang="en">{site.tagline}</p>
      <p lang="en">Web · Java · AI</p>
      <p lang="en">{site.slogan}</p>
      <div className="htg-actions">
        <HeritageLink href={heritagePageHref("quotation")} primary>立即試算方案</HeritageLink>
        <HeritageLink href={heritageHref(page.hero.primaryCta.href)}>{page.hero.primaryCta.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.hero.secondaryCta.href)}>{page.hero.secondaryCta.label}</HeritageLink>
      </div>
      <HeritageChapters items={services.categories.map((service) => ({ href: `#${service.id}`, label: service.title }))} />
    </HeritageHero>
    <HeritageSection id="service-overview" title={page.overview.title} description={page.overview.description} eyebrow="SERVICE DIRECTORY">
      <ol className="htg-numbered-list">{services.categories.map((service) => <li key={service.id} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{service.number}</span>
        <div className="htg-two-column">
          <div>
            <h3>{service.title}</h3>
            <p lang="en" className="htg-kicker">{service.englishTitle}</p>
          </div>
          <div>
            <p>{service.summary}</p>
            <HeritageLink href={`#${service.id}`}>查看服務內容</HeritageLink>
          </div>
        </div>
      </li>)}</ol>
    </HeritageSection>
    <HeritagePlans pricing />
    {services.categories.map((service) => <HeritageSection key={service.id} id={service.id} title={service.title} eyebrow={`SERVICE ${service.number} / ${service.englishTitle}`} description={service.summary}>
      <div className="htg-lead-grid">
        <div className="htg-stack">
          <p>{service.description}</p>
          <aside className="htg-note">
            <h3>適用情境</h3>
            <p>{service.scenario}</p>
          </aside>
        </div>
        <div className="htg-stack">
          <h3>服務內容</h3>
          <HeritageList items={service.items} />
          <div className="htg-rule">
            <h3>技術範圍</h3>
            <HeritageList items={service.technologies.map(({ name }) => name)} />
          </div>
        </div>
      </div>
      {service.id === "website-development" && (
        <aside className="htg-note" aria-labelledby="one-page-website-title">
          <h3 id="one-page-website-title">{page.websiteGuide.title}</h3>
          <p>{page.websiteGuide.description}</p>
          <div className="htg-actions">
            <HeritageLink href={heritageHref(page.websiteGuide.samplesLink.href)} primary>{page.websiteGuide.samplesLink.label}</HeritageLink>
            <HeritageLink href={heritageHref(page.websiteGuide.showcasesLink.href)}>{page.websiteGuide.showcasesLink.label}</HeritageLink>
          </div>
        </aside>
      )}
    </HeritageSection>)}
    <HeritageSection id="service-combinations" title={page.integration.title} description={page.integration.description} eyebrow="SERVICE INTEGRATION" variant="surface">
      <p className="htg-note">{page.integration.exampleLabel}</p>
      <ol className="htg-numbered-list">{services.examples.map((example, index) => <li key={example.title} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="htg-two-column">
          <h3>{example.title}</h3>
          <div>
            <HeritageList items={example.services} />
            <p>{example.description}</p>
          </div>
        </div>
      </li>)}</ol>
    </HeritageSection>
    <HeritageSection id="services-process" title={page.process.title} description={page.process.description} eyebrow="WORKING TOGETHER">
      <HeritageProcess steps={services.process} />
    </HeritageSection>
    <HeritageSection id="services-next-step" title={page.cta.title} description={page.cta.description} variant="surface">
      <div className="htg-actions">
        <HeritageLink href={heritageHref(page.cta.primary.href)} primary>{page.cta.primary.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.cta.secondary.href)}>{page.cta.secondary.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.cta.home.href)}>{page.cta.home.label}</HeritageLink>
        <HeritageInquiry />
      </div>
    </HeritageSection>
  </div>;
}

export function HeritageSolutions() {
  const { solutions, services, portfolio, site } = getDesignContent();
  const { page, definitions } = solutions;
  return <div className="htg-page">
    <HeritageHero id="solutions-hero" title={page.hero.title} description={page.hero.description} eyebrow={page.hero.englishTitle}>
      <p lang="en">{site.tagline}</p>
      <p lang="en">{site.slogan}</p>
      <p className="htg-note">{page.directionLabel}</p>
      <div className="htg-actions">
        <HeritageLink href={heritageHref(page.hero.primaryCta.href)} primary>{page.hero.primaryCta.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.hero.secondaryCta.href)}>{page.hero.secondaryCta.label}</HeritageLink>
      </div>
      <HeritageChapters items={definitions.map((solution) => ({ href: `#${solution.anchor}`, label: solution.title }))} />
    </HeritageHero>
    <HeritageSection id="business-challenges" title={page.challenges.title} description={page.challenges.description} eyebrow="BUSINESS CHALLENGES">
      <div className="htg-two-column">{definitions.map((solution) => <article key={solution.id} className="htg-editorial-card">
        <h3>{solution.challengeTitle}</h3>
        <HeritageList items={solution.challenges} />
        <HeritageLink href={`#${solution.anchor}`}>{solution.title}</HeritageLink>
      </article>)}</div>
    </HeritageSection>
    <HeritageSection id="solutions-overview" title={page.overview.title} description={page.overview.description} eyebrow="SOLUTION DIRECTIONS" variant="surface">
      <p className="htg-note">{page.directionLabel}</p>
      <ol className="htg-numbered-list">{definitions.map((solution, index) => <li key={solution.id} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="htg-two-column">
          <div>
            <h3>{solution.title}</h3>
            <p className="htg-kicker" lang="en">{solution.englishTitle}</p>
          </div>
          <div>
            <p>{solution.summary}</p>
            <HeritageLink href={`#${solution.anchor}`}>查看規劃方向</HeritageLink>
          </div>
        </div>
      </li>)}</ol>
    </HeritageSection>
    <HeritageSection id="solution-details" title={page.details.title} description={page.details.description} eyebrow="FROM CONTEXT TO IMPLEMENTATION">
      <div className="htg-stack">{definitions.map((solution, index) => {
        const reference = solutions.showcases.find(({ solutionId }) => solutionId === solution.id);
        const project = reference ? getDesignProject(reference.slug) : undefined;
        if (!reference || !project) throw new Error(`Missing Heritage solution plan: ${solution.id}`);
        return <article key={solution.id} id={solution.anchor} className="htg-editorial-card" aria-labelledby={`${solution.anchor}-title`} data-solution-status={solution.status}>
          <div className="htg-detail-layout">
            <div className="htg-stack">
              <p className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
              <p className="htg-kicker" lang="en">{solution.englishTitle}</p>
              <h3 id={`${solution.anchor}-title`}>{solution.title}</h3>
              <HeritageBadge>{page.directionLabel}</HeritageBadge>
              <h4>適用情境</h4>
              <p>{solution.audience}</p>
              <h4>需要理解的問題</h4>
              <HeritageList items={solution.challenges} />
              <h4>方案定位</h4>
              <p>{solution.positioning}</p>
            </div>
            <div className="htg-stack">
              <h4>涉及能力與技術</h4>
              <HeritageList items={solution.technologies.map(({ name }) => name)} />
              <h4>實施方向</h4>
              <ol className="htg-numbered-list">{solution.implementationSteps.map((step, number) => <li key={step.title} className="htg-numbered-item">
                <span className="htg-number" aria-hidden="true">{number + 1}</span>
                <div>
                  <h5>{step.title}</h5>
                  <p>{step.description}</p>
                </div>
              </li>)}</ol>
              <h4>可規劃的交付</h4>
              <p className="htg-note">實際內容依需求、可用資料與約定範圍確認。</p>
              <HeritageList items={solution.deliverables} />
              <h4>希望改善的面向</h4>
              <HeritageList items={solution.improvementGoals} />
              <h4>相關技術服務</h4>
              <HeritageServiceLinks ids={solution.serviceIds} />
              {solution.id === "digital-presence" && <div className="htg-note">
                <h4>品牌網站展示</h4>
                <p>從{portfolio.websiteShowcases.filter((showcase) => portfolio.settings.featuredIds.some((id) => id === showcase.id)).map(({ title }) => title).join("、")}的品牌展示，了解品牌故事、商品資訊與企業介紹的網站呈現；網站範例則提供不同主題的版面參考。</p>
                <div className="htg-actions">
                  <HeritageLink href={heritagePageHref("portfolio", "website-cases")}>查看展示案例</HeritageLink>
                  <HeritageLink href={heritagePageHref("portfolio", "website-samples")}>瀏覽網站範例</HeritageLink>
                </div>
              </div>}
              <div className="htg-rule">
                <h4>{solution.id === "digital-presence" ? "延伸技術規劃" : "相關展示規劃"}</h4>
                <p>{reference.note}</p>
                <HeritageBadge>{portfolio.page.statusLabels[project.status]}</HeritageBadge>
                <HeritageLink href={heritageDetailHref("technical-project", project.slug)}>{project.title}</HeritageLink>
              </div>
            </div>
          </div>
          <div className="htg-actions">
            <HeritageLink href={heritageHref(solution.cta.href)} aria-label={`${solution.title}：${solution.cta.label}`}>{solution.cta.label}</HeritageLink>
          </div>
        </article>;
      })}</div>
    </HeritageSection>
    <HeritageSection id="solution-technology" title={page.technology.title} description={page.technology.description} eyebrow="CONNECTING CAPABILITIES" variant="surface">
      <div className="htg-two-column">{definitions.map((solution) => <article key={solution.id} className="htg-editorial-card">
        <h3>{solution.title}</h3>
        <p lang="en" className="htg-kicker">{solution.englishTitle}</p>
        <dl className="htg-definition-list">
          <div>
            <dt>企業需求</dt>
            <dd>{solution.audience}</dd>
          </div>
          <div>
            <dt>技術能力</dt>
            <dd>
              <HeritageList items={solution.technologies.map(({ name }) => name)} />
            </dd>
          </div>
          <div>
            <dt>對應技術服務</dt>
            <dd>
              <HeritageServiceLinks ids={solution.serviceIds} />
            </dd>
          </div>
        </dl>
      </article>)}</div>
      <aside className="htg-note">
        <h3>{page.technology.support.title}</h3>
        <p>{page.technology.support.description}</p>
        <HeritageServiceLinks ids={[page.technology.support.serviceId]} />
      </aside>
    </HeritageSection>
    <HeritageSection id="solution-combinations" title={page.combinations.title} description={page.combinations.description} eyebrow="COMBINING SERVICES">
      <ol className="htg-numbered-list">{solutions.combinations.map((combination, index) => <li key={combination.title} className="htg-numbered-item">
        <span className="htg-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="htg-two-column">
          <div>
            <p className="htg-kicker">{combination.label}</p>
            <h3>{combination.title}</h3>
            <p>{combination.description}</p>
          </div>
          <div>
            <h4>相關方案方向</h4>
            <ul className="htg-index-list">{definitions.filter((solution) => combination.solutionIds.some((id) => id === solution.id)).map((solution) => <li key={solution.id}>
              <HeritageLink href={`#${solution.anchor}`}>{solution.title}</HeritageLink>
            </li>)}</ul>
            <h4>相關技術服務</h4>
            <HeritageServiceLinks ids={combination.serviceIds} />
          </div>
        </div>
      </li>)}</ol>
    </HeritageSection>
    <HeritageSection id="implementation-approach" title={page.approach.title} description={page.approach.description} eyebrow="OUR APPROACH" variant="surface">
      <HeritageProcess steps={services.process} />
    </HeritageSection>
    <HeritageSection id="why-xk-solutions" title={page.value.title} description={page.value.description} eyebrow="WORKING WITH XK">
      <div className="htg-two-column">{solutions.valuePrinciples.map((principle) => <article key={principle.title} className="htg-editorial-card">
        <h3>{principle.title}</h3>
        <p>{principle.description}</p>
      </article>)}</div>
      <HeritageLink href={heritageHref(page.cta.aboutLink.href)}>{page.cta.aboutLink.label}</HeritageLink>
    </HeritageSection>
    <HeritageSection id="solutions-next-step" title={page.cta.title} description={page.cta.description} variant="surface">
      <div className="htg-actions">
        <HeritageLink href={heritageHref(page.cta.primaryCta.href)} primary>{page.cta.primaryCta.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.cta.secondaryCta.href)}>{page.cta.secondaryCta.label}</HeritageLink>
        <HeritageInquiry />
      </div>
    </HeritageSection>
  </div>;
}

export function HeritagePortfolio() {
  const { portfolio, site } = getDesignContent();
  const { page } = portfolio;
  const brands = portfolio.websiteShowcases.filter((showcase) => showcase.kind === "brand-demo");
  const templates = portfolio.websiteShowcases.filter((showcase) => showcase.kind === "template");
  return <div className="htg-page">
    <HeritageHero id="portfolio-hero" title={page.hero.title} description={page.hero.description} eyebrow={page.hero.englishTitle}>
      <p lang="en">{site.tagline}</p>
      <p lang="en">{site.slogan}</p>
      <div className="htg-actions">
        <HeritageLink href={heritageHref(page.hero.primaryCta.href)} primary>{page.hero.primaryCta.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.hero.secondaryCta.href)}>{page.hero.secondaryCta.label}</HeritageLink>
      </div>
      <HeritageChapters items={[{ href: "#website-cases", label: "品牌網站展示案例" }, { href: "#website-samples", label: "第三方模板範例" }, { href: "#portfolio-projects", label: "技術展示規劃" }]} />
    </HeritageHero>
    <HeritageSection id="portfolio-introduction" title={page.introduction.title} description={page.introduction.description} eyebrow="ABOUT THE PORTFOLIO">
      <p className="htg-reading">先瀏覽品牌展示、提案與自家服務推廣，了解各案的設計與實作範圍。第三方模板與技術展示規劃預設收合，可依需要展開閱讀。</p>
    </HeritageSection>
    <HeritageSection id="website-cases" title="品牌網站展示案例" eyebrow="BRAND WEBSITE SHOWCASES" description="從餐飲、送禮到網站服務與工業製造，探索品牌資訊的不同呈現方式。各項標示品牌展示、品牌提案或自家服務推廣性質，可先閱讀作品介紹，再前往展示網站。" variant="surface">
      <div className="htg-stack">{brands.map((showcase, index) => <HeritageWebsiteEntry key={showcase.id} showcase={showcase} number={index + 1} />)}</div>
    </HeritageSection>
    <HeritageSection id="website-samples" title="網站模板範例" eyebrow="WEBSITE TEMPLATE SAMPLES" description="參考工作室、簡潔形象、產品 App 與餐廳的頁面安排。這些範例採用第三方模板，各卡片均標示原始來源；素材待整理的項目暫停外連。">
      <ul className="htg-status-line" aria-label="模板可用狀態">{templates.map((showcase) => <li key={showcase.id}>{showcase.title}：{portfolio.stateLabels[showcase.availability ?? "available"]}</li>)}</ul>
      <details className="htg-disclosure">
        <summary className="htg-disclosure-summary">查看 {templates.length} 個第三方模板範例</summary>
        <div className="htg-stack">{templates.map((showcase) => <HeritageWebsiteEntry key={showcase.id} showcase={showcase} />)}</div>
      </details>
    </HeritageSection>
    <HeritageSection id="portfolio-projects" title={page.projects.title} description={page.projects.description} eyebrow="PROJECT PLANS" variant="surface">
      <ul className="htg-status-line" aria-label="技術專案進度">{portfolio.projects.map((project) => <li key={project.slug}>
        <span lang="en">{project.title}</span>：{page.statusLabels[project.status]}</li>)}</ul>
      <details className="htg-disclosure">
        <summary className="htg-disclosure-summary">查看 {portfolio.projects.length} 個技術展示規劃（Planned）</summary>
        <div className="htg-three-column">{portfolio.projects.map((project) => <HeritageProjectEntry key={project.slug} project={project} />)}</div>
      </details>
    </HeritageSection>
    <HeritageSection id="portfolio-technology" title={page.technology.title} description={page.technology.description} eyebrow="TECHNOLOGY DIRECTIONS">
      <div className="htg-three-column">{portfolio.projects.map((project) => <article key={project.slug} className="htg-editorial-card">
        <h3 lang="en">{project.category}</h3>
        <p lang="en">{project.title}</p>
        <dl className="htg-definition-list">
          <div>
            <dt>規劃中技術</dt>
            <dd>
              <HeritageList items={project.plannedTechnologies} />
            </dd>
          </div>
          <div>
            <dt>已實作技術</dt>
            <dd>{project.implementedTechnologies.length ? <HeritageList items={project.implementedTechnologies} /> : page.detail.emptyImplementation}</dd>
          </div>{project.futureTechnologies.length > 0 && <div>
            <dt>{page.detail.futureLabel}</dt>
            <dd>
              <HeritageList items={project.futureTechnologies} />
            </dd>
          </div>}</dl>
      </article>)}</div>
    </HeritageSection>
    <HeritageSection id="portfolio-transparency" title={page.transparency.title} description={page.transparency.description} eyebrow="STATUS AND EVIDENCE" variant="surface">
      <div className="htg-three-column">{page.transparency.principles.map((principle) => <article key={principle.title} className="htg-editorial-card">
        <h3>{principle.title}</h3>
        <p>{principle.description}</p>
      </article>)}</div>
    </HeritageSection>
    <HeritageSection id="portfolio-next-step" title={page.cta.title} description={page.cta.description}>
      <div className="htg-actions">
        <HeritageLink href={heritageHref(page.cta.primaryCta.href)} primary>{page.cta.primaryCta.label}</HeritageLink>
        <HeritageLink href={heritageHref(page.cta.secondaryCta.href)}>{page.cta.secondaryCta.label}</HeritageLink>
        <HeritageInquiry />
      </div>
    </HeritageSection>
  </div>;
}
