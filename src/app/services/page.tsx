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
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/services"), siteConfig);

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
