import type { Metadata } from "next";

import { SolutionsApproach } from "@/components/sections/solutions/solutions-approach";
import { SolutionsChallenges } from "@/components/sections/solutions/solutions-challenges";
import { SolutionsCombinations } from "@/components/sections/solutions/solutions-combinations";
import { SolutionsCta } from "@/components/sections/solutions/solutions-cta";
import { SolutionsDetails } from "@/components/sections/solutions/solutions-details";
import { SolutionsHero } from "@/components/sections/solutions/solutions-hero";
import { SolutionsOverview } from "@/components/sections/solutions/solutions-overview";
import { SolutionsTechnology } from "@/components/sections/solutions/solutions-technology";
import { SolutionsValue } from "@/components/sections/solutions/solutions-value";
import { siteConfig } from "@/config/site";

const title = "解決方案 | Xplore Kaleidoscope";
const description = "探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。";
const url = new URL("/solutions", siteConfig.url).href;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsChallenges />
      <SolutionsOverview />
      <SolutionsDetails />
      <SolutionsTechnology />
      <SolutionsCombinations />
      <SolutionsApproach />
      <SolutionsValue />
      <SolutionsCta />
    </>
  );
}
