import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function AboutCta() {
  return (
    <Section id="about-next-step" background="surface" aria-labelledby="about-cta-title" className="relative overflow-hidden border-t">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">EXPLORE WHAT COMES NEXT</p>
          <h2 id="about-cta-title" className="type-h2 text-primary">讓我們一起探索下一個數位可能。</h2>
          <p className="type-body-lg mt-5 max-w-2xl text-foreground">無論是企業網站、Java 系統、系統整合或 AI 應用，都可以從理解需求開始。</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button asChild size="lg"><Link href="/#services">了解服務 <ArrowUpRight aria-hidden="true" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/#contact">聯絡 XK <ArrowUpRight aria-hidden="true" /></Link></Button>
        </div>
      </Container>
    </Section>
  );
}
