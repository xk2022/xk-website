import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageBrandShowcase } from "@/components/design-collection/heritage/heritage-content-details";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryBrandShowcase } from "@/components/design-collection/luxury/luxury-content-details";
import { assertPresentationStyle, presentationPageMetadata } from "@/components/design-collection/shared/style-route";
import { getDesignContent } from "@/lib/design-collection/content";

type PageProps = { params: Promise<{ style: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getDesignContent().portfolio.websiteShowcases.filter((item) => item.kind === "brand-demo" && item.detail && item.href).map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style, slug } = await params;
  return presentationPageMetadata(style, "brand-showcase", slug);
}
export default async function Page({ params }: PageProps) {
  const { style, slug } = await params;
  assertPresentationStyle(style);
  if (!getDesignContent().portfolio.websiteShowcases.some((item) => item.id === slug && (item.kind === "brand-demo" && item.detail && item.href))) notFound();
  return style === "heritage"
    ? <HeritageFrame pageKey="brand-showcase" slug={slug}><HeritageBrandShowcase slug={slug} /></HeritageFrame>
    : <LuxuryFrame pageKey="brand-showcase" slug={slug}><LuxuryBrandShowcase slug={slug} /></LuxuryFrame>;
}
