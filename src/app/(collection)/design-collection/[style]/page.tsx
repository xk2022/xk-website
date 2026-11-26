import type { Metadata } from "next";
import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageHome } from "@/components/design-collection/heritage/heritage-pages";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryHome } from "@/components/design-collection/luxury/luxury-pages";
import { assertPresentationStyle, presentationPageMetadata } from "@/components/design-collection/shared/style-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return presentationPageMetadata(style, "home");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertPresentationStyle(style);
  return style === "heritage"
    ? <HeritageFrame pageKey="home"><HeritageHome /></HeritageFrame>
    : <LuxuryFrame pageKey="home"><LuxuryHome /></LuxuryFrame>;
}
