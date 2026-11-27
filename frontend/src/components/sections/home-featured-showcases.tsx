import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { WebsiteShowcaseCard } from "@/components/sections/portfolio/website-showcase-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { featuredWebsiteShowcases } from "@/config/website-showcases";

export function HomeFeaturedShowcases() {
  return (
    <Section id="featured-websites" background="surface" aria-labelledby="featured-websites-title" className="scroll-mt-8 border-y">
      <Container>
        <SectionHeading
          id="featured-websites-title"
          eyebrow="FEATURED WEBSITE SHOWCASES"
          title="精選網站展示"
          titleLang="zh-TW"
          description="透過餐飲、禮品與工業製造的自製展示案例，了解品牌故事、產品與服務可以如何呈現。各案例的展示性質與使用限制皆於卡片說明。"
        />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredWebsiteShowcases.map((showcase) => <WebsiteShowcaseCard key={showcase.id} showcase={showcase} />)}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/portfolio#website-cases">查看全部作品<ArrowUpRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
