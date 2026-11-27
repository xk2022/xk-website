import type { Metadata } from "next";

import "@/components/sections/quotation/quotation.css";

import { QuotationEstimator } from "@/components/sections/quotation/quotation-estimator";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(getSeoPage("/quotation"), siteConfig);

export default function QuotationPage() {
  return <div data-quotation-page="true" className="quotation-root"><QuotationEstimator /></div>;
}
