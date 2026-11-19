import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/sections/portfolio/project-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { portfolioPage, portfolioProjects } from "@/config/portfolio";

export function PortfolioProjects() {
  return (
    <Section id="portfolio-projects" background="surface" aria-labelledby="portfolio-projects-title" className="scroll-mt-8 border-y">
      <Container>
        <SectionHeading id="portfolio-projects-title" eyebrow="PROJECT PLANS" titleLang="zh-TW" {...portfolioPage.projects} />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </Container>
    </Section>
  );
}
