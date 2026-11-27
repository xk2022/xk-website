import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { resolveSolutionService, SolutionServiceLinks } from "@/components/sections/solutions/solution-service-links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { solutionDefinitions, solutionsPage } from "@/config/solutions";

export function SolutionsTechnology() {
  const { support } = solutionsPage.technology;
  const supportService = resolveSolutionService(support.serviceId);
  const Icon = supportService.Icon;

  return (
    <Section
      id="solution-technology"
      background="surface"
      aria-labelledby="solution-technology-title"
      className="scroll-mt-8 border-y"
    >
      <Container>
        <SectionHeading
          id="solution-technology-title"
          eyebrow="CONNECTING CAPABILITIES"
          titleLang="zh-TW"
          title={solutionsPage.technology.title}
          description={solutionsPage.technology.description}
        />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {solutionDefinitions.map((solution) => (
            <Card key={solution.id}>
              <CardHeader>
                <p lang="en" className="type-body-sm break-words text-secondary">{solution.englishTitle}</p>
                <CardTitle>{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="min-w-0 space-y-6">
                  <div>
                    <dt className="type-body font-semibold text-primary">企業需求</dt>
                    <dd className="type-body-sm mt-2 text-muted-foreground">{solution.audience}</dd>
                  </div>
                  <div>
                    <dt className="type-body font-semibold text-primary">技術能力</dt>
                    <dd className="mt-3">
                      <ul aria-label={`${solution.title}技術對照`} className="flex min-w-0 flex-wrap gap-2">
                        {solution.technologies.map(({ name }) => (
                          <li key={name} className="type-body-sm min-w-0 break-words rounded-full border bg-surface px-3 py-2 text-foreground">
                            {name}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="border-t pt-4">
                    <dt className="type-body mb-2 font-semibold text-primary">對應技術服務</dt>
                    <dd>
                      <SolutionServiceLinks serviceIds={solution.serviceIds} label={`${solution.title}服務對照`} />
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex min-w-0 flex-col gap-5 rounded-lg border bg-background p-6 sm:flex-row sm:gap-6 sm:p-8">
          <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-md bg-surface text-secondary">
            <Icon className="size-6" />
          </span>
          <div className="min-w-0">
            <h3 className="type-h3 text-primary">{support.title}</h3>
            <p className="type-body mt-3 max-w-3xl text-muted-foreground">{support.description}</p>
            <div className="mt-3">
              <SolutionServiceLinks serviceIds={[support.serviceId]} label="共同部署支援服務" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
