import Link from "next/link";
import { FileText } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { privacyDraftMarker, privacyPageMetadata, privacyPolicy, type PrivacyPolicyConfig } from "@/config/privacy";

type PrivacyPolicyProps = Readonly<{ policy?: PrivacyPolicyConfig }>;

export function PrivacyPolicy({ policy = privacyPolicy }: PrivacyPolicyProps = {}) {
  const isDraft = policy.status === "draft";

  return (
    <>
      <div className="border-b bg-surface py-16 sm:py-20" data-privacy-status={policy.status}>
        <Container>
          <div className="mx-auto min-w-0 max-w-3xl [overflow-wrap:anywhere]">
            <nav aria-label="麵包屑導覽" className="type-body-sm mb-8 flex flex-wrap items-center gap-3 text-muted-foreground">
              <Link href="/modern" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">首頁</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">隱私權政策</span>
            </nav>
            <p lang="en" className="type-caption mb-4 font-semibold text-secondary">PRIVACY POLICY</p>
            <h1 id="privacy-page-title" className="type-h1 text-primary">隱私權政策</h1>
            <p className="type-body-lg mt-6 text-muted-foreground">
              {isDraft ? "本頁供政策內容與資料行為核對使用，尚未成為生效政策。" : privacyPageMetadata.description}
            </p>

            {isDraft && (
              <aside aria-labelledby="privacy-draft-title" className="mt-8 flex min-w-0 items-start gap-3 rounded-lg border border-secondary/30 bg-background p-5">
                <FileText aria-hidden="true" className="mt-1 size-5 shrink-0 text-secondary" />
                <div className="min-w-0 space-y-2">
                  <p id="privacy-draft-title" className="type-body font-semibold text-primary">{privacyDraftMarker}</p>
                  <p className="type-body-sm text-muted-foreground">正式正文、資料處理主體、生效資訊與權利聯絡方式，仍待品牌負責人及法律審閱者確認。</p>
                </div>
              </aside>
            )}

            <dl className="type-body-sm mt-8 grid min-w-0 gap-5 border-t pt-6 sm:grid-cols-3">
              <div className="min-w-0 space-y-1">
                <dt className="font-medium text-primary">{isDraft ? "草案版本" : "政策版本"}</dt>
                <dd className="text-muted-foreground">{policy.version ?? "待確認"}</dd>
              </div>
              <div className="min-w-0 space-y-1">
                <dt className="font-medium text-primary">生效日期</dt>
                <dd className="text-muted-foreground">
                  {policy.effectiveDate ? <time dateTime={policy.effectiveDate}>{policy.effectiveDate}</time> : "待核准確認"}
                </dd>
              </div>
              <div className="min-w-0 space-y-1">
                <dt className="font-medium text-primary">資料處理主體</dt>
                <dd className="text-muted-foreground">{policy.controllerName ?? "待確認"}</dd>
              </div>
            </dl>

            <nav id="policy-contents" aria-labelledby="policy-contents-title" className="mt-10 border-t pt-8">
              <h2 id="policy-contents-title" className="type-body-lg font-semibold text-primary">頁內目錄</h2>
              <ol className="type-body-sm mt-4 grid min-w-0 gap-x-8 gap-y-1 sm:grid-cols-2">
                {policy.sections.map((section, index) => (
                  <li key={section.id} className="min-w-0">
                    <Link href={`#${section.id}`} className="flex min-h-11 items-center gap-3 rounded-sm py-2 text-secondary underline-offset-4 hover:underline">
                      <span aria-hidden="true" className="shrink-0 text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">{section.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Container>
      </div>

      {policy.sections.map((section) => (
        <Section key={section.id} id={section.id} spacing="compact" aria-labelledby={`${section.id}-title`} className="scroll-mt-6 border-b last:border-b-0">
          <Container>
            <div className="mx-auto min-w-0 max-w-3xl [overflow-wrap:anywhere]">
              <SectionHeading id={`${section.id}-title`} titleLang="zh-TW" title={section.title} description={section.paragraphs[0] ?? ""} className="mb-6 sm:mb-6" />
              <div className="type-body space-y-5 text-muted-foreground">
                {section.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.id === "privacy-contact" && policy.rightsContact && (
                  <p>
                    <Link href={policy.rightsContact.href} className="inline-flex min-h-11 max-w-full items-center rounded-sm py-2 text-secondary underline underline-offset-4 [overflow-wrap:anywhere]">
                      {policy.rightsContact.label}
                    </Link>
                  </p>
                )}
              </div>
              {section.id === "policy-updates" && (
                <p className="type-body-sm mt-8">
                  <Link href="#policy-contents" className="inline-flex min-h-11 items-center rounded-sm py-2 text-secondary underline underline-offset-4">返回頁內目錄</Link>
                </p>
              )}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
