import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageTechnicalProject } from "@/components/design-collection/heritage/heritage-pages";
import { assertHeritageStyle, heritagePageMetadata } from "@/components/design-collection/heritage/heritage-route";
import { designCollectionRegistry } from "@/config/design-collection";

type PageProps = { params: Promise<{ style: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return designCollectionRegistry.technicalProjectSlugs.map((slug) => ({ slug }));
}

function checkSlug(slug: string) {
  if (!designCollectionRegistry.technicalProjectSlugs.some((value) => value === slug)) notFound();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style, slug } = await params;
  assertHeritageStyle(style);
  checkSlug(slug);
  return heritagePageMetadata(style, "technical-project", slug);
}

export default async function Page({ params }: PageProps) {
  const { style, slug } = await params;
  assertHeritageStyle(style);
  checkSlug(slug);
  return <HeritageFrame pageKey="technical-project" slug={slug}><HeritageTechnicalProject slug={slug} /></HeritageFrame>;
}
