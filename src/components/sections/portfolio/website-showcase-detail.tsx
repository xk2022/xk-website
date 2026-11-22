import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { contactNavigation } from "@/config/navigation";
import { serviceCategories } from "@/config/services";
import { presentationLabels, showcaseStateLabels, type AvailableBrandShowcase } from "@/config/website-showcases";

function ShowcaseTextList({ items }: { items: readonly string[] }) {
  return (
    <ul className="type-body list-disc space-y-3 pl-5 text-muted-foreground">
      {items.map((item) => <li key={item} className="break-words">{item}</li>)}
    </ul>
  );
}

export function WebsiteShowcaseDetail({ showcase }: { showcase: AvailableBrandShowcase }) {
  const { detail, image } = showcase;
  const basePath = process.env.XK_PAGES_EXPORT === "1"
    ? (process.env.XK_PAGES_BASE_PATH ?? "/xk-website")
    : "";
  const websiteService = serviceCategories.find((service) => service.id === "website-development");
  if (!websiteService) throw new Error("Missing website development service");

  return (
    <article data-showcase-id={showcase.id} data-showcase-state="available" data-showcase-presentation={showcase.presentation}>
      <Section id="showcase-overview" background="surface" aria-labelledby="showcase-title" className="relative overflow-hidden border-b">
        <BrandPattern variant="gradient" />
        <Container className="relative min-w-0">
          <nav aria-label="麵包屑導覽" className="type-body-sm mb-8 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-foreground">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">首頁</Link>
            <span aria-hidden="true">/</span>
            <Link href="/portfolio#website-cases" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">作品展示</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="min-w-0 break-words">{showcase.title}</span>
          </nav>
          <div className="max-w-4xl">
            <p className="type-caption mb-4 break-words font-semibold text-secondary">{showcase.category}</p>
            <h1 id="showcase-title" className="type-h1 break-words text-primary">{showcase.title}</h1>
            <p className="type-body-lg mt-6 text-foreground">{showcase.summary}</p>
            <div className="mt-6 flex min-w-0 flex-wrap gap-3">
              <span className="type-body-sm max-w-full break-words rounded-full border bg-background px-3 py-1.5 font-medium text-secondary">{presentationLabels[showcase.presentation]}</span>
              <span className="type-body-sm max-w-full break-words rounded-full border bg-background px-3 py-1.5 font-medium text-foreground">{showcaseStateLabels.available}</span>
            </div>
            <p className="type-body-sm mt-5 text-foreground">{showcase.note}</p>
          </div>
        </Container>
      </Section>

      <Section id="showcase-context" aria-labelledby="showcase-context-title">
        <Container>
          <SectionHeading id="showcase-context-title" eyebrow="CONTEXT & AUDIENCE" title="展示背景與使用情境" titleLang="zh-TW" description={detail.context} />
          <div className="max-w-4xl border-l-2 border-secondary pl-5 sm:pl-6">
            <h3 className="type-h3 mb-4 text-primary">使用對象與情境</h3>
            <p className="type-body text-muted-foreground">{detail.audience}</p>
          </div>
        </Container>
      </Section>

      <Section id="showcase-preview" background="surface" aria-labelledby="showcase-preview-title" className="border-y">
        <Container>
          <SectionHeading id="showcase-preview-title" eyebrow="WEBSITE PREVIEW" title="網站預覽與來源" titleLang="zh-TW" description="以展示網站的實際畫面了解內容與介面安排，完整互動可前往展示網站瀏覽。" />
          <figure className="min-w-0 overflow-hidden rounded-lg border bg-background">
            <Image
              src={`${basePath}${image.src}`}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1280px) 1200px, 100vw"
              loading="lazy"
              unoptimized
              className="h-auto w-full"
            />
            <figcaption className="type-body-sm border-t p-4 text-muted-foreground sm:p-6">{showcase.title}展示網站的實際預覽。</figcaption>
          </figure>
          <div className="mt-6 min-w-0">
            <p className="type-body-sm font-semibold text-primary">展示網站來源</p>
            <a href={showcase.href} target="_blank" rel="noopener noreferrer" aria-label={`開啟展示網站來源：${showcase.href}（${showcase.title}，另開分頁）`} className="type-body-sm mt-2 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm text-secondary underline underline-offset-4">
              <span className="min-w-0 break-all">{showcase.href}</span><ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            </a>
          </div>
        </Container>
      </Section>

      <Section id="showcase-implementation" aria-labelledby="showcase-implementation-title">
        <Container>
          <SectionHeading id="showcase-implementation-title" eyebrow="DESIGN & IMPLEMENTATION" title="設計取捨與實作範圍" titleLang="zh-TW" description="以下整理目前展示網站可觀察的內容安排與已實作功能。" />
          <div className="grid min-w-0 gap-8 md:grid-cols-2 md:gap-12">
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">設計取捨</h3>
              <ShowcaseTextList items={detail.designDecisions} />
            </div>
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">已實作功能</h3>
              <ShowcaseTextList items={detail.implementedFeatures} />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="showcase-limitations" background="surface" aria-labelledby="showcase-limitations-title" className="border-y">
        <Container>
          <SectionHeading id="showcase-limitations-title" eyebrow="SCOPE & LIMITATIONS" title="展示限制" titleLang="zh-TW" description="閱讀展示內容時，請一併參考下列素材與功能範圍。" />
          <div className="max-w-4xl"><ShowcaseTextList items={detail.limitations} /></div>
        </Container>
      </Section>

      <Section id="showcase-next-step" aria-labelledby="showcase-next-step-title">
        <Container>
          <SectionHeading id="showcase-next-step-title" eyebrow="RELATED SERVICES" title="延伸了解網站服務" titleLang="zh-TW" description={websiteService.summary} />
          <p className="type-body mb-6 max-w-3xl text-muted-foreground">從展示的內容安排延伸了解網站服務，或查看目前可公開的聯絡資訊與需求準備方式。</p>
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild><Link href={`/services#${websiteService.id}`}>{websiteService.title}<ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="outline"><Link href={contactNavigation.href}>查看聯絡資訊<ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="ghost"><Link href="/portfolio#website-cases">返回品牌網站展示</Link></Button>
          </div>
        </Container>
      </Section>
    </article>
  );
}
