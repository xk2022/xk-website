import type { Metadata } from "next";

import { PortfolioCta } from "@/components/sections/portfolio/portfolio-cta";
import { PortfolioHero } from "@/components/sections/portfolio/portfolio-hero";
import { PortfolioIntroduction } from "@/components/sections/portfolio/portfolio-introduction";
import { PortfolioProjects } from "@/components/sections/portfolio/portfolio-projects";
import { PortfolioTechnology } from "@/components/sections/portfolio/portfolio-technology";
import { PortfolioTransparency } from "@/components/sections/portfolio/portfolio-transparency";
import { WebsiteShowcaseGallery } from "@/components/sections/portfolio/website-showcase-gallery";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/portfolio"), siteConfig);

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioIntroduction />
      <WebsiteShowcaseGallery />
      <PortfolioProjects />
      <PortfolioTechnology />
      <PortfolioTransparency />
      <PortfolioCta />
    </>
  );
}
