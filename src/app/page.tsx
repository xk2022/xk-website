import type { Metadata } from "next";

import { HomeContactCta } from "@/components/sections/home-contact-cta";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeIntroduction } from "@/components/sections/home-introduction";
import { HomeServices } from "@/components/sections/home-services";
import { HomeSolutions } from "@/components/sections/home-solutions";
import { HomeTechnologies } from "@/components/sections/home-technologies";
import { HomeWhyXk } from "@/components/sections/home-why-xk";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/"), siteConfig);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntroduction />
      <HomeServices />
      <HomeTechnologies />
      <HomeWhyXk />
      <HomeSolutions />
      <HomeContactCta />
    </>
  );
}
