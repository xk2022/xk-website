import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { portfolioPage } from "@/config/portfolio";

export function PortfolioIntroduction() {
  return (
    <Section id="portfolio-introduction" aria-labelledby="portfolio-introduction-title">
      <Container>
        <SectionHeading id="portfolio-introduction-title" eyebrow="ABOUT THE PORTFOLIO" titleLang="zh-TW" {...portfolioPage.introduction} />
        <nav aria-label="作品展示分類" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="outline"><Link href="#website-cases">品牌網站展示案例</Link></Button>
          <Button asChild variant="outline"><Link href="#website-samples">第三方模板範例</Link></Button>
          <Button asChild variant="outline"><Link href="#portfolio-projects">技術展示規劃</Link></Button>
        </nav>
        <p className="type-body-sm mt-5 max-w-3xl text-muted-foreground">先瀏覽品牌展示、提案與自家服務推廣，了解各案的設計與實作範圍。第三方模板與技術展示規劃預設收合，可依需要展開閱讀。</p>
      </Container>
    </Section>
  );
}
