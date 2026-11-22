import { BrandPattern } from "@/components/brand/brand-pattern";
import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { aboutPage, founderProfile } from "@/config/about";

export function AboutFounder() {
  return (
    <Section id="founder" background="primary" aria-labelledby="founder-title" className="scroll-mt-8">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-primary-foreground/20" aria-hidden="true">
          <BrandPattern variant="grid" />
          <BrandPattern variant="gradient" />
          <div className="relative border-y border-primary-foreground/20 px-6 py-8 sm:px-12">
            <XkLogo size={192} showWordmark={false} variant="white" decorative />
          </div>
        </div>
        <div className="min-w-0">
          <p lang="en" className="type-caption mb-4 text-primary-foreground/75">{aboutPage.engineeringApproach.eyebrow}</p>
          <h2 id="founder-title" className="type-h2">{aboutPage.engineeringApproach.title}</h2>
          <p className="type-body mt-6 text-primary-foreground/85">{aboutPage.engineeringApproach.introduction}</p>
          <p className="type-body mt-4 text-primary-foreground/75">{aboutPage.engineeringApproach.description}</p>
          <h3 className="type-body mt-8 font-semibold">專注領域</h3>
          <ul lang="en" className="type-body-sm mt-4 flex flex-wrap gap-2 text-primary-foreground/90">
            {founderProfile.focusAreas.map((area) => <li key={area} className="max-w-full rounded-full border border-primary-foreground/20 px-4 py-2 break-words">{area}</li>)}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
