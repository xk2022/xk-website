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
            description="從餐飲、送禮到網站服務與工業製造，探索品牌資訊的不同呈現方式。各項標示展示範圍；準備中的內容於公開後提供預覽。"
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
            description="參考工作室、簡潔形象、產品 App 與餐廳的頁面安排。這四個範例採用第三方模板，各卡片均標示原始來源，方便比較版型方向。"
          />
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
            {websiteSamples.map((showcase) => <WebsiteShowcaseCard key={showcase.id} showcase={showcase} />)}
          </div>
        </Container>
      </Section>
    </>
  );
}
