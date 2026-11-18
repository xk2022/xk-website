import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { solutionsPage } from "@/config/solutions";

export function SolutionsCta() {
  const { cta } = solutionsPage;

  return (
    <Section
      id="solutions-next-step"
      background="surface"
      aria-labelledby="solutions-cta-title"
      className="relative overflow-hidden border-t"
    >
      <BrandPattern variant="gradient" />
      <Container className="relative grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="min-w-0">
          <p lang="en" className="type-caption mb-4 font-semibold text-secondary">EXPLORE THE NEXT STEP</p>
          <h2 id="solutions-cta-title" className="type-h2 text-primary">{cta.title}</h2>
          <p className="type-body-lg mt-5 max-w-2xl text-muted-foreground">{cta.description}</p>
          <Link
            href={cta.aboutLink.href}
            className="type-body-sm mt-4 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline"
          >
            {cta.aboutLink.label}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <Button asChild size="lg">
            <Link href={cta.primaryCta.href}>
              {cta.primaryCta.label}<ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={cta.secondaryCta.href}>
              {cta.secondaryCta.label}<ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
