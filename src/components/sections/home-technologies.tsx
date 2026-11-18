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
          description="整合多元技術，打造完整數位解決方案。"
        />
        <div className="divide-y border-y">
          {technologyGroups.map(({ name, description, items }) => (
            <div key={name} className="grid min-w-0 gap-6 py-8 md:grid-cols-[1fr_1.35fr] md:gap-12">
              <div className="min-w-0 space-y-3">
                <h3 lang="en" className="type-h3 break-words text-primary">{name}</h3>
                <p className="type-body-sm max-w-md text-muted-foreground">{description}</p>
              </div>
              <ul lang="en" aria-label={name} className="flex min-w-0 flex-wrap content-start items-start gap-2 md:self-center">
                {items.map((item) => (
                  <li key={item} className="type-body-sm min-w-0 break-words rounded-full border bg-surface px-4 py-2 text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="type-body-sm mt-6 max-w-3xl text-muted-foreground">
          本區塊呈現 XK 的技術服務能力，並非目前官方網站所使用的完整技術清單。
        </p>
      </Container>
    </Section>
  );
}
