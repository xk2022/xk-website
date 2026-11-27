import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ServiceDetail } from "@/components/sections/services/service-detail";
import { Button } from "@/components/ui/button";
import { serviceCategories, servicesPage } from "@/config/services";

export function ServiceWebsite() {
  const { websiteGuide } = servicesPage;

  return (
    <>
      <ServiceDetail service={serviceCategories[0]} />
      <Section background="surface" spacing="compact" className="border-b">
        <Container>
          <aside aria-labelledby="one-page-website-title" className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0 max-w-2xl">
              <h3 id="one-page-website-title" className="type-h3 text-primary">{websiteGuide.title}</h3>
              <p className="type-body mt-3 text-muted-foreground">
                {websiteGuide.description}
              </p>
            </div>
            <div className="flex min-w-0 shrink-0 flex-wrap gap-3">
              <Button asChild>
                <Link href={websiteGuide.samplesLink.href}>{`${websiteGuide.samplesLink.label} `}<ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={websiteGuide.showcasesLink.href}>{`${websiteGuide.showcasesLink.label} `}<ArrowRight aria-hidden="true" /></Link>
              </Button>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
