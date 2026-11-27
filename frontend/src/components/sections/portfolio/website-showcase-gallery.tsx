import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { WebsiteShowcaseCard } from "@/components/sections/portfolio/website-showcase-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { brandWebsiteShowcases, websiteSamples } from "@/config/website-showcases";

export function WebsiteShowcaseGallery() {
  return (
    <>
      <Section id="website-cases" aria-labelledby="website-cases-title" className="scroll-mt-8">
        <Container>
          <SectionHeading
            id="website-cases-title"
            eyebrow="BRAND WEBSITE SHOWCASES"
            title="品牌網站展示案例"
            titleLang="zh-TW"
            description="從餐飲、送禮到網站服務與工業製造，探索品牌資訊的不同呈現方式。各項標示品牌展示、品牌提案或自家服務推廣性質，可先閱讀作品介紹，再前往展示網站。"
          />
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
            {brandWebsiteShowcases.map((showcase) => <WebsiteShowcaseCard key={showcase.id} showcase={showcase} />)}
          </div>
        </Container>
      </Section>
      <Section id="website-samples" background="surface" aria-labelledby="website-samples-title" className="scroll-mt-8 border-y">
        <Container>
          <SectionHeading
            id="website-samples-title"
            eyebrow="WEBSITE TEMPLATE SAMPLES"
            title="網站模板範例"
            titleLang="zh-TW"
            description="參考工作室、簡潔形象、產品 App 與餐廳的頁面安排。這些範例採用第三方模板，各卡片均標示原始來源；素材待整理的項目暫停外連。"
          />
          <details className="rounded-lg border bg-background">
            <summary className="type-body-lg cursor-pointer rounded-lg px-6 py-5 font-semibold text-primary">查看 {websiteSamples.length} 個第三方模板範例</summary>
            <div className="grid auto-rows-fr gap-6 border-t p-4 sm:p-6 md:grid-cols-2">
              {websiteSamples.map((showcase) => <WebsiteShowcaseCard key={showcase.id} showcase={showcase} />)}
            </div>
          </details>
        </Container>
      </Section>
    </>
  );
}
