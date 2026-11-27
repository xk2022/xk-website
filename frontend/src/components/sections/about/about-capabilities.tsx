import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { aboutCapabilities } from "@/config/about";

export function AboutCapabilities() {
  return (
    <Section id="capabilities" background="surface" aria-labelledby="capabilities-title" className="scroll-mt-8 border-y">
      <Container>
        <SectionHeading
          id="capabilities-title"
          eyebrow="CORE CAPABILITIES"
          title="核心技術能力"
          titleLang="zh-TW"
          description="從網站到企業系統，從系統整合到 AI 應用，連結不同需求所需的技術能力。"
        />
        <ol className="divide-y border-y">
          {aboutCapabilities.map(({ id, name, title, items }) => (
            <li key={id} className="grid min-w-0 gap-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
              <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                <span aria-hidden="true" className="type-caption shrink-0 pt-1 font-semibold text-secondary">{id}</span>
                <div className="min-w-0 space-y-3">
                  <h3 className="type-h3 text-primary">{title}</h3>
                  <p lang="en" className="type-body-sm break-words text-muted-foreground">{name}</p>
                </div>
              </div>
              <ul lang="en" aria-label={name} className="flex min-w-0 flex-wrap content-start gap-2 md:self-center">
                {items.map((item) => (
                  <li key={item} className="type-body-sm min-w-0 break-words rounded-full border bg-background px-4 py-2 text-foreground">{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="type-body-sm mt-6 max-w-3xl text-muted-foreground">
          以上為 XK 可提供的技術服務能力，不代表每項技術都已部署於目前官網。
        </p>
      </Container>
    </Section>
  );
}
