import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectTechnologyTags } from "@/components/sections/portfolio/project-labels";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPage, portfolioProjects } from "@/config/portfolio";

export function PortfolioTechnology() {
  return (
    <Section id="portfolio-technology" aria-labelledby="portfolio-technology-title">
      <Container>
        <SectionHeading id="portfolio-technology-title" eyebrow="TECHNOLOGY DIRECTIONS" titleLang="zh-TW" {...portfolioPage.technology} />
        <div className="grid gap-6 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <Card key={project.slug}>
              <CardHeader>
                <CardTitle lang="en" className="break-words">{project.category}</CardTitle>
                <p lang="en" className="type-body-sm break-words text-muted-foreground">{project.title}</p>
              </CardHeader>
              <CardContent>
                <dl className="space-y-6">
                  <div>
                    <dt className="type-body mb-3 font-semibold text-primary">規劃中技術</dt>
                    <dd><ProjectTechnologyTags technologies={project.plannedTechnologies} label={`${project.title}規劃中技術`} /></dd>
                  </div>
                  <div>
                    <dt className="type-body mb-3 font-semibold text-primary">已實作技術</dt>
                    <dd>
                      {project.implementedTechnologies.length > 0 ? (
                        <ProjectTechnologyTags technologies={project.implementedTechnologies} label={`${project.title}已實作技術`} />
                      ) : <p className="type-body-sm text-muted-foreground">{portfolioPage.detail.emptyImplementation}</p>}
                    </dd>
                  </div>
                  {project.futureTechnologies.length > 0 && (
                    <div>
                      <dt className="type-body mb-3 font-semibold text-primary">{portfolioPage.detail.futureLabel}</dt>
                      <dd><ProjectTechnologyTags technologies={project.futureTechnologies} label={`${project.title}後續技術方向`} /></dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
