import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { solutionDirections } from "@/config/homepage";

export function HomeSolutions() {
  return (
    <Section
      id="solutions"
      aria-labelledby="solutions-title"
      className="scroll-mt-8"
    >
      <Container>
        <SectionHeading
          id="solutions-title"
          eyebrow="SOLUTIONS / FROM NEED TO DIRECTION"
          title="Digital Solutions for Business"
          description="依照企業需求，選擇適合的數位轉型方向。"
        />
        <div className="divide-y border-y">
          {solutionDirections.map(({ title, englishName, description, serviceAnchor }, index) => (
            <Link
              key={englishName}
              href={`/#service-${serviceAnchor}`}
              className="group grid min-w-0 gap-5 rounded-sm py-8 transition-colors duration-brand ease-brand hover:bg-surface focus-visible:bg-surface motion-reduce:transition-none md:grid-cols-[3rem_1fr_1fr_auto] md:items-center md:gap-8"
            >
              <span aria-hidden="true" className="type-caption font-semibold text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 space-y-3">
                <p lang="en" className="type-body-sm break-words font-medium text-secondary">{englishName}</p>
                <h3 className="type-h3 text-primary">{title}</h3>
              </div>
              <p className="type-body max-w-lg text-muted-foreground">{description}</p>
              <span className="type-body-sm inline-flex min-h-11 items-center gap-2 font-semibold text-secondary">
                了解相關服務
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
