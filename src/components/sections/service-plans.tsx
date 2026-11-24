import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { InquiryButton } from "@/components/layout/inquiry-button";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { servicePlanContent, servicePlans } from "@/config/service-plans";

type ServicePlansProps = { variant: "home" | "services" };

export function ServicePlans({ variant }: ServicePlansProps) {
  return (
    <>
      <Section
        id="service-plans"
        background={variant === "services" ? "surface" : "default"}
        aria-labelledby="service-plans-title"
        className="scroll-mt-8 border-y"
      >
        <Container>
          <SectionHeading id="service-plans-title" eyebrow="WEBSITE PLAN DIRECTIONS" titleLang="zh-TW" title={servicePlanContent.title} description={servicePlanContent.description} />
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicePlans.map((plan) => (
              <Card key={plan.id} role="article" aria-labelledby={`service-plan-${plan.id}-title`} data-service-plan-id={plan.id} className="h-full">
                <CardHeader>
                  <p className="type-caption font-semibold text-secondary">{plan.nature}</p>
                  <CardTitle id={`service-plan-${plan.id}-title`}>{plan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="type-body-sm space-y-5">
                    <div>
                      <dt className="mb-2 font-semibold text-primary">適合對象</dt>
                      <dd className="break-words text-muted-foreground">{plan.audience}</dd>
                    </div>
                    <div>
                      <dt className="mb-2 font-semibold text-primary">可討論範圍</dt>
                      <dd>
                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                          {plan.scope.map((item) => <li key={item} className="break-words">{item}</li>)}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
                <CardFooter className="flex-col items-stretch border-t pt-6">
                  <p className="type-body-lg font-semibold text-primary">{servicePlanContent.priceLabel}</p>
                  <p id={`service-plan-${plan.id}-scope`} className="type-body-sm break-words text-muted-foreground">{plan.scopeNote}</p>
                  <InquiryButton context={plan.title} descriptionId={`service-plan-${plan.id}-scope`} className="w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
          {variant === "home" && (
            <div className="mt-8">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={servicePlanContent.pricingGuideLink.href}>{servicePlanContent.pricingGuideLink.label}<ArrowUpRight aria-hidden="true" /></Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {variant === "services" && (
        <Section id="pricing-guide" aria-labelledby="pricing-guide-title" className="scroll-mt-8">
          <Container>
            <SectionHeading id="pricing-guide-title" eyebrow="PRICING GUIDE" titleLang="zh-TW" title={servicePlanContent.pricingGuide.title} description={servicePlanContent.pricingGuide.description} />
            <div className="grid gap-6 lg:grid-cols-3">
              {servicePlanContent.pricingGuide.factors.map((factor) => (
                <Card key={factor.id}>
                  <CardHeader>
                    <CardTitle>{factor.title}</CardTitle>
                    <CardDescription className="type-body">{factor.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <p className="type-body-sm mt-8 max-w-4xl text-muted-foreground">{servicePlanContent.pricingGuide.disclaimer}</p>
          </Container>
        </Section>
      )}
    </>
  );
}
