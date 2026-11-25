import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { InquiryButton } from "@/components/layout/inquiry-button";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { contactPage } from "@/config/contact-page";
import { verifiedContactChannels } from "@/config/contact";
import { inquiryAction } from "@/config/inquiry";
import { siteConfig } from "@/config/site";

export function ContactHero() {
  const { hero } = contactPage;
  const businessEmail = verifiedContactChannels.find(({ href }) => href.startsWith("mailto:"))?.href.slice("mailto:".length);

  return (
    <Section id="contact-hero" background="surface" aria-labelledby="contact-page-title" className="relative overflow-hidden border-b">
      <BrandPattern variant="gradient" />
      <Container className="relative grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
        <div className="min-w-0">
          <nav aria-label="麵包屑導覽" className="type-body-sm mb-8 flex flex-wrap items-center gap-3 text-foreground">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">首頁</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">聯絡我們</span>
          </nav>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">{hero.englishTitle}</p>
          <h1 id="contact-page-title" className="type-h1 break-words text-primary">{hero.title}</h1>
          <p className="type-body-lg mt-6 max-w-2xl text-foreground">{hero.description}</p>
          <p lang="en" className="type-body-sm mt-6 text-secondary">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg"><Link href="#contact-form">填寫詢問內容<ArrowDown aria-hidden="true" /></Link></Button>
            <InquiryButton descriptionId="contact-hero-email-note" variant="outline" />
          </div>
          <p id="contact-hero-email-note" className="type-body-sm mt-4 max-w-2xl text-foreground">{inquiryAction.label}：{inquiryAction.description}</p>
          {businessEmail && <p className="type-body-sm mt-3 break-all font-medium text-primary">商務 Email：{businessEmail}</p>}
          <Link href={hero.secondaryCta.href} className="type-body-sm mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline">{hero.secondaryCta.label}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link>
        </div>
        <figure className="relative mx-auto flex w-full min-w-0 max-w-sm flex-col items-center overflow-hidden rounded-2xl border bg-background px-6 py-10 shadow-subtle sm:px-8 sm:py-12">
          <BrandPattern variant="kaleidoscope" />
          <XkLogo size={176} showWordmark={false} decorative className="relative" />
          <figcaption className="relative mt-8 min-w-0 max-w-full text-center">
            <p lang="en" className="type-body-lg break-words font-semibold text-primary">{siteConfig.name}</p>
            <p lang="en" className="type-body-sm mt-4 max-w-64 text-foreground">{siteConfig.slogan}</p>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
