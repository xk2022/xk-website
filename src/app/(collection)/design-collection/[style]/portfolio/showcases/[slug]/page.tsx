import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageBrandShowcase } from "@/components/design-collection/heritage/heritage-pages";
import { assertHeritageStyle, heritagePageMetadata } from "@/components/design-collection/heritage/heritage-route";
import { designCollectionRegistry } from "@/config/design-collection";

type PageProps = { params: Promise<{ style: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return designCollectionRegistry.brandShowcaseSlugs.map((slug) => ({ slug }));
}

function checkSlug(slug: string) {
  if (!designCollectionRegistry.brandShowcaseSlugs.some((value) => value === slug)) notFound();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style, slug } = await params;
  assertHeritageStyle(style);
  checkSlug(slug);
  return heritagePageMetadata(style, "brand-showcase", slug);
}

export default async function Page({ params }: PageProps) {
  const { style, slug } = await params;
  assertHeritageStyle(style);
  checkSlug(slug);
  return <HeritageFrame pageKey="brand-showcase" slug={slug}><HeritageBrandShowcase slug={slug} /></HeritageFrame>;
}
