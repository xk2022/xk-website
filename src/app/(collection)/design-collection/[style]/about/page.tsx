import type { Metadata } from "next";

import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageAbout } from "@/components/design-collection/heritage/heritage-pages";
import { assertHeritageStyle, heritagePageMetadata } from "@/components/design-collection/heritage/heritage-route";

type PageProps = { params: Promise<{ style: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return heritagePageMetadata(style, "about");
}

export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertHeritageStyle(style);
  return <HeritageFrame pageKey="about"><HeritageAbout /></HeritageFrame>;
}
