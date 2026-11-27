import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolutionServiceLinks } from "@/components/sections/solutions/solution-service-links";
import { solutionCombinations, solutionDefinitions, solutionsPage } from "@/config/solutions";

export function SolutionsCombinations() {
  return (
    <Section id="solution-combinations" aria-labelledby="solution-combinations-title" className="scroll-mt-8">
      <Container>
        <SectionHeading
          id="solution-combinations-title"
          eyebrow="COMBINING SERVICES"
          titleLang="zh-TW"
          {...solutionsPage.combinations}
        />
        <ol className="divide-y border-y">
          {solutionCombinations.map((combination, index) => (
            <li key={combination.title} className="grid min-w-0 gap-6 py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
              <div className="min-w-0">
                <p className="type-caption mb-3 font-semibold text-secondary">
                  <span aria-hidden="true" className="mr-3">{String(index + 1).padStart(2, "0")}</span>
                  {combination.label}
                </p>
                <h3 className="type-h3 break-words text-primary">{combination.title}</h3>
                <p className="type-body mt-4 text-muted-foreground">{combination.description}</p>
              </div>
              <div className="min-w-0 space-y-5">
                <div>
                  <p className="type-body mb-2 font-semibold text-primary">相關方案方向</p>
                  <ul className="space-y-1">
                    {solutionDefinitions
                      .filter((solution) => combination.solutionIds.some((id) => id === solution.id))
                      .map((solution) => (
                        <li key={solution.id} className="min-w-0">
                          <Link
                            href={`#${solution.anchor}`}
                            className="type-body-sm inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm text-secondary underline-offset-4 hover:underline"
                          >
                            <span className="min-w-0 break-words">{solution.title}</span>
                            <ArrowDownRight aria-hidden="true" className="size-4 shrink-0" />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="border-t pt-4">
                  <p className="type-body mb-2 font-semibold text-primary">服務組合</p>
                  <SolutionServiceLinks serviceIds={combination.serviceIds} label={`${combination.title}服務組合`} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
