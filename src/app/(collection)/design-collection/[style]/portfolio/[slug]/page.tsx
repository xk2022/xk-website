import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryTechnicalProject } from "@/components/design-collection/luxury/luxury-content-details";
import { assertLuxuryStyle, luxuryPageMetadata } from "@/components/design-collection/luxury/luxury-route";
import { getDesignContent } from "@/lib/design-collection/content";

type PageProps = { params: Promise<{ style: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getDesignContent().portfolio.projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style, slug } = await params;
  return luxuryPageMetadata(style, "technical-project", slug);
}
export default async function Page({ params }: PageProps) {
  const { style, slug } = await params;
  assertLuxuryStyle(style);
  if (!(getDesignContent().portfolio.projects.some((item) => item.slug === slug))) notFound();
  return <LuxuryFrame pageKey="technical-project" slug={slug}><LuxuryTechnicalProject slug={slug} /></LuxuryFrame>;
}
