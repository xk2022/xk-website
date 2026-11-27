import type { Metadata } from "next";

import { HomeContactCta } from "@/components/sections/home-contact-cta";
import { HomeFeaturedShowcases } from "@/components/sections/home-featured-showcases";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeIntroduction } from "@/components/sections/home-introduction";
import { HomeServices } from "@/components/sections/home-services";
import { HomeSolutions } from "@/components/sections/home-solutions";
import { HomeTechnologies } from "@/components/sections/home-technologies";
import { HomeWhyXk } from "@/components/sections/home-why-xk";
import { ServicePlans } from "@/components/sections/service-plans";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/modern"), siteConfig);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntroduction />
      <HomeServices />
      <ServicePlans variant="home" />
      <HomeFeaturedShowcases />
      <HomeTechnologies />
      <HomeWhyXk />
      <HomeSolutions />
      <HomeContactCta />
    </>
  );
}
