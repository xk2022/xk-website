import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrandPattern } from "@/components/brand/brand-pattern";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { contactPage } from "@/config/contact-page";

export function ContactCta() {
  const { cta } = contactPage;

  return (
    <Section id="contact-next-step" aria-labelledby="contact-next-step-title" className="relative overflow-hidden">
      <BrandPattern variant="gradient" />
      <Container className="relative min-w-0">
        <p lang="en" className="type-caption mb-4 font-semibold text-secondary">EXPLORE XK</p>
        <h2 id="contact-next-step-title" className="type-h2 text-primary">{cta.title}</h2>
        <p className="type-body-lg mt-5 max-w-3xl text-muted-foreground">{cta.description}</p>
        <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
          {cta.links.map((link, index) => (
            <Button key={link.href} asChild size="lg" variant={index === 0 ? "default" : index === 1 ? "outline" : "ghost"}>
              <Link href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>
            </Button>
          ))}
        </div>
      </Container>
    </Section>
  );
}
