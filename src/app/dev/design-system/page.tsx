import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Layers3, ScanLine } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { ButtonDemo } from "@/components/dev/button-demo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "品牌設計系統 · 開發驗收",
  description: "XK 品牌設計系統的元件、設計變數與響應式驗收工具。",
  robots: { index: false, follow: false },
};

const chapters = [
  { href: "#logos", label: "Logo" },
  { href: "#colors", label: "色彩" },
  { href: "#typography", label: "排版" },
  { href: "#buttons", label: "按鈕" },
  { href: "#cards", label: "卡片" },
  { href: "#layout", label: "版面" },
  { href: "#geometry", label: "幾何視覺" },
] as const;

const colors = [
  { name: "Primary", hex: "#101A33", usage: "品牌主色", swatch: "bg-primary" },
  { name: "Secondary", hex: "#3157D5", usage: "品牌輔助色", swatch: "bg-secondary" },
  { name: "Accent", hex: "#19B8D5", usage: "強調色", swatch: "bg-accent" },
  { name: "Background", hex: "#FFFFFF", usage: "主要背景", swatch: "bg-background" },
  { name: "Surface", hex: "#F5F7FB", usage: "區塊背景", swatch: "bg-surface" },
  { name: "Foreground", hex: "#172033", usage: "主要文字", swatch: "bg-foreground" },
  { name: "Muted", hex: "#667085", usage: "次要文字", swatch: "bg-muted-foreground" },
  { name: "Border", hex: "#E4E8F0", usage: "邊框", swatch: "bg-border" },
] as const;

const typography = [
  { role: "Display", className: "type-display", text: "Explore Possibilities.", lang: "en" },
  { role: "H1", className: "type-h1", text: "探索數位可能", lang: "zh-TW" },
  { role: "H2", className: "type-h2", text: "設計，連結品牌與技術。", lang: "zh-TW" },
  { role: "H3", className: "type-h3", text: "一致的元件語言", lang: "zh-TW" },
  { role: "Body Large", className: "type-body-lg", text: "整合 Web、Java 與 AI，建立清晰且一致的閱讀體驗。", lang: "zh-TW" },
  { role: "Body", className: "type-body", text: "以 Inter 與 Noto Sans TC 呈現中英文內容，兼顧閱讀節奏與資訊層級。", lang: "zh-TW" },
  { role: "Body Small", className: "type-body-sm", text: "輔助說明保持清楚，不以過小的文字交換版面空間。", lang: "zh-TW" },
  { role: "Caption", className: "type-caption", text: "圖說與註解 · Design system specimen", lang: "zh-TW" },
  { role: "Button", className: "type-button", text: "探索設計元件", lang: "zh-TW" },
] as const;

const patterns = [
  { variant: "grid", label: "Geometric Grid", description: "以規律網格建立秩序。" },
  { variant: "kaleidoscope", label: "Kaleidoscope", description: "對稱幾何，保持低調。" },
  { variant: "gradient", label: "Gradient Accent", description: "以輕微色彩變化建立層次。" },
  { variant: "shapes", label: "Geometric Shapes", description: "以簡潔形狀延伸品牌語彙。" },
] as const;

function ChapterHeading({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
      <div>
        <p className="type-caption mb-3 font-semibold text-secondary" lang="en">
          {number}
        </p>
        <h2 className="type-h2 text-primary">{title}</h2>
      </div>
      <p className="type-body max-w-2xl self-end text-muted-foreground">{description}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  // This is a review tool, never a normal public route. Preview access is opt-in.
  if (process.env.NODE_ENV === "production" && process.env.XK_DESIGN_SYSTEM_PREVIEW !== "1") {
    notFound();
  }

  return (
    <>
      <Section background="surface" className="border-b">
        <Container>
          <p className="type-caption mb-5 font-semibold text-secondary" lang="en">
            XK / DESIGN SYSTEM / TASK 002
          </p>
          <h1 className="type-h1 max-w-3xl text-primary">讓每一個介面，說同一種品牌語言。</h1>
          <p className="type-body-lg mt-6 max-w-2xl text-muted-foreground">
            品牌色彩、排版、元件與幾何視覺的共用基礎。本頁僅供開發與驗收，
            不列入正式網站導覽。
          </p>
          <p className="type-caption mt-6 inline-flex rounded-full border bg-background px-4 py-2 text-foreground">
            開發驗收工具 · Logo 暫定版本
          </p>
          <nav aria-label="設計系統章節" className="mt-10 border-t pt-5">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {chapters.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="type-body-sm inline-flex min-h-11 items-center rounded-sm font-medium text-primary hover:text-secondary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section id="logos" className="scroll-mt-8 border-b">
        <Container>
          <ChapterHeading number="01 / IDENTITY" title="從既有圖稿延伸。" description="沿用品牌文件儲存庫提供的 XK 向量路徑與字標，不另行設計。不同背景與尺寸都使用相同的幾何識別。" />
          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="flex min-w-0 flex-col justify-between rounded-lg border bg-background p-6 sm:p-8">
              <div className="flex min-h-48 items-center justify-center">
                <XkLogo size={112} className="hidden h-auto max-w-full sm:inline-block" />
                <div className="flex flex-col items-center gap-2 sm:hidden">
                  <XkLogo size={112} showWordmark={false} />
                  <span lang="en" className="type-body-sm text-center font-semibold text-primary">Xplore Kaleidoscope</span>
                </div>
              </div>
              <figcaption className="type-body-sm mt-6 text-muted-foreground">Primary · 原稿配色，暫定版本</figcaption>
            </figure>
            <figure className="flex min-w-0 flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground sm:p-8">
              <div className="flex min-h-48 items-center justify-center">
                <XkLogo size={112} variant="white" className="hidden h-auto max-w-full sm:inline-block" />
                <div className="flex flex-col items-center gap-2 sm:hidden">
                  <XkLogo size={112} variant="white" showWordmark={false} />
                  <span lang="en" className="type-body-sm text-center font-semibold text-primary-foreground">Xplore Kaleidoscope</span>
                </div>
              </div>
              <figcaption className="type-body-sm mt-6">White · 深色背景，暫定版本</figcaption>
            </figure>
            <figure className="flex min-w-0 flex-col justify-between rounded-lg border bg-surface p-6 sm:p-8">
              <div className="flex min-h-48 items-center justify-center">
                <XkLogo size={112} variant="monochrome" className="hidden h-auto max-w-full sm:inline-block" />
                <div className="flex flex-col items-center gap-2 sm:hidden">
                  <XkLogo size={112} variant="monochrome" showWordmark={false} />
                  <span lang="en" className="type-body-sm text-center font-semibold text-primary">Xplore Kaleidoscope</span>
                </div>
              </div>
              <figcaption className="type-body-sm mt-6 text-muted-foreground">Monochrome · 單色，暫定版本</figcaption>
            </figure>
            <figure className="flex min-w-0 flex-col justify-between rounded-lg border bg-background p-6 sm:p-8">
              <div className="flex min-h-48 flex-wrap items-center justify-center gap-5">
                {[48, 72, 112].map((size) => <XkLogo key={size} size={size} showWordmark={false} />)}
              </div>
              <figcaption className="type-body-sm mt-6 text-muted-foreground">Symbol · 48 / 72 / 112px，暫定版本</figcaption>
            </figure>
          </div>
          <p className="type-body-sm mt-6 max-w-3xl text-muted-foreground">
            原稿使用 #101828 與 #2563EB；此處保留提供圖稿的配色，不改動下方 UI 品牌色彩。
            Logo 尚未取得最終核准。手機版以原稿圖形符號搭配可讀的 HTML 品牌名稱，避免縮小向量字標；
            較寬螢幕則展示完整的原稿向量字標。
          </p>
        </Container>
      </Section>

      <Section id="colors" background="surface" className="scroll-mt-8 border-b">
        <Container>
          <ChapterHeading number="02 / COLOR" title="清楚的色彩角色。" description="品牌色彩與介面語意分層管理。Muted 用於次要文字；Surface 用於區塊背景，兩者不互換。" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {colors.map(({ name, hex, usage, swatch }) => (
              <figure key={name} className="min-w-0 overflow-hidden rounded-lg border bg-background shadow-subtle">
                <div aria-hidden="true" className={`h-24 border-b sm:h-32 ${swatch}`} />
                <figcaption className="space-y-1 p-4">
                  <p lang="en" className="type-body-sm font-semibold text-primary">{name}</p>
                  <p lang="en" className="type-caption text-muted-foreground">{hex}</p>
                  <p className="type-body-sm text-muted-foreground">{usage}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="typography" className="scroll-mt-8 border-b">
        <Container>
          <ChapterHeading number="03 / TYPOGRAPHY" title="資訊層級，先於裝飾。" description="Inter 與 Noto Sans TC 共用一致的字重、行高與響應式字級。中文保持自然字距，英文標題維持清楚的節奏。" />
          <dl className="divide-y rounded-lg border px-5 sm:px-8">
            {typography.map(({ role, className, text, lang }) => (
              <div key={role} className="grid min-w-0 gap-4 py-7 lg:grid-cols-[10rem_1fr] lg:gap-8">
                <dt lang="en" className="type-caption font-medium text-muted-foreground">{role}</dt>
                <dd className="min-w-0">
                  <p lang={lang} className={`${className} break-words text-primary`}>{text}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section id="buttons" background="surface" className="scroll-mt-8 border-b">
        <Container>
          <ChapterHeading number="04 / BUTTONS" title="每一次操作，都有回應。" description="四種主要樣式、三種尺寸、可見焦點與原生停用狀態。此處按鈕會更新本機計數，方便檢查滑鼠與鍵盤操作。" />
          <div className="rounded-lg border bg-background p-6 shadow-subtle sm:p-8">
            <ButtonDemo />
          </div>
        </Container>
      </Section>

      <Section id="cards" className="scroll-mt-8 border-b">
        <Container>
          <ChapterHeading number="05 / CARDS" title="以元件承載內容。" description="統一間距、圓角與文字層級。只有實際導向內容的卡片才具有互動狀態，不把一般容器偽裝成按鈕。" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardIcon><Layers3 /></CardIcon>
                <CardTitle>共用視覺基礎</CardTitle>
                <CardDescription>Default Card · 圖示可依內容選用</CardDescription>
              </CardHeader>
              <CardContent>透過一致的色彩、排版與間距，讓不同頁面保持相同的品牌節奏。</CardContent>
              <CardFooter><span className="type-caption text-muted-foreground">純內容容器，不含互動行為。</span></CardFooter>
            </Card>
            <Card variant="interactive" href="#buttons">
              <CardHeader>
                <CardIcon><ScanLine /></CardIcon>
                <CardTitle>檢查互動狀態</CardTitle>
                <CardDescription>Interactive Card · 語意化連結</CardDescription>
              </CardHeader>
              <CardContent>以鍵盤或滑鼠前往按鈕區塊，檢查共用元件的焦點、操作回饋與停用狀態。</CardContent>
              <CardFooter><span className="type-body-sm inline-flex items-center gap-2 font-semibold text-secondary">前往按鈕示範 <ArrowUpRight aria-hidden="true" className="size-4" /></span></CardFooter>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="layout" background="surface" className="scroll-mt-8 border-b">
        <Container>
          <ChapterHeading number="06 / LAYOUT" title="穩定的留白與邊界。" description="Container 集中控制最大寬度與響應式水平留白，Section 統一背景與垂直節奏。間距沿用 Tailwind 尺度。" />
          <div className="overflow-hidden rounded-lg border">
            <Section spacing="compact" aria-labelledby="layout-default-title">
              <Container>
                <h3 id="layout-default-title" className="type-h3 text-primary">Default Section</h3>
                <p className="type-body mt-3 max-w-2xl text-muted-foreground">共用 Container 在螢幕變寬時保留閱讀邊界；在手機上維持足夠的水平留白。</p>
              </Container>
            </Section>
            <Section spacing="compact" background="primary" aria-labelledby="layout-primary-title">
              <Container>
                <h3 id="layout-primary-title" className="type-h3">Primary Section</h3>
                <p className="type-body mt-3 max-w-2xl">品牌主色背景使用對應的淺色文字，確保內容仍然清楚。</p>
              </Container>
            </Section>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["圓角", "Small / Medium / Large / Extra Large / Full"],
              ["陰影", "Subtle / Default / Elevated"],
              ["動態", "短暫過渡，尊重減少動態偏好"],
            ].map(([title, description]) => (
              <div key={title} className="rounded-lg border bg-background p-5">
                <dt className="type-body-sm font-semibold text-primary">{title}</dt>
                <dd className="type-body-sm mt-2 text-muted-foreground">{description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section id="geometry" className="scroll-mt-8">
        <Container>
          <ChapterHeading number="07 / GEOMETRY" title="低調而有秩序的延伸。" description="可重複使用的網格、對稱幾何、細緻漸層與形狀。裝飾保持靜態、不接收操作，也不參與輔助技術的閱讀順序。" />
          <div className="grid gap-6 md:grid-cols-2">
            {patterns.map(({ variant, label, description }) => (
              <figure key={variant} className="overflow-hidden rounded-lg border">
                <div className="relative min-h-56 overflow-hidden bg-surface">
                  <BrandPattern variant={variant} />
                  <div className="relative z-10 flex min-h-56 items-end p-6">
                    <p lang="en" className="type-body-sm rounded-md border bg-background px-3 py-2 font-medium text-primary">{label}</p>
                  </div>
                </div>
                <figcaption className="type-body-sm border-t bg-background p-5 text-muted-foreground">{description}</figcaption>
              </figure>
            ))}
          </div>
          <p className="type-caption mt-8 text-muted-foreground">驗收範圍：320 / 375 / 768 / 1440 / 1920px，包含鍵盤操作與減少動態設定。</p>
        </Container>
      </Section>
    </>
  );
}
