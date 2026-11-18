import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/config/homepage";

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
          description="整合技術能力，提供企業所需的數位解決方案。"
        />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, anchor, name, englishName, description, items, Icon }) => (
            <Card
              key={id}
              id={`service-${anchor}`}
              className="h-full scroll-mt-8"
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <CardIcon><Icon aria-hidden="true" /></CardIcon>
                  <p lang="en" className="type-caption font-semibold text-muted-foreground">{id}</p>
                </div>
                <p lang="en" className="type-body-sm break-words font-medium text-secondary">{englishName}</p>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="type-body">{description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto border-t pt-6">
                <ul lang="en" className="type-body-sm space-y-2 text-muted-foreground" aria-label={`${englishName} 服務項目`}>
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-secondary" />
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
