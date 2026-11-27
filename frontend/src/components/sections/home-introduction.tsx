import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function HomeIntroduction() {
  return (
    <Section id="about" aria-labelledby="about-title" className="scroll-mt-8">
      <Container className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">ABOUT XPLORE KALEIDOSCOPE</p>
          <h2 id="about-title" className="type-h2 max-w-md text-primary">讓技術成為企業成長的力量</h2>
        </div>
        <div id="brand" className="type-body space-y-5 text-muted-foreground">
          <p className="type-body-lg text-foreground">
            Xplore Kaleidoscope 整合網站開發、Java 企業系統、系統架構與 AI 應用技術，
            協助企業建立穩定、可擴充且符合實際營運需求的數位解決方案。
          </p>
          <p>
            從網站建置、系統整合到 AI 應用，我們重視技術品質、實際效益與長期維護，
            讓數位技術真正創造商業價值。
          </p>
        </div>
      </Container>
    </Section>
  );
}
