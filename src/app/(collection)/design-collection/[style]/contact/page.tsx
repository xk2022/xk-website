import type { Metadata } from "next";
import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageContact } from "@/components/design-collection/heritage/heritage-contact";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryContact } from "@/components/design-collection/luxury/luxury-contact";
import { assertPresentationStyle, presentationPageMetadata } from "@/components/design-collection/shared/style-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return presentationPageMetadata(style, "contact");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertPresentationStyle(style);
  return style === "heritage"
    ? <HeritageFrame pageKey="contact"><HeritageContact /></HeritageFrame>
    : <LuxuryFrame pageKey="contact"><LuxuryContact /></LuxuryFrame>;
}
