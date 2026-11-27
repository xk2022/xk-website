import { ArrowUpRight } from "lucide-react";

import { ProjectEmptyMedia, ProjectStatusLabel, ProjectTechnologyTags, ProjectTypeLabel } from "@/components/sections/portfolio/project-labels";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPage, type PortfolioProject } from "@/config/portfolio";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Card variant="interactive" href={`/portfolio/${project.slug}`}>
      <CardHeader>
        <p lang="en" className="type-caption break-words font-semibold text-secondary">{project.category}</p>
        <CardTitle lang="en" className="break-words">{project.title}</CardTitle>
        <ProjectTypeLabel />
        <div><ProjectStatusLabel status={project.status} /></div>
        <CardDescription className="type-body">{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProjectEmptyMedia />
        <div>
          <p className="type-body mb-3 font-semibold text-primary">規劃中技術</p>
          <ProjectTechnologyTags technologies={project.plannedTechnologies} label={`${project.title}規劃中技術`} />
        </div>
        <div>
          <p className="type-body mb-2 font-semibold text-primary">已實作技術</p>
          {project.implementedTechnologies.length > 0 ? (
            <ProjectTechnologyTags technologies={project.implementedTechnologies} label={`${project.title}已實作技術`} />
          ) : (
            <p className="type-body-sm text-muted-foreground">{portfolioPage.detail.emptyImplementation}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="type-body-sm border-t pt-5 font-medium text-secondary">
        查看自製展示規劃<ArrowUpRight aria-hidden="true" className="size-4" />
      </CardFooter>
    </Card>
  );
}
