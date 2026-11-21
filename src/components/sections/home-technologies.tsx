import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { technologyGroups } from "@/config/homepage";

export function HomeTechnologies() {
  return (
    <Section
      id="technologies"
      aria-labelledby="technologies-title"
      className="scroll-mt-8"
    >
      <Container>
        <SectionHeading
          id="technologies-title"
          eyebrow="TECHNOLOGY / CONNECTED CAPABILITIES"
          title="Technology Capabilities"
          description="以合適的技術與架構，實作企業所需的服務。"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map(({ name, description, items }, index) => (
            <article key={name} aria-labelledby={`technology-group-${index + 1}`} className="flex min-w-0 flex-col gap-6 rounded-lg border bg-card p-6 shadow-subtle">
              <div className="min-w-0 space-y-3">
                <h3 id={`technology-group-${index + 1}`} lang="en" className="type-h3 break-words text-primary">{name}</h3>
                <p className="type-body-sm max-w-md text-muted-foreground">{description}</p>
              </div>
              <ul lang="en" aria-label={name} className="mt-auto flex min-w-0 flex-wrap content-start items-start gap-2">
                {items.map((item) => (
                  <li key={item} className="type-body-sm min-w-0 break-words rounded-full border bg-surface px-3 py-2 text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="type-body-sm mt-6 max-w-3xl text-muted-foreground">
          XK 依照不同專案需求，選擇適合的技術與架構，提供具備擴充性及可維護性的數位解決方案。
        </p>
      </Container>
    </Section>
  );
}
