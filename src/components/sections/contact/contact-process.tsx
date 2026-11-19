import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { contactPage } from "@/config/contact-page";

export function ContactProcess() {
  const { process } = contactPage;

  return (
    <Section id="contact-process" aria-labelledby="contact-process-title">
      <Container>
        <SectionHeading id="contact-process-title" eyebrow="DISCUSSING THE NEXT STEP" titleLang="zh-TW" title={process.title} description={process.description} />
        <ol className="grid min-w-0 gap-8 lg:grid-cols-3 lg:gap-10">
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative min-w-0 border-l pl-6 lg:border-t lg:border-l-0 lg:pt-7 lg:pl-0">
              <span aria-hidden="true" className="absolute top-0 -left-1 size-2 rounded-full bg-secondary lg:-top-1 lg:left-0" />
              <p aria-hidden="true" className="type-caption mb-3 font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="type-h3 text-primary">{step.title}</h3>
              <p className="type-body mt-4 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
