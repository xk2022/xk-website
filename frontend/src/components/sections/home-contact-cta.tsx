import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { InquiryButton } from "@/components/layout/inquiry-button";
import { Section } from "@/components/layout/section";
import { inquiryAction } from "@/config/inquiry";
import { contactNavigation } from "@/config/navigation";

export function HomeContactCta() {
  return (
    <Section id="contact" aria-labelledby="contact-title" background="surface" className="relative overflow-hidden scroll-mt-8 border-t">
      <BrandPattern variant="gradient" />
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">LET&apos;S BUILD SOMETHING VALUABLE</p>
          <h2 id="contact-title" className="type-h2 text-primary">從專案需求，開始規劃下一步。</h2>
          <p className="type-body-lg mt-5 max-w-2xl text-foreground">
            無論是企業網站、Java 系統開發、系統整合或 AI 應用，先整理目標、現況與討論範圍，讓後續的詢價與交流更清楚。
          </p>
        </div>
        <div className="rounded-lg border bg-background p-6 sm:p-8">
          <p className="type-body font-semibold text-primary">
            {inquiryAction.state === "preparation" ? "先整理專案需求" : "開始專案詢價"}
          </p>
          <p id="contact-inquiry-note" className="type-body-sm mt-3 text-muted-foreground">{inquiryAction.description}</p>
          <InquiryButton descriptionId="contact-inquiry-note" className="mt-5 w-full" />
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
