import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardIcon, CardTitle } from "@/components/ui/card";
import { aboutPage } from "@/config/about";

export function AboutMissionVision() {
  const { mission, vision } = aboutPage;

  return (
    <>
      <Section id="mission" background="surface" aria-labelledby="mission-title" className="scroll-mt-8 border-y">
        <Container>
          <SectionHeading
            id="mission-title"
            eyebrow="OUR MISSION"
            title="我們的使命"
            titleLang="zh-TW"
            description={mission.statement}
          />
          <p className="type-body mb-10 max-w-3xl text-muted-foreground">{mission.description}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {mission.pillars.map(({ title, description, Icon }) => (
              <Card key={title}>
                <CardHeader>
                  <CardIcon><Icon aria-hidden="true" /></CardIcon>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-muted-foreground">{description}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="vision" aria-labelledby="vision-title" className="scroll-mt-8">
        <Container className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <SectionHeading
            id="vision-title"
            eyebrow="OUR VISION"
            title="我們的願景"
            titleLang="zh-TW"
            description={vision.statement}
            className="mb-0 sm:mb-0"
          />
          <div className="min-w-0">
            <p className="type-body-sm mb-5 font-semibold text-secondary">發展方向</p>
            <ol className="divide-y border-y">
              {vision.directions.map((direction, index) => (
                <li key={direction} className="flex min-w-0 gap-4 py-5 sm:gap-6">
                  <span aria-hidden="true" className="type-caption shrink-0 pt-1 text-secondary">{String(index + 1).padStart(2, "0")}</span>
                  <p className="type-body min-w-0 text-foreground">{direction}</p>
                </li>
              ))}
            </ol>
            <p className="type-body-sm mt-5 text-muted-foreground">
              以上為品牌逐步發展的方向。
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
