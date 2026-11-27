import { Container } from "@/components/layout/container";
import { Section, type SectionProps } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ServiceCategory } from "@/config/services";

type ServiceDetailProps = {
  service: ServiceCategory;
  background?: Exclude<SectionProps["background"], "primary">;
};

/** One presentation for the five service categories; editorial data stays in config. */
export function ServiceDetail({ service, background = "default" }: ServiceDetailProps) {
  const { id, number, title, englishTitle, summary, description, items, technologies, scenario, Icon } = service;

  return (
    <Section
      id={id}
      background={background}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-8 border-b"
    >
      <Container className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-4">
            <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-md border bg-background text-secondary">
              <Icon className="size-6" />
            </span>
            <p lang="en" className="type-caption font-semibold text-secondary">SERVICE {number}</p>
          </div>
          <p lang="en" className="type-body-sm mb-3 break-words font-medium text-secondary">{englishTitle}</p>
          <h2 id={`${id}-title`} className="type-h2 break-words text-primary">{title}</h2>
          <p className="type-body-lg mt-5 text-foreground">{summary}</p>
          <p className="type-body mt-4 text-muted-foreground">{description}</p>
          <div className="mt-8 border-l-2 border-secondary pl-5">
            <h3 className="type-body mb-2 font-semibold text-primary">適用情境</h3>
            <p className="type-body-sm text-muted-foreground">{scenario}</p>
          </div>
        </div>

        <div className="min-w-0 space-y-8">
          <div className="border-t pt-6">
            <h3 className="type-h3 mb-6 text-primary">服務內容</h3>
            <ul className="grid min-w-0 gap-x-6 gap-y-4 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="type-body flex min-w-0 items-start gap-3 text-foreground">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card>
            <CardHeader><CardTitle>技術範圍</CardTitle></CardHeader>
            <CardContent>
              <ul lang="en" aria-label={`${englishTitle} technologies`} className="flex min-w-0 flex-wrap gap-2">
                {technologies.map(({ name }) => (
                  <li key={name} className="type-body-sm min-w-0 break-words rounded-full border bg-surface px-4 py-2 text-foreground">{name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
