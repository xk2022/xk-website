import type { Metadata } from "next";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryQuotation } from "@/components/design-collection/luxury/luxury-quotation";
import { assertLuxuryStyle, luxuryPageMetadata } from "@/components/design-collection/luxury/luxury-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return luxuryPageMetadata(style, "quotation");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertLuxuryStyle(style);
  return <LuxuryFrame pageKey="quotation"><LuxuryQuotation /></LuxuryFrame>;
}
