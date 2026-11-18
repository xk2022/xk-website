import { ArrowDown } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HomeIntro() {
  return (
    <>
      <section
        aria-labelledby="home-title"
        className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36"
      >
        <Container className="relative z-10">
          <p lang="en" className="mb-6 text-sm font-semibold tracking-widest text-secondary">
            {siteConfig.name}
          </p>
          <h1
            id="home-title"
            lang="en"
            className="max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight text-balance text-primary sm:text-5xl lg:text-[4rem]"
          >
            {siteConfig.slogan}
          </h1>
          <p lang="en" className="mt-8 max-w-xl text-lg font-medium text-foreground">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            整合 Web、Java 與 AI 技術，探索企業的數位可能。
          </p>
          <Button asChild size="lg" className="mt-8 min-h-11">
            <a href="#brand">
              認識 XK
              <ArrowDown aria-hidden="true" />
            </a>
          </Button>
        </Container>
        {/* Decorative geometry, not a brand logo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-20 -right-28 hidden size-96 rotate-45 grid-cols-2 gap-4 opacity-10 xl:grid"
        >
          <div className="border-2 border-secondary" />
          <div className="bg-accent" />
          <div className="bg-secondary" />
          <div className="border-2 border-accent" />
        </div>
      </section>
      <section id="brand" aria-labelledby="brand-title" className="scroll-mt-8 py-16 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 id="brand-title" className="text-2xl font-semibold text-primary sm:text-3xl">
            技術，連結更多可能。
          </h2>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed">
            <p>{siteConfig.description}</p>
            <p className="text-muted-foreground">
              官方網站正在建置中，服務介紹與聯絡資訊將於後續階段公開。
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
