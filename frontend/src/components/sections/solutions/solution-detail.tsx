import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SolutionServiceLinks } from "@/components/sections/solutions/solution-service-links";
import { SolutionShowcase } from "@/components/sections/solutions/solution-showcase";
import { Button } from "@/components/ui/button";
import { solutionsPage, type SolutionDefinition } from "@/config/solutions";

export function SolutionDetail({
  solution,
  number,
}: {
  solution: SolutionDefinition;
  number: number;
}) {
  return (
    <article id={solution.anchor} aria-labelledby={`${solution.anchor}-title`} className="scroll-mt-8 border-t py-10 first:pt-8 last:pb-0 sm:py-12">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="min-w-0">
          <p aria-hidden="true" className="type-caption mb-4 font-semibold text-secondary">
            {String(number).padStart(2, "0")}
          </p>
          <p lang="en" className="type-body-sm mb-3 break-words font-medium text-secondary">
            {solution.englishTitle}
          </p>
          <h3 id={`${solution.anchor}-title`} className="type-h3 break-words text-primary">{solution.title}</h3>
          <p className="type-body-sm mt-4 text-secondary">{solutionsPage.directionLabel}</p>
          <div className="mt-6 border-l-2 border-secondary pl-5">
            <h4 className="type-body font-semibold text-primary">適用情境</h4>
            <p className="type-body mt-3 text-muted-foreground">{solution.audience}</p>
          </div>
          <div className="mt-8">
            <h4 className="type-body font-semibold text-primary">需要理解的問題</h4>
            <ul className="type-body mt-3 space-y-3 text-muted-foreground">
              {solution.challenges.map((challenge) => (
                <li key={challenge} className="flex min-w-0 items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span className="min-w-0 break-words">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h4 className="type-body font-semibold text-primary">方案定位</h4>
            <p className="type-body-lg mt-3 text-foreground">{solution.positioning}</p>
          </div>
        </div>
        <div className="min-w-0 space-y-8">
          <div className="rounded-lg border bg-surface p-5 sm:p-6">
            <h4 className="type-body font-semibold text-primary">涉及能力與技術</h4>
            <ul aria-label={`${solution.title}技術範圍`} className="mt-4 flex min-w-0 flex-wrap gap-2">
              {solution.technologies.map(({ name }) => (
                <li key={name} className="type-body-sm min-w-0 break-words rounded-full border bg-background px-3 py-2 text-foreground">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="type-body font-semibold text-primary">實施方向</h4>
            <ol className="mt-4 space-y-5">
              {solution.implementationSteps.map((step, index) => (
                <li key={step.title} className="flex min-w-0 items-start gap-4">
                  <span aria-hidden="true" className="type-caption flex size-7 shrink-0 items-center justify-center rounded-full border text-secondary">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="type-body font-medium text-primary">{step.title}</p>
                    <p className="type-body-sm mt-2 text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="type-body font-semibold text-primary">可規劃的交付</h4>
            <p className="type-body-sm mt-3 text-muted-foreground">實際內容依需求、可用資料與約定範圍確認。</p>
            <ul className="type-body mt-3 space-y-3 text-muted-foreground">
              {solution.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex min-w-0 items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span className="min-w-0 break-words">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="type-body font-semibold text-primary">希望改善的面向</h4>
            <ul className="type-body mt-3 space-y-3 text-muted-foreground">
              {solution.improvementGoals.map((goal) => (
                <li key={goal} className="flex min-w-0 items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span className="min-w-0 break-words">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-6">
            <h4 className="type-body mb-2 font-semibold text-primary">相關技術服務</h4>
            <SolutionServiceLinks serviceIds={solution.serviceIds} label={`${solution.title}相關服務`} />
          </div>
          <SolutionShowcase solutionId={solution.id} />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild variant="outline">
          <Link href={solution.cta.href} aria-label={`${solution.title}：${solution.cta.label}`}>
            {solution.cta.label}<ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
