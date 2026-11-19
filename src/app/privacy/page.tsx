import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { PrivacyPolicy } from "@/components/sections/privacy/privacy-policy";
import { privacyPageMetadata } from "@/config/privacy";
import { siteConfig } from "@/config/site";
import { canRenderPrivacyPolicy, isPrivacyPolicyPublished } from "@/lib/privacy-publication";

async function ensurePrivacyAccess() {
  if (process.env.XK_PAGES_EXPORT !== "1" && !isPrivacyPolicyPublished()) {
    await connection();
  }

  if (!canRenderPrivacyPolicy()) {
    notFound();
  }
}

export async function generateMetadata(): Promise<Metadata> {
  await ensurePrivacyAccess();

  const { title, description, canonical } = privacyPageMetadata;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "zh_TW",
      type: "website",
    },
  };
}

export default async function PrivacyPage() {
  await ensurePrivacyAccess();

  return <PrivacyPolicy />;
}
