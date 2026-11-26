import type { Metadata } from "next";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryAbout } from "@/components/design-collection/luxury/luxury-pages";
import { assertLuxuryStyle, luxuryPageMetadata } from "@/components/design-collection/luxury/luxury-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return luxuryPageMetadata(style, "about");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertLuxuryStyle(style);
  return <LuxuryFrame pageKey="about"><LuxuryAbout /></LuxuryFrame>;
}
