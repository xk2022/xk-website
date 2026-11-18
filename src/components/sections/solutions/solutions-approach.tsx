import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { serviceProcessSteps } from "@/config/services";
import { solutionsPage } from "@/config/solutions";

export function SolutionsApproach() {
  return (
    <Section
      id="implementation-approach"
      background="surface"
      aria-labelledby="implementation-approach-title"
      className="scroll-mt-8 border-y"
    >
      <Container>
        <SectionHeading
          id="implementation-approach-title"
          eyebrow="OUR APPROACH"
          titleLang="zh-TW"
          {...solutionsPage.approach}
        />
        <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
          {serviceProcessSteps.map((step, index) => (
            <li key={step.name} className="relative min-w-0 border-l pl-6 lg:border-t lg:border-l-0 lg:pt-7 lg:pl-0">
              <span aria-hidden="true" className="absolute top-0 -left-1 size-2 rounded-full bg-secondary lg:-top-1 lg:left-0" />
              <span aria-hidden="true" className="type-caption font-semibold text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p lang="en" className="type-body-sm mt-3 break-words font-medium text-secondary">{step.name}</p>
              <h3 className="type-h3 mt-3 text-primary">{step.title}</h3>
              <p className="type-body-sm mt-4 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
