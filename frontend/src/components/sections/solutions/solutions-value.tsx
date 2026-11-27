import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { solutionsPage, solutionsValuePrinciples } from "@/config/solutions";

export function SolutionsValue() {
  return (
    <Section id="why-xk-solutions" aria-labelledby="why-xk-solutions-title" className="scroll-mt-8">
      <Container>
        <SectionHeading
          id="why-xk-solutions-title"
          eyebrow="WORKING WITH XK"
          titleLang="zh-TW"
          {...solutionsPage.value}
        />
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {solutionsValuePrinciples.map((principle, index) => (
            <li key={principle.title} className="flex min-w-0 items-start gap-4 border-t pt-6 sm:gap-6">
              <span aria-hidden="true" className="type-caption flex size-10 shrink-0 items-center justify-center rounded-md bg-surface font-semibold text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="type-h3 break-words text-primary">{principle.title}</h3>
                <p className="type-body mt-4 text-muted-foreground">{principle.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href={solutionsPage.cta.aboutLink.href}>
              {solutionsPage.cta.aboutLink.label}<ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
