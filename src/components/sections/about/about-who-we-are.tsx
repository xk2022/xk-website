import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { aboutPage } from "@/config/about";

export function AboutWhoWeAre() {
  const { introduction, description, operatingModel, priorities } = aboutPage.whoWeAre;

  return (
    <Section id="who-we-are" aria-labelledby="who-we-are-title" className="scroll-mt-8">
      <Container className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <SectionHeading
          id="who-we-are-title"
          eyebrow="WHO WE ARE"
          title="我們是誰"
          titleLang="zh-TW"
          description={introduction}
          className="mb-0 sm:mb-0"
        />
        <div className="min-w-0 space-y-6">
          <p className="type-body text-muted-foreground">{description}</p>
          <p className="type-body border-l-2 border-secondary pl-5 text-foreground">{operatingModel}</p>
          <div className="border-t pt-6">
            <p className="type-body-sm mb-4 font-semibold text-primary">我們重視</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {priorities.map((priority) => (
                <li key={priority} className="type-body-sm flex items-start gap-3 text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
