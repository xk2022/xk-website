import { Plus } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { serviceSolutionExamples, servicesPage } from "@/config/services";

export function ServicesIntegration() {
  const { title, description, exampleLabel } = servicesPage.integration;

  return (
    <Section
      id="service-combinations"
      background="surface"
      aria-labelledby="service-combinations-title"
      className="scroll-mt-8 border-b"
    >
      <Container>
        <SectionHeading
          id="service-combinations-title"
          eyebrow="SERVICE INTEGRATION"
          title={title}
          titleLang="zh-TW"
          description={description}
        />
        <p className="type-body-sm mb-6 font-semibold text-secondary">{exampleLabel}</p>
        <ol className="divide-y border-y">
          {serviceSolutionExamples.map(({ title: exampleTitle, services, description: exampleDescription }, index) => (
            <li key={exampleTitle} className="grid min-w-0 gap-5 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-10">
              <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                <span aria-hidden="true" className="type-caption shrink-0 pt-1 font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="type-h3 min-w-0 text-primary">{exampleTitle}</h3>
              </div>
              <div className="min-w-0 space-y-4">
                <ul lang="en" aria-label={`${exampleTitle}服務組合`} className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                  {services.map((service, serviceIndex) => (
                    <li key={service} className="type-body-sm flex min-w-0 items-center gap-3 font-medium text-secondary">
                      {serviceIndex > 0 && <Plus aria-hidden="true" className="size-4 shrink-0" />}
                      <span className="min-w-0 break-words">{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="type-body text-muted-foreground">{exampleDescription}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
