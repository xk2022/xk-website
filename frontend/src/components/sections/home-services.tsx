import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/config/homepage";
import { serviceCategories } from "@/config/services";

export function HomeServices() {
  return (
    <Section
      id="services"
      background="surface"
      aria-labelledby="services-title"
      className="scroll-mt-8 border-y"
    >
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="SERVICES / WEB · JAVA · AI"
          title="Our Services"
          description="從常見需求出發，規劃服務與交付內容；實際範圍依個別專案確認。"
        />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({
            id, anchor, name, englishName, description, need,
            plannedDeliverables, serviceId, learnMoreLabel, Icon,
          }) => {
            const category = serviceCategories.find((service) => service.id === serviceId);

            if (!category) {
              throw new Error(`Unknown homepage service: ${serviceId}`);
            }

            return (
              <Card
                key={id}
                id={`service-${anchor}`}
                role="article"
                aria-labelledby={`home-service-${id}-title`}
                className="h-full scroll-mt-8"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <CardIcon><Icon aria-hidden="true" /></CardIcon>
                    <p lang="en" className="type-caption font-semibold text-muted-foreground">{id}</p>
                  </div>
                  <p lang="en" className="type-body-sm break-words font-medium text-secondary">{englishName}</p>
                  <CardTitle id={`home-service-${id}-title`}>{name}</CardTitle>
                </CardHeader>
                <CardContent className="border-t pt-6">
                  <dl className="type-body-sm space-y-4">
                    <div>
                      <dt className="mb-1 font-semibold text-primary">常見需求</dt>
                      <dd className="text-muted-foreground">{need}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 font-semibold text-primary">XK 方案</dt>
                      <dd className="text-muted-foreground">{description}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 font-semibold text-primary">可規劃交付</dt>
                      <dd className="text-muted-foreground">{plannedDeliverables}</dd>
                    </div>
                  </dl>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/services#${category.id}`}>
                      {learnMoreLabel} <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/services">
              了解完整服務 <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
