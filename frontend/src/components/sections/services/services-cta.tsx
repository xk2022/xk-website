import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { servicesPage } from "@/config/services";

export function ServicesCta() {
  const { cta } = servicesPage;

  return (
    <Section id="services-next-step" background="surface" aria-labelledby="services-next-step-title">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="max-w-2xl">
          <h2 id="services-next-step-title" className="type-h2 text-primary">{cta.title}</h2>
          <p className="type-body-lg mt-5 text-muted-foreground">{cta.description}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <Button asChild size="lg"><Link href={cta.primary.href}>{cta.primary.label}<ArrowUpRight aria-hidden="true" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href={cta.secondary.href}>{cta.secondary.label}<ArrowRight aria-hidden="true" /></Link></Button>
          <Link href={cta.home.href} className="type-body-sm inline-flex min-h-11 items-center justify-center rounded-sm px-3 text-secondary hover:underline">{cta.home.label}</Link>
        </div>
      </Container>
    </Section>
  );
}
