import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { servicesPage } from "@/config/services";
import { siteConfig } from "@/config/site";

export function ServicesHero() {
  const { hero } = servicesPage;

  return (
    <Section aria-labelledby="services-page-title" background="surface" className="relative overflow-hidden">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div className="min-w-0">
          <nav aria-label="麵包屑導覽" className="type-body-sm mb-8 flex items-center gap-3 text-muted-foreground">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">首頁</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">服務項目</span>
          </nav>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">{hero.englishTitle}</p>
          <h1 id="services-page-title" className="type-h1 text-primary">
            {hero.titleLines.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="type-body-lg mt-6 max-w-2xl text-muted-foreground">{hero.description}</p>
          <p lang="en" className="type-body-sm mt-6 text-secondary">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}<ArrowDown aria-hidden="true" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}<ArrowUpRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </div>
        <figure className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border bg-background p-8 shadow-subtle sm:aspect-square">
          <BrandPattern variant="kaleidoscope" />
          <XkLogo size={192} showWordmark={false} className="relative" />
          <figcaption className="relative text-center">
            <p lang="en" className="type-h3 mt-5 text-primary">Web · Java · AI</p>
            <p lang="en" className="type-body-sm mt-4 max-w-64 text-muted-foreground">{siteConfig.slogan}</p>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
