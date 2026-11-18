import type { Metadata } from "next";

import { HomeIntro } from "@/components/sections/home-intro";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: "/",
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeIntro />;
}
