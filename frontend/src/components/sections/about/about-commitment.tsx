import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { aboutCommitments } from "@/config/about";

export function AboutCommitment() {
  return (
    <Section id="commitment" background="surface" aria-labelledby="commitment-title" className="scroll-mt-8 border-y">
      <Container>
        <SectionHeading
          id="commitment-title"
          eyebrow="OUR COMMITMENT"
          title="我們重視的不只是交付，更是長期價值。"
          titleLang="zh-TW"
          description="以清楚的服務理念，思考每一次技術選擇與合作。"
        />
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {aboutCommitments.map(({ name, title, description, Icon }) => (
            <li key={name} className="flex min-w-0 items-start gap-4 border-t pt-6 sm:gap-6">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-md bg-background text-secondary"><Icon className="size-5" /></span>
              <div className="min-w-0 space-y-3">
                <h3 className="type-h3 text-primary">{title}</h3>
                <p lang="en" className="type-caption break-words text-muted-foreground">{name}</p>
                <p className="type-body text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
