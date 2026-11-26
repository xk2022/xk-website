import type { Metadata } from "next";
import { HeritageFrame } from "@/components/design-collection/heritage/heritage-frame";
import { HeritageQuotation } from "@/components/design-collection/heritage/heritage-quotation";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryQuotation } from "@/components/design-collection/luxury/luxury-quotation";
import { assertPresentationStyle, presentationPageMetadata } from "@/components/design-collection/shared/style-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return presentationPageMetadata(style, "quotation");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertPresentationStyle(style);
  return style === "heritage"
    ? <HeritageFrame pageKey="quotation"><HeritageQuotation /></HeritageFrame>
    : <LuxuryFrame pageKey="quotation"><LuxuryQuotation /></LuxuryFrame>;
}
