import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { solutionDefinitions, solutionsPage } from "@/config/solutions";

export function SolutionsChallenges() {
  return (
    <Section id="business-challenges" aria-labelledby="business-challenges-title" className="scroll-mt-8">
      <Container>
        <SectionHeading
          id="business-challenges-title"
          eyebrow="BUSINESS CHALLENGES"
          titleLang="zh-TW"
          {...solutionsPage.challenges}
        />
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {solutionDefinitions.map((solution, index) => (
            <li key={solution.id} className="min-w-0 border-t pt-6">
              <p aria-hidden="true" className="type-caption mb-3 font-semibold text-secondary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="type-h3 break-words text-primary">{solution.challengeTitle}</h3>
              <ul className="type-body mt-4 space-y-2 text-muted-foreground">
                {solution.challenges.map((challenge) => (
                  <li key={challenge} className="flex min-w-0 items-start gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                    <span className="min-w-0 break-words">{challenge}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`#${solution.anchor}`}
                className="type-body-sm mt-4 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline"
              >
                <span className="min-w-0 break-words">{solution.title}</span>
                <ArrowDownRight aria-hidden="true" className="size-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
