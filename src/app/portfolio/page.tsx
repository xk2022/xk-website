import type { Metadata } from "next";

import { PortfolioCta } from "@/components/sections/portfolio/portfolio-cta";
import { PortfolioHero } from "@/components/sections/portfolio/portfolio-hero";
import { PortfolioIntroduction } from "@/components/sections/portfolio/portfolio-introduction";
import { PortfolioProjects } from "@/components/sections/portfolio/portfolio-projects";
import { PortfolioTechnology } from "@/components/sections/portfolio/portfolio-technology";
import { PortfolioTransparency } from "@/components/sections/portfolio/portfolio-transparency";
import { siteConfig } from "@/config/site";

const title = "技術作品集 | Xplore Kaleidoscope";
const description = "探索 XK 的網站、Java 企業系統與 API 整合展示規劃，了解各專案的背景、技術方向與實際開發狀態。";
const url = new URL("/portfolio", siteConfig.url).href;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: { title, description, url, siteName: siteConfig.name, locale: "zh_TW", type: "website" },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioIntroduction />
      <PortfolioProjects />
      <PortfolioTechnology />
      <PortfolioTransparency />
      <PortfolioCta />
    </>
  );
}
