import type { Metadata } from "next";

import { ServiceAI } from "@/components/sections/services/service-ai";
import { ServiceCloud } from "@/components/sections/services/service-cloud";
import { ServiceIntegration } from "@/components/sections/services/service-integration";
import { ServiceJava } from "@/components/sections/services/service-java";
import { ServiceWebsite } from "@/components/sections/services/service-website";
import { ServicesCta } from "@/components/sections/services/services-cta";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesIntegration } from "@/components/sections/services/services-integration";
import { ServicesOverview } from "@/components/sections/services/services-overview";
import { ServicesProcess } from "@/components/sections/services/services-process";
import { siteConfig } from "@/config/site";

const title = "服務項目 | Xplore Kaleidoscope";
const description = "探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。";
const url = new URL("/services", siteConfig.url).href;

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

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <ServiceWebsite />
      <ServiceJava />
      <ServiceIntegration />
      <ServiceAI />
      <ServiceCloud />
      <ServicesIntegration />
      <ServicesProcess />
      <ServicesCta />
    </>
  );
}
