import type { Metadata } from "next";

import { AboutApproach } from "@/components/sections/about/about-approach";
import { AboutCapabilities } from "@/components/sections/about/about-capabilities";
import { AboutCommitment } from "@/components/sections/about/about-commitment";
import { AboutCta } from "@/components/sections/about/about-cta";
import { AboutFounder } from "@/components/sections/about/about-founder";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutMissionVision } from "@/components/sections/about/about-mission-vision";
import { AboutWhoWeAre } from "@/components/sections/about/about-who-we-are";
import { siteConfig } from "@/config/site";

const title = "關於 XK | Xplore Kaleidoscope";
const description = "認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。";
const url = new URL("/about", siteConfig.url).href;

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
