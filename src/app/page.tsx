import type { Metadata } from "next";

import { HomeContactCta } from "@/components/sections/home-contact-cta";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeIntroduction } from "@/components/sections/home-introduction";
import { HomeServices } from "@/components/sections/home-services";
import { HomeSolutions } from "@/components/sections/home-solutions";
import { HomeTechnologies } from "@/components/sections/home-technologies";
import { HomeWhyXk } from "@/components/sections/home-why-xk";
import { siteConfig } from "@/config/site";

const title = "Xplore Kaleidoscope | Web, Java & AI Digital Solutions";
const description = "Xplore Kaleidoscope 提供網站開發、Java 企業系統、系統架構整合及 AI 商業應用解決方案，協助企業打造數位價值。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: siteConfig.url },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
  },
};

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
