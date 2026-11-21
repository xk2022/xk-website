import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectStatusLabel } from "@/components/sections/portfolio/project-labels";
import { portfolioProjects } from "@/config/portfolio";
import { solutionShowcases } from "@/config/solution-showcases";
import type { SolutionId } from "@/config/solutions";

export function SolutionShowcase({ solutionId }: { solutionId: SolutionId }) {
  const reference = solutionShowcases[solutionId];
  const project = portfolioProjects.find(({ slug }) => slug === reference.slug);

  if (!project) throw new Error(`Missing related demonstration plan: ${reference.slug}`);

  return (
    <div className="border-t pt-6">
      <h4 className="type-body font-semibold text-primary">相關展示規劃</h4>
      <p className="type-body-sm mt-3 text-muted-foreground">{reference.note}</p>
      <div className="mt-3 flex min-w-0 flex-col items-start gap-3">
        <ProjectStatusLabel status={project.status} />
        <Link
          href={`/portfolio/${project.slug}`}
          className="type-body-sm inline-flex min-h-11 min-w-0 items-center gap-2 rounded-sm font-medium text-secondary hover:underline"
        >
          <span lang="en" className="min-w-0 break-words">{project.title}</span>
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
