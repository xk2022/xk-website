import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { InquiryButton } from "@/components/layout/inquiry-button";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { homepageHero } from "@/config/homepage";
import { inquiryAction } from "@/config/inquiry";
import { siteConfig } from "@/config/site";

export function HomeHero() {
  return (
    <Section aria-labelledby="home-title" background="surface" className="relative overflow-hidden">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <p lang="en" className="type-caption mb-3 font-semibold tracking-widest text-secondary">
            {homepageHero.eyebrow}
          </p>
          <h1 id="home-title" tabIndex={-1} className="type-h1 max-w-3xl text-primary scroll-mt-6">
            {homepageHero.title}
          </h1>
          <p className="type-body mt-5 max-w-xl text-foreground">
            {homepageHero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <InquiryButton descriptionId="home-inquiry-note" className="w-full sm:w-auto" />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/modern#services">探索我們的服務 <ArrowDown aria-hidden="true" /></Link>
            </Button>
          </div>
          <p id="home-inquiry-note" className="type-body-sm mt-4 max-w-xl text-foreground">
            {inquiryAction.description}
          </p>
          <Link href="/portfolio" aria-describedby="home-portfolio-note" className="type-body-sm mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline">
            查看作品展示 <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
          <p id="home-portfolio-note" className="type-caption mt-1 max-w-xl text-foreground">
            {homepageHero.portfolioNote}
          </p>
          <div className="mt-6 border-t pt-6">
            <p lang="en" className="type-body-lg max-w-xl font-medium text-primary">{siteConfig.tagline}</p>
            <p lang="en" className="type-body-sm mt-2 font-semibold text-primary">{siteConfig.slogan}</p>
            <ul aria-label="核心服務方向" className="mt-4 flex min-w-0 flex-wrap gap-2">
              {homepageHero.serviceLabels.map((label) => (
                <li key={label} lang="en" className="type-caption min-w-0 break-words rounded-full border bg-background px-3 py-2 font-medium text-primary">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="relative mx-auto flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated sm:p-8">
          <BrandPattern variant="grid" />
          <BrandPattern variant="gradient" />
          <div className="relative flex items-center justify-between gap-4 border-b border-primary-foreground/20 pb-5">
            <span lang="en" className="type-caption font-semibold tracking-wide">XK / INTEGRATED THINKING</span>
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          </div>
          <div className="relative grid grid-cols-2 items-center gap-4 py-6 sm:py-8" aria-hidden="true">
            <span className="type-body-sm rounded-md border border-primary-foreground/20 px-4 py-3 text-center" lang="en">Web</span>
            <span className="type-body-sm rounded-md border border-primary-foreground/20 px-4 py-3 text-center" lang="en">Java</span>
            <div className="col-span-2 flex justify-center py-2">
              <XkLogo size={200} showWordmark={false} variant="white" decorative />
            </div>
            <span className="type-body-sm rounded-md border border-primary-foreground/20 px-4 py-3 text-center" lang="en">Architecture</span>
            <span className="type-body-sm rounded-md border border-primary-foreground/20 px-4 py-3 text-center" lang="en">AI</span>
          </div>
          <figcaption className="type-body-sm relative border-t border-primary-foreground/20 pt-5 text-primary-foreground/80">
            從數位入口到企業系統，以整合思維連結每個技術環節。
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
