import { ArrowDown } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HomeIntro() {
  return (
    <>
      <Section
        background="surface"
        aria-labelledby="home-title"
        className="relative overflow-hidden"
      >
        <Container className="relative z-10">
          <p lang="en" className="type-body-sm mb-6 font-semibold tracking-widest text-secondary">
            {siteConfig.name}
          </p>
          <h1
            id="home-title"
            lang="en"
            className="type-display max-w-3xl text-primary"
          >
            {siteConfig.slogan}
          </h1>
          <p lang="en" className="type-body-lg mt-8 max-w-xl font-medium text-foreground">
            {siteConfig.tagline}
          </p>
          <p className="type-body mt-4 max-w-xl text-muted-foreground">
            整合 Web、Java 與 AI 技術，探索企業的數位可能。
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="#brand">
              認識 XK
              <ArrowDown aria-hidden="true" />
            </a>
          </Button>
        </Container>
        <BrandPattern variant="shapes" className="hidden xl:block" />
      </Section>
      <Section id="brand" aria-labelledby="brand-title" className="scroll-mt-8">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 id="brand-title" className="type-h2 text-primary">
            技術，連結更多可能。
          </h2>
          <div className="type-body max-w-2xl space-y-5">
            <p>{siteConfig.description}</p>
            <p className="text-muted-foreground">
              官方網站正在建置中，服務介紹與聯絡資訊將於後續階段公開。
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
