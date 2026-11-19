import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { verifiedContactChannels } from "@/config/contact";
import { contactNavigation } from "@/config/navigation";

export function HomeContactCta() {
  const hasContactChannel = verifiedContactChannels.length > 0;

  return (
    <Section id="contact" aria-labelledby="contact-title" background="surface" className="relative overflow-hidden scroll-mt-8 border-t">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">LET&apos;S BUILD SOMETHING VALUABLE</p>
          <h2 id="contact-title" className="type-h2 text-primary">讓我們一起探索更多可能。</h2>
          <p className="type-body-lg mt-5 max-w-2xl text-foreground">
            無論是企業網站、Java 系統開發、系統整合或 AI 應用，歡迎與我們討論您的需求。
          </p>
        </div>
        <div className="rounded-lg border bg-background p-6 sm:p-8">
          {hasContactChannel ? (
            <div className="space-y-4">
              <p className="type-body font-semibold text-primary">開始討論您的專案</p>
              {verifiedContactChannels.map((channel) => (
                <Button key={channel.href} asChild className="w-full">
                  <a href={channel.href}>{channel.label} <ArrowUpRight aria-hidden="true" /></a>
                </Button>
              ))}
            </div>
          ) : (
            <>
              <p className="type-body font-semibold text-primary">正式聯絡方式待確認</p>
              <p className="type-body-sm mt-3 text-muted-foreground">
                網站仍在建置中，正式聯絡管道確認後將於此公開。
                您可以先瀏覽服務項目，整理專案目標與需求。
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link href="/#services">瀏覽服務項目 <ArrowUpRight aria-hidden="true" /></Link>
              </Button>
            </>
          )}
          <Link
            href={contactNavigation.href}
            className="type-body-sm mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline"
          >
            查看聯絡資訊 <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
