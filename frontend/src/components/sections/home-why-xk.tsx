import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { valuePropositions } from "@/config/homepage";

export function HomeWhyXk() {
  return (
    <Section
      id="why-xk"
      background="surface"
      aria-labelledby="why-xk-title"
      className="scroll-mt-8 border-y"
    >
      <Container>
        <SectionHeading
          id="why-xk-title"
          eyebrow="OUR APPROACH / BUILT FOR VALUE"
          title="Why Xplore Kaleidoscope"
          description="從技術實作到商業價值，提供完整的數位解決方案。"
        />
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {valuePropositions.map(({ title, englishName, description }, index) => (
            <li key={englishName} className="flex min-w-0 gap-4 border-t pt-6 sm:gap-6">
              <span aria-hidden="true" className="type-caption shrink-0 pt-1 font-semibold text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 space-y-3">
                <h3 className="type-h3 text-primary">{title}</h3>
                <p lang="en" className="type-caption break-words text-muted-foreground">{englishName}</p>
                <p className="type-body max-w-lg text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
