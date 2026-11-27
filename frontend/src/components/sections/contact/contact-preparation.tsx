import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contactPage, contactServiceLinks } from "@/config/contact-page";

export function ContactPreparation() {
  const { preparation } = contactPage;

  return (
    <Section id="contact-preparation" background="surface" aria-labelledby="contact-preparation-title" className="scroll-mt-8 border-y">
      <Container>
        <SectionHeading id="contact-preparation-title" eyebrow="PREPARE YOUR REQUIREMENTS" titleLang="zh-TW" title={preparation.title} description={preparation.description} />
        <ol className="grid min-w-0 gap-6 lg:grid-cols-3">
          {preparation.items.map((item, index) => (
            <li key={item.title} className="min-w-0">
              <Card className="h-full">
                <CardHeader>
                  <span aria-hidden="true" className="type-caption font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</span>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="type-body">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
        <nav aria-label={preparation.servicesLabel} className="mt-8 min-w-0 border-t pt-6">
          <h3 className="type-body mb-3 font-semibold text-primary">{preparation.servicesLabel}</h3>
          <ul className="flex min-w-0 flex-wrap gap-x-6 gap-y-2">
            {contactServiceLinks.map((service) => (
              <li key={service.id} className="min-w-0">
                <Link
                  href={service.href}
                  className="type-body-sm inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline"
                >
                  <span className="min-w-0 break-words">{service.label}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
