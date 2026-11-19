import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { portfolioPage } from "@/config/portfolio";

export function PortfolioTransparency() {
  return (
    <Section id="portfolio-transparency" background="surface" aria-labelledby="portfolio-transparency-title" className="border-y">
      <Container>
        <SectionHeading
          id="portfolio-transparency-title"
          eyebrow="STATUS AND EVIDENCE"
          titleLang="zh-TW"
          title={portfolioPage.transparency.title}
          description={portfolioPage.transparency.description}
        />
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {portfolioPage.transparency.principles.map((principle) => (
            <li key={principle.title} className="min-w-0 border-t pt-6">
              <h3 className="type-h3 text-primary">{principle.title}</h3>
              <p className="type-body mt-4 text-muted-foreground">{principle.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
