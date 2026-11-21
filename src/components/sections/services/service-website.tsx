import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ServiceDetail } from "@/components/sections/services/service-detail";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/config/services";

export function ServiceWebsite() {
  return (
    <>
      <ServiceDetail service={serviceCategories[0]} />
      <Section background="surface" spacing="compact" className="border-b">
        <Container>
          <aside aria-labelledby="one-page-website-title" className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0 max-w-2xl">
              <h3 id="one-page-website-title" className="type-h3 text-primary">一頁式網站，聚焦品牌與主題</h3>
              <p className="type-body mt-3 text-muted-foreground">
                適合品牌介紹、商品或活動焦點；頁面內容與呈現方式依實際需求確認。可先瀏覽網站範例與品牌展示，了解不同情境的網站安排。
              </p>
            </div>
            <div className="flex min-w-0 shrink-0 flex-wrap gap-3">
              <Button asChild>
                <Link href="/portfolio#website-samples">瀏覽網站範例 <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/portfolio#website-cases">查看展示案例 <ArrowRight aria-hidden="true" /></Link>
              </Button>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
