import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { PrivacyPolicy } from "@/components/sections/privacy/privacy-policy";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { canRenderPrivacyPolicy, isPrivacyPolicyPublished } from "@/lib/privacy-publication";
import { createPageMetadata } from "@/lib/seo";

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

  return createPageMetadata(getSeoPage("/privacy"), siteConfig);
}

export default async function PrivacyPage() {
  await ensurePrivacyAccess();

  return <PrivacyPolicy />;
}
