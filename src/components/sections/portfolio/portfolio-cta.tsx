import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { portfolioPage } from "@/config/portfolio";

export function PortfolioCta() {
  const { cta } = portfolioPage;

  return (
    <Section id="portfolio-next-step" aria-labelledby="portfolio-cta-title" className="relative overflow-hidden">
      <BrandPattern variant="gradient" />
      <Container className="relative grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="min-w-0">
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">EXPLORE THE NEXT STEP</p>
          <h2 id="portfolio-cta-title" className="type-h2 text-primary">{cta.title}</h2>
          <p className="type-body-lg mt-5 max-w-2xl text-foreground">{cta.description}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <Button asChild size="lg"><Link href={cta.primaryCta.href}>{cta.primaryCta.label}<ArrowUpRight aria-hidden="true" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href={cta.secondaryCta.href}>{cta.secondaryCta.label}<ArrowUpRight aria-hidden="true" /></Link></Button>
        </div>
      </Container>
    </Section>
  );
}
