import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { solutionDefinitions, solutionsPage } from "@/config/solutions";

export function SolutionsOverview() {
  return (
    <Section
      id="solutions-overview"
      background="surface"
      aria-labelledby="solutions-overview-title"
      className="scroll-mt-8 border-y"
    >
      <Container>
        <SectionHeading
          id="solutions-overview-title"
          eyebrow="SOLUTION DIRECTIONS"
          titleLang="zh-TW"
          {...solutionsPage.overview}
        />
        <p className="type-body-sm mb-6 font-medium text-secondary">{solutionsPage.directionLabel}</p>
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {solutionDefinitions.map((solution, index) => (
            <Card key={solution.id} variant="interactive" href={`#${solution.anchor}`}>
              <CardHeader>
                <span aria-hidden="true" className="type-caption font-semibold text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p lang="en" className="type-body-sm break-words text-secondary">{solution.englishTitle}</p>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription className="type-body">{solution.summary}</CardDescription>
              </CardHeader>
              <CardFooter className="type-body-sm border-t pt-5 font-medium text-secondary">
                查看規劃方向<ArrowDownRight aria-hidden="true" className="size-4" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
