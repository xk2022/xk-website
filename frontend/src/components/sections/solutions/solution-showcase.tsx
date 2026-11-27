import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectStatusLabel } from "@/components/sections/portfolio/project-labels";
import { portfolioProjects } from "@/config/portfolio";
import { solutionShowcases } from "@/config/solution-showcases";
import type { SolutionId } from "@/config/solutions";
import { featuredWebsiteShowcases } from "@/config/website-showcases";

export function SolutionShowcase({ solutionId }: { solutionId: SolutionId }) {
  const reference = solutionShowcases[solutionId];
  const project = portfolioProjects.find(({ slug }) => slug === reference.slug);

  if (!project) throw new Error(`Missing related demonstration plan: ${reference.slug}`);

  return (
    <div className="border-t pt-6">
      {solutionId === "digital-presence" ? (
        <div className="mb-6 border-b pb-6">
          <h4 className="type-body font-semibold text-primary">品牌網站展示</h4>
          <p className="type-body-sm mt-3 text-muted-foreground">
            從{featuredWebsiteShowcases.map(({ title }) => title).join("、")}的品牌展示，了解品牌故事、商品資訊與企業介紹的網站呈現；網站範例則提供不同主題的版面參考。
          </p>
          <div className="mt-3 flex min-w-0 flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/portfolio#website-cases"
              className="type-body-sm inline-flex min-h-11 min-w-0 items-center gap-2 rounded-sm font-medium text-secondary hover:underline"
            >
              查看展示案例 <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
            </Link>
            <Link
              href="/portfolio#website-samples"
              className="type-body-sm inline-flex min-h-11 min-w-0 items-center gap-2 rounded-sm font-medium text-secondary hover:underline"
            >
              瀏覽網站範例 <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
            </Link>
          </div>
        </div>
      ) : null}
      <h4 className="type-body font-semibold text-primary">{solutionId === "digital-presence" ? "延伸技術規劃" : "相關展示規劃"}</h4>
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
