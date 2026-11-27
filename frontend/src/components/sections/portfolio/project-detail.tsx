import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectEmptyMedia, ProjectStatusLabel, ProjectTechnologyTags, ProjectTypeLabel } from "@/components/sections/portfolio/project-labels";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { contactNavigation } from "@/config/navigation";
import { portfolioPage, type PortfolioProject } from "@/config/portfolio";
import { serviceCategories, type ServiceId } from "@/config/services";

function resolveProjectService(id: ServiceId) {
  const service = serviceCategories.find((category) => category.id === id);
  if (!service) throw new Error(`Unknown portfolio service: ${id}`);
  return service;
}

function ProjectTextList({ items }: { items: readonly string[] }) {
  return (
    <ul className="type-body space-y-3 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 items-start gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  const { detail } = portfolioPage;

  return (
    <>
      <Section id="project-overview" background="surface" aria-labelledby="project-title" className="relative overflow-hidden border-b">
        <BrandPattern variant="gradient" />
        <Container className="relative min-w-0">
          <nav aria-label="麵包屑導覽" className="type-body-sm mb-8 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-foreground">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">首頁</Link>
            <span aria-hidden="true">/</span>
            <Link href={detail.backLink.href} className="inline-flex min-h-11 items-center rounded-sm hover:text-secondary">作品展示</Link>
            <span aria-hidden="true">/</span>
            <span lang="en" aria-current="page" className="min-w-0 break-words">{project.title}</span>
          </nav>
          <div className="max-w-4xl">
            <p lang="en" className="type-caption mb-4 break-words font-semibold text-secondary">{project.category}</p>
            <h1 id="project-title" lang="en" className="type-h1 break-words text-primary">{project.title}</h1>
            <p className="type-body-lg mt-6 text-foreground">{project.summary}</p>
            <div className="mt-6 flex min-w-0 flex-wrap items-center gap-4 [&>p]:text-foreground">
              <ProjectStatusLabel status={project.status} />
              <ProjectTypeLabel />
            </div>
          </div>
          <div className="mt-10 max-w-4xl border-t pt-8 sm:mt-12">
            <SectionHeading id="project-overview-title" titleLang="zh-TW" {...detail.overview} className="mb-5 sm:mb-6 [&>p:last-child]:text-foreground" />
            <p className="type-body text-foreground">{project.businessContext}</p>
          </div>
        </Container>
      </Section>

      <Section id="project-challenge" aria-labelledby="project-challenge-title">
        <Container>
          <SectionHeading id="project-challenge-title" eyebrow="BUSINESS CHALLENGE" titleLang="zh-TW" {...detail.challenge} />
          <div className="max-w-4xl"><ProjectTextList items={project.challenges} /></div>
        </Container>
      </Section>

      <Section id="project-solution" background="surface" aria-labelledby="project-solution-title" className="border-y">
        <Container>
          <SectionHeading id="project-solution-title" eyebrow="PROPOSED DIRECTION" titleLang="zh-TW" {...detail.solution} />
          <p className="type-body-sm mb-4 font-semibold text-secondary">{detail.planningLabel}</p>
          <p className="type-body-lg max-w-4xl text-foreground">{project.proposedSolution}</p>
          <div className="mt-8 max-w-4xl">
            <h3 className="type-h3 mb-5 text-primary">規劃架構方向</h3>
            <ol className="space-y-3">
              {project.proposedArchitecture.map((item, index) => (
                <li key={item} className="flex min-w-0 items-start gap-4 rounded-lg border bg-background p-4 sm:p-5">
                  <span aria-hidden="true" className="type-caption pt-0.5 font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="type-body min-w-0 break-words text-muted-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10 grid min-w-0 gap-8 md:grid-cols-2 md:gap-12">
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">規劃功能</h3>
              <ProjectTextList items={project.plannedFeatures} />
            </div>
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">已實作功能</h3>
              {project.implementedFeatures.length > 0 ? <ProjectTextList items={project.implementedFeatures} /> : (
                <p className="type-body text-muted-foreground">{detail.emptyImplementation}</p>
              )}
            </div>
            {project.futureFeatures.length > 0 && (
              <div className="min-w-0 border-t pt-6">
                <h3 className="type-h3 mb-5 text-primary">{detail.futureLabel}</h3>
                <ProjectTextList items={project.futureFeatures} />
              </div>
            )}
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">{detail.businessValueLabel}</h3>
              <ProjectTextList items={project.businessValue} />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="project-technology" aria-labelledby="project-technology-title">
        <Container>
          <SectionHeading id="project-technology-title" eyebrow="PLANNED TECHNOLOGY" titleLang="zh-TW" {...detail.technology} />
          <div className="grid min-w-0 gap-8 md:grid-cols-2 md:gap-12">
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">規劃中技術</h3>
              <ProjectTechnologyTags technologies={project.plannedTechnologies} label={`${project.title}規劃中技術`} />
            </div>
            <div className="min-w-0 border-t pt-6">
              <h3 className="type-h3 mb-5 text-primary">已實作技術</h3>
              {project.implementedTechnologies.length > 0 ? (
                <ProjectTechnologyTags technologies={project.implementedTechnologies} label={`${project.title}已實作技術`} />
              ) : <p className="type-body text-muted-foreground">{detail.emptyImplementation}</p>}
            </div>
            {project.futureTechnologies.length > 0 && (
              <div className="min-w-0 border-t pt-6">
                <h3 className="type-h3 mb-5 text-primary">{detail.futureLabel}</h3>
                <ProjectTechnologyTags technologies={project.futureTechnologies} label={`${project.title}後續技術方向`} />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section id="project-evidence" background="surface" aria-labelledby="project-evidence-title" className="border-y">
        <Container>
          <SectionHeading id="project-evidence-title" eyebrow="PROJECT MEDIA" titleLang="zh-TW" {...detail.evidence} />
          <div className="max-w-4xl"><ProjectEmptyMedia /></div>
        </Container>
      </Section>

      <Section id="project-status" aria-labelledby="project-status-title">
        <Container>
          <SectionHeading id="project-status-title" eyebrow="STATUS AND EVIDENCE" titleLang="zh-TW" {...detail.status} />
          <ProjectStatusLabel status={project.status} />
          <ul className="type-body mt-6 max-w-4xl space-y-4 text-muted-foreground">
            {project.statusEvidence.map((evidence) => <li key={evidence.description} className="border-l-2 border-secondary pl-5">{evidence.description}</li>)}
          </ul>
          <div className="mt-8 grid min-w-0 gap-6 md:grid-cols-2">
            <div className="min-w-0 rounded-lg border bg-surface p-6">
              <h3 className="type-h3 mb-4 text-primary">專案原始碼</h3>
              {project.sourceLink ? (
                <a href={project.sourceLink.href} className="type-body-sm inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline">
                  <span className="min-w-0 break-words">{project.sourceLink.label}</span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </a>
              ) : <p className="type-body text-muted-foreground">尚未提供經確認可公開的專案原始碼連結。</p>}
            </div>
            <div className="min-w-0 rounded-lg border bg-surface p-6">
              <h3 lang="en" className="type-h3 mb-4 text-primary">Live Demo</h3>
              {project.liveDemo ? (
                <a href={project.liveDemo.href} className="type-body-sm inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline">
                  <span className="min-w-0 break-words">{project.liveDemo.label}</span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </a>
              ) : <p className="type-body text-muted-foreground">目前沒有可驗證的公開 Live Demo。</p>}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="project-services" background="surface" aria-labelledby="project-services-title" className="border-y">
        <Container>
          <SectionHeading id="project-services-title" eyebrow="RELATED SERVICES" titleLang="zh-TW" {...detail.services} />
          <div className="grid gap-6 md:grid-cols-2">
            {project.serviceIds.map((id) => {
              const service = resolveProjectService(id);
              return (
                <Card key={id} variant="interactive" href={`/services#${service.id}`}>
                  <CardHeader>
                    <p lang="en" className="type-body-sm break-words text-secondary">{service.englishTitle}</p>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="type-body">{service.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter className="type-body-sm border-t pt-5 font-medium text-secondary">了解技術服務<ArrowUpRight aria-hidden="true" className="size-4" /></CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="project-next-step" aria-labelledby="project-next-step-title" className="relative overflow-hidden">
        <BrandPattern variant="gradient" />
        <Container className="relative min-w-0">
          <SectionHeading id="project-next-step-title" eyebrow="CONTINUE EXPLORING" titleLang="zh-TW" {...detail.nextStep} className="[&>p:last-child]:text-foreground" />
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg"><Link href={contactNavigation.href}>{portfolioPage.cta.primaryCta.label}<ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/services">了解服務<ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild size="lg" variant="ghost"><Link href={detail.backLink.href}>{detail.backLink.label}</Link></Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
