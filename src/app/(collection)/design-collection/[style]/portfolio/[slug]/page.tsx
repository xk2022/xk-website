import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageTechnicalProject } from "@/components/design-collection/heritage/heritage-content-details";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryTechnicalProject } from "@/components/design-collection/luxury/luxury-content-details";
import { assertPresentationStyle, presentationPageMetadata } from "@/components/design-collection/shared/style-route";
import { getDesignContent } from "@/lib/design-collection/content";

type PageProps = { params: Promise<{ style: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getDesignContent().portfolio.projects.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style, slug } = await params;
  return presentationPageMetadata(style, "technical-project", slug);
}
export default async function Page({ params }: PageProps) {
  const { style, slug } = await params;
  assertPresentationStyle(style);
  if (!getDesignContent().portfolio.projects.some((item) => item.slug === slug)) notFound();
  return style === "heritage"
    ? <HeritageFrame pageKey="technical-project" slug={slug}><HeritageTechnicalProject slug={slug} /></HeritageFrame>
    : <LuxuryFrame pageKey="technical-project" slug={slug}><LuxuryTechnicalProject slug={slug} /></LuxuryFrame>;
}
