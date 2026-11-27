import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WebsiteShowcaseDetail } from "@/components/sections/portfolio/website-showcase-detail";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { brandWebsiteShowcases, getBrandShowcase, showcaseDetailPath } from "@/config/website-showcases";
import { createPageMetadata } from "@/lib/seo";

type ShowcasePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return brandWebsiteShowcases.flatMap((showcase) => getBrandShowcase(showcase.id) ? [{ slug: showcase.id }] : []);
}

function getShowcase(slug: string) {
  const showcase = getBrandShowcase(slug);
  if (!showcase) notFound();
  return showcase;
}

export async function generateMetadata({ params }: ShowcasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const showcase = getShowcase(slug);
  return createPageMetadata(getSeoPage(showcaseDetailPath(showcase.id)), siteConfig);
}

export default async function PortfolioShowcasePage({ params }: ShowcasePageProps) {
  const { slug } = await params;
  return <WebsiteShowcaseDetail showcase={getShowcase(slug)} />;
}
