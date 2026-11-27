import type { Metadata } from "next";
import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageAbout } from "@/components/design-collection/heritage/heritage-pages";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryAbout } from "@/components/design-collection/luxury/luxury-pages";
import { assertPresentationStyle, presentationPageMetadata } from "@/components/design-collection/shared/style-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return presentationPageMetadata(style, "about");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertPresentationStyle(style);
  return style === "heritage"
    ? <HeritageFrame pageKey="about"><HeritageAbout /></HeritageFrame>
    : <LuxuryFrame pageKey="about"><LuxuryAbout /></LuxuryFrame>;
}
