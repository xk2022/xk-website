import type { Metadata } from "next";

import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageHome } from "@/components/design-collection/heritage/heritage-pages";
import { assertHeritageStyle, heritagePageMetadata } from "@/components/design-collection/heritage/heritage-route";

type PageProps = { params: Promise<{ style: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return heritagePageMetadata(style, "home");
}

export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertHeritageStyle(style);
  return <HeritageFrame pageKey="home"><HeritageHome /></HeritageFrame>;
}
