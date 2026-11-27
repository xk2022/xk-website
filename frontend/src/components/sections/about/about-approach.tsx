import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { aboutApproach } from "@/config/about";

export function AboutApproach() {
  return (
    <Section id="approach" aria-labelledby="approach-title" className="scroll-mt-8">
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow="OUR APPROACH"
          title="我們的工作方式"
          titleLang="zh-TW"
          description="先理解問題，再選擇技術；以清楚的階段，讓規劃、實作與交付保持連貫。"
        />
        <ol className="grid gap-0 lg:grid-cols-5">
          {aboutApproach.map(({ name, title, description }, index) => (
            <li key={name} className="relative min-w-0 border-l pb-8 pl-8 last:pb-0 lg:border-t lg:border-l-0 lg:pt-8 lg:pr-6 lg:pb-0 lg:pl-0">
              <span aria-hidden="true" className="absolute top-0 -left-1 size-2 rounded-full bg-secondary lg:-top-1 lg:left-0" />
              <p aria-hidden="true" className="type-caption mb-3 font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</p>
              <p lang="en" className="type-body-sm mb-3 break-words font-medium text-secondary">{name}</p>
              <h3 className="type-h3 mb-4 text-primary">{title}</h3>
              <p className="type-body-sm max-w-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
