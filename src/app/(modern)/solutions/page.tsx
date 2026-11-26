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
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/solutions"), siteConfig);

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
