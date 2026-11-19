import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectTypeLabel } from "@/components/sections/portfolio/project-labels";
import { SectionHeading } from "@/components/sections/section-heading";
import { portfolioPage } from "@/config/portfolio";

export function PortfolioIntroduction() {
  return (
    <Section id="portfolio-introduction" aria-labelledby="portfolio-introduction-title">
      <Container>
        <SectionHeading id="portfolio-introduction-title" eyebrow="ABOUT THE PORTFOLIO" titleLang="zh-TW" {...portfolioPage.introduction} />
        <div className="border-l-2 border-secondary pl-5"><ProjectTypeLabel /></div>
      </Container>
    </Section>
  );
}
