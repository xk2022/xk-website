import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HomeHero() {
  return (
    <Section aria-labelledby="home-title" background="surface" className="relative overflow-hidden">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <p lang="en" className="type-body-sm mb-6 font-semibold text-secondary">
            {siteConfig.slogan}
          </p>
          <h1 id="home-title" className="type-h1 max-w-3xl text-primary">
            整合 Web、Java 與 AI 技術，打造企業數位價值。
          </h1>
          <p lang="en" className="type-body-lg mt-6 max-w-xl font-medium text-primary">
            {siteConfig.tagline}
          </p>
          <p className="type-body mt-5 max-w-xl text-muted-foreground">
            Xplore Kaleidoscope 協助企業整合網站開發、企業系統、系統架構與 AI 應用，
            將技術轉化為實際商業價值。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/#services">探索我們的服務 <ArrowDown aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">聯絡我們 <ArrowUpRight aria-hidden="true" /></Link>
            </Button>
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
