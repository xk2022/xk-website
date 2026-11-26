import type { Metadata } from "next";
import { LuxuryFrame } from "@/components/design-collection/luxury/luxury-frame";
import { LuxuryContact } from "@/components/design-collection/luxury/luxury-contact";
import { assertLuxuryStyle, luxuryPageMetadata } from "@/components/design-collection/luxury/luxury-route";

type PageProps = { params: Promise<{ style: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params;
  return luxuryPageMetadata(style, "contact");
}
export default async function Page({ params }: PageProps) {
  const { style } = await params;
  assertLuxuryStyle(style);
  return <LuxuryFrame pageKey="contact"><LuxuryContact /></LuxuryFrame>;
}
