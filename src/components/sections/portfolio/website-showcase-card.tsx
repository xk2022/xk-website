import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { WebsiteShowcase } from "@/config/website-showcases";

type WebsiteShowcaseCardProps = {
  showcase: WebsiteShowcase;
  headingLevel?: "h2" | "h3";
};

export function WebsiteShowcaseCard({ showcase, headingLevel = "h3" }: WebsiteShowcaseCardProps) {
  const basePath = process.env.XK_PAGES_EXPORT === "1"
    ? (process.env.XK_PAGES_BASE_PATH ?? "/xk-website")
    : "";

  return (
    <article className="min-w-0" data-showcase-id={showcase.id} data-showcase-state={showcase.availability ?? "available"}>
      <Card className="h-full gap-0 overflow-hidden p-0">
        {showcase.image ? <Image
          src={`${basePath}${showcase.image.src}`}
          alt={showcase.image.alt}
          width={showcase.image.width}
          height={showcase.image.height}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
          loading="lazy"
          unoptimized
          className="aspect-[8/5] h-auto w-full border-b bg-surface object-cover"
        /> : (
          <div className="flex aspect-[8/5] flex-col items-center justify-center gap-3 border-b bg-surface px-6 text-center">
            <p className="type-h3 font-semibold text-primary">準備中</p>
            <p className="type-body-sm text-muted-foreground">公開後提供網站預覽</p>
          </div>
        )}
        <CardHeader className="p-6">
          <p className="type-caption break-words font-semibold text-secondary">
            {showcase.category} · {showcase.kind === "brand-demo" ? "品牌網站展示" : "模板範例"}
          </p>
          <CardTitle as={headingLevel} className="break-words">{showcase.title}</CardTitle>
          <CardDescription className="type-body">{showcase.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-6 pb-6">
          {showcase.highlights.length > 0 && <ul className="type-body-sm list-disc space-y-2 pl-5 text-muted-foreground">
            {showcase.highlights.map((highlight) => <li key={highlight} className="break-words">{highlight}</li>)}
          </ul>}
          <p className="type-body-sm break-words text-muted-foreground">{showcase.note}</p>
        </CardContent>
        <CardFooter className="mt-auto flex-col items-stretch border-t p-6 pt-5">
          {showcase.attribution && (
            <a
              href={showcase.attribution.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`查看${showcase.title}的模板來源：${showcase.attribution.label}（另開分頁）`}
              className="type-body-sm inline-flex min-h-11 min-w-0 items-center gap-2 rounded-sm text-secondary underline underline-offset-4"
            >
              <span className="min-w-0 break-words">模板來源：{showcase.attribution.label}</span>
              <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            </a>
          )}
          {showcase.href ? <Button asChild variant="outline" className="w-full">
            <a
              href={showcase.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`開啟展示網站：${showcase.title}（另開分頁）`}
            >
              開啟展示網站<ArrowUpRight aria-hidden="true" />
            </a>
          </Button> : (
            <p className="type-body-sm flex min-h-11 items-center justify-center rounded-md border border-dashed px-4 py-2 font-medium text-muted-foreground">展示網站準備中</p>
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
