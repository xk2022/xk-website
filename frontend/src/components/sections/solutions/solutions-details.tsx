import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolutionDetail } from "@/components/sections/solutions/solution-detail";
import { solutionDefinitions, solutionsPage } from "@/config/solutions";

export function SolutionsDetails() {
  return (
    <Section id="solution-details" aria-labelledby="solution-details-title" className="scroll-mt-8">
      <Container>
        <SectionHeading
          id="solution-details-title"
          eyebrow="FROM NEEDS TO DIRECTION"
          titleLang="zh-TW"
          {...solutionsPage.details}
        />
        {solutionDefinitions.map((solution, index) => (
          <SolutionDetail key={solution.id} solution={solution} number={index + 1} />
        ))}
      </Container>
    </Section>
  );
}
