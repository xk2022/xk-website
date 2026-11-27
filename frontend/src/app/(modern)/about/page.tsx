import type { Metadata } from "next";

import { AboutApproach } from "@/components/sections/about/about-approach";
import { AboutCapabilities } from "@/components/sections/about/about-capabilities";
import { AboutCommitment } from "@/components/sections/about/about-commitment";
import { AboutCta } from "@/components/sections/about/about-cta";
import { AboutFounder } from "@/components/sections/about/about-founder";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutMissionVision } from "@/components/sections/about/about-mission-vision";
import { AboutWhoWeAre } from "@/components/sections/about/about-who-we-are";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/about"), siteConfig);

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutWhoWeAre />
      <AboutMissionVision />
      <AboutCapabilities />
      <AboutApproach />
      <AboutFounder />
      <AboutCommitment />
      <AboutCta />
    </>
  );
}
