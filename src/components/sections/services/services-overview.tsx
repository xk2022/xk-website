import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardDescription, CardFooter, CardHeader, CardIcon, CardTitle } from "@/components/ui/card";
import { serviceCategories, servicesPage } from "@/config/services";

export function ServicesOverview() {
  return (
    <Section id="service-overview" aria-labelledby="service-overview-title" className="scroll-mt-8">
      <Container>
        <SectionHeading id="service-overview-title" eyebrow="SERVICE OVERVIEW" titleLang="zh-TW" {...servicesPage.overview} />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map(({ id, number, title, englishTitle, summary, Icon }) => (
            <Card key={id} variant="interactive" href={`#${id}`}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardIcon><Icon aria-hidden="true" /></CardIcon>
                  <span aria-hidden="true" className="type-caption font-semibold text-muted-foreground">{number}</span>
                </div>
                <p lang="en" className="type-body-sm break-words text-secondary">{englishTitle}</p>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="type-body">{summary}</CardDescription>
              </CardHeader>
              <CardFooter className="type-body-sm border-t pt-5 font-medium text-secondary">
                查看服務內容 <ArrowDownRight aria-hidden="true" className="size-4" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
