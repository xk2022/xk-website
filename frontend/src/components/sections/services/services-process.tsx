import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { serviceProcessSteps, servicesPage } from "@/config/services";

export function ServicesProcess() {
  return (
    <Section id="services-process" aria-labelledby="services-process-title" className="scroll-mt-8">
      <Container>
        <SectionHeading id="services-process-title" eyebrow="OUR PROCESS" titleLang="zh-TW" {...servicesPage.process} />
        <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
          {serviceProcessSteps.map(({ name, title, description }, index) => (
            <li key={name} className="relative min-w-0 border-l pl-6 lg:border-t lg:border-l-0 lg:pt-7 lg:pl-0">
              <span aria-hidden="true" className="absolute top-0 -left-1 size-2 rounded-full bg-secondary lg:-top-1 lg:left-0" />
              <span aria-hidden="true" className="type-caption font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</span>
              <p lang="en" className="type-body-sm mt-3 break-words font-medium text-secondary">{name}</p>
              <h3 className="type-h3 mt-3 text-primary">{title}</h3>
              <p className="type-body-sm mt-4 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
