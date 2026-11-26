import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryBrandShowcase } from "@/components/design-collection/luxury/luxury-content-details";
import { assertLuxuryStyle, luxuryPageMetadata } from "@/components/design-collection/luxury/luxury-route";
import { getDesignContent } from "@/lib/design-collection/content";

type PageProps = { params: Promise<{ style: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getDesignContent().portfolio.websiteShowcases.filter((item) => item.kind === "brand-demo" && item.detail && item.href).map(({ id }) => ({ slug: id })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style, slug } = await params;
  return luxuryPageMetadata(style, "brand-showcase", slug);
}
export default async function Page({ params }: PageProps) {
  const { style, slug } = await params;
  assertLuxuryStyle(style);
  if (!(getDesignContent().portfolio.websiteShowcases.some((item) => item.id === slug && item.kind === "brand-demo" && item.detail && item.href))) notFound();
  return <LuxuryFrame pageKey="brand-showcase" slug={slug}><LuxuryBrandShowcase slug={slug} /></LuxuryFrame>;
}
