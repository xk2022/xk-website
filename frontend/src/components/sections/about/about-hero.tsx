import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { aboutPage } from "@/config/about";
import { siteConfig } from "@/config/site";

export function AboutHero() {
  return (
    <Section background="surface" aria-labelledby="about-page-title" className="relative overflow-hidden">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <nav aria-label="麵包屑導覽" className="type-body-sm mb-8 flex items-center gap-3 text-foreground">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">首頁</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">關於 XK</span>
          </nav>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">ABOUT XPLORE KALEIDOSCOPE</p>
          <h1 id="about-page-title" className="type-h1 max-w-2xl text-primary">
            {aboutPage.titleLines.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p lang="en" className="type-body-lg mt-6 font-medium text-primary">{siteConfig.slogan}</p>
          <p className="type-body mt-5 max-w-2xl text-foreground">{aboutPage.description}</p>
          <p lang="en" className="type-body-sm mt-6 max-w-xl text-secondary">{siteConfig.tagline}</p>
        </div>
        <figure className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border bg-background p-6 shadow-subtle sm:p-8">
          <BrandPattern variant="kaleidoscope" />
          <div aria-hidden="true" className="absolute inset-12 rotate-45 rounded-lg border border-secondary/15 sm:inset-16" />
          <XkLogo size={224} showWordmark={false} className="relative" />
          <figcaption lang="en" className="type-body-sm relative mt-4 font-semibold text-primary">{siteConfig.name}</figcaption>
          <Link href="#who-we-are" className="type-body-sm relative mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-secondary hover:underline">
            認識我們 <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </figure>
      </Container>
    </Section>
  );
}
