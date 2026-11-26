import Link from "next/link";
import { ArrowUpRight, BookOpen, Gem, LayoutTemplate } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardIcon, CardTitle } from "@/components/ui/card";
import { designCollectionRegistry } from "@/config/design-collection";
import { getDesignHeaderItems } from "@/lib/design-collection/navigation-model";
import { resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignStyleId } from "@/lib/design-collection/types";

const introduction = {
  eyebrow: "WEBSITE DESIGN SERIES",
  title: "XK Design Collection",
  description: "比較 Modern、Heritage 與 Luxury 網站設計系列，了解同一份 XK 品牌內容的不同呈現方向。",
  availability: "目前可瀏覽 Modern、Heritage 與 Luxury 三套完整網站設計系列。",
  contentNote: "各系列共用品牌、服務與作品資料。系列名稱描述網站的呈現方向，服務範圍與參考價格不因風格改變。",
} as const;

const stylePresentations = {
  modern: {
    icon: LayoutTemplate,
    description: "沿用目前網站的現代專業版面，以清楚的導覽與資訊層級呈現內容。",
    directions: ["水平導覽與手機目錄", "服務卡片與分段說明", "保留作品性質、來源與狀態"],
  },
  heritage: {
    icon: BookOpen,
    description: "以編輯式章節、圖說與紙本閱讀節奏，重新安排相同的品牌內容。",
    directions: ["刊頭與章節索引", "編號服務目錄", "圖說與來源並列的作品清冊"],
  },
  luxury: {
    icon: Gem,
    description: "以克制的敘事、明確的視覺焦點與展覽式留白，引導內容閱讀。",
    directions: ["大標題與單一主焦點", "分段服務敘事", "作品展示與獨立行動區"],
  },
} as const satisfies Record<DesignStyleId, {
  icon: typeof LayoutTemplate;
  description: string;
  directions: readonly string[];
}>;

export function DesignCollectionGallery() {
  return (
    <>
      <Section background="surface" aria-labelledby="design-collection-title" className="border-b">
        <Container>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">{introduction.eyebrow}</p>
          <h1 id="design-collection-title" lang="en" className="type-h1 max-w-4xl break-words text-primary">{introduction.title}</h1>
          <p className="type-body-lg mt-6 max-w-3xl text-foreground">{introduction.description}</p>
          <p className="type-body mt-5 max-w-3xl text-foreground">{introduction.availability}</p>
        </Container>
      </Section>

      <Section id="design-styles" aria-labelledby="design-styles-title" className="scroll-mt-8">
        <Container>
          <SectionHeading
            id="design-styles-title"
            eyebrow="EXPLORE THE COLLECTION"
            title="設計系列"
            titleLang="zh-TW"
            description={introduction.contentNote}
          />
          <div className="grid auto-rows-fr gap-6 lg:grid-cols-3">
            {designCollectionRegistry.styles.map((style) => {
              const presentation = stylePresentations[style.id];
              const Icon = presentation.icon;
              const href = resolveDesignHref({ styleId: style.id, pageKey: "home" });
              const available = href !== null;

              return (
                <Card
                  key={style.id}
                  role="article"
                  aria-labelledby={`design-style-${style.id}-title`}
                  data-design-style-id={style.id}
                  data-design-status={style.status}
                  className="h-full"
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <CardIcon><Icon /></CardIcon>
                      <p className="type-body-sm rounded-full border bg-surface px-3 py-1 font-medium text-primary">{available ? "可瀏覽" : "規劃中"}</p>
                    </div>
                    <CardTitle id={`design-style-${style.id}-title`}>{style.name}</CardTitle>
                    <CardDescription className="type-body">{presentation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="type-body-sm mb-3 font-semibold text-primary">{available ? "目前呈現" : "規劃方向"}</p>
                    <ul className="type-body-sm list-disc space-y-2 pl-5 text-foreground">
                      {presentation.directions.map((direction) => <li key={direction} className="break-words">{direction}</li>)}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    {href !== null ? (
                      <Button asChild variant="secondary" className="w-full">
                        <Link href={href}>瀏覽 {style.name}<ArrowUpRight aria-hidden="true" /></Link>
                      </Button>
                    ) : (
                      <p className="type-body-sm text-muted-foreground">規劃中，尚未提供展示頁面。</p>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="compare-pages" background="surface" aria-labelledby="compare-pages-title">
        <Container>
          <SectionHeading id="compare-pages-title" eyebrow="COMPARE THE SAME CONTENT" title="從同一頁，比較三種呈現" titleLang="zh-TW" description="選擇相同內容，直接比較版面與閱讀方式；設計風格不改變服務範圍或參考價格。" />
          <table className="w-full table-fixed border-collapse text-left text-sm text-foreground">
            <caption className="sr-only">七個主要頁面的三風格對照入口</caption>
            <thead><tr><th scope="col" className="w-1/4 border-b border-border p-2 font-semibold sm:p-4">頁面</th>{designCollectionRegistry.styles.map((style) => <th key={style.id} scope="col" className="break-words border-b border-border p-2 text-center text-xs font-semibold sm:p-4 sm:text-sm"><span lang="en">{style.id === "modern" ? "Modern" : style.id === "heritage" ? "Heritage" : "Luxury"}</span></th>)}</tr></thead>
            <tbody>{getDesignHeaderItems("modern", undefined, undefined, false).map((page) => <tr key={page.pageKey}><th scope="row" className="break-words border-b border-border p-2 font-medium sm:p-4">{page.label}</th>{designCollectionRegistry.styles.map((style) => {
              if (page.pageKey === "collection") return null;
              const href = resolveDesignHref({ styleId: style.id, pageKey: page.pageKey });
              if (!href) throw new Error("Comparison requires a published same-content destination");
              return <td key={style.id} className="border-b border-border p-2 sm:p-4"><Link href={href} className="inline-flex min-h-11 w-full max-w-full items-center justify-center rounded-sm font-medium text-secondary underline underline-offset-4"><span>查看<span className="sr-only"> {style.name} 的{page.label}</span></span></Link></td>;
            })}</tr>)}</tbody>
          </table>
        </Container>
      </Section>
    </>
  );
}
