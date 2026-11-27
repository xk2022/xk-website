import "@/components/sections/quotation/quotation.css";

import { QuotationEstimator } from "@/components/sections/quotation/quotation-estimator";
import { getDesignContent } from "@/lib/design-collection/content";
import { createDesignInteractionScope } from "@/lib/design-collection/interactions";

import { luxuryHref } from "./luxury-links";

/** Reuse the approved estimator; presentation links are resolved on the server. */
export function LuxuryQuotation() {
  const { quotation } = getDesignContent();
  const scope = createDesignInteractionScope("luxury", "quotation");
  const destinations = ["/contact", "/contact#contact-channels", "/portfolio"];
  for (const build of quotation.catalog.builds) {
    destinations.push(build.serviceLink.href);
    if (build.showcase) destinations.push(build.showcase.href);
  }
  const hrefMap = Object.fromEntries(destinations.map((href) => [href, luxuryHref(href)]));

  return (
    <div className="lx-quotation quotation-root" data-luxury-interaction="quotation" data-quotation-page="true">
      <div className="lx-container quotation-screen-only">
        <p className="lx-note">客戶稱呼與專案名稱只留在目前頁面。切換至 Modern、其他設計系列或離開後，個人欄位會清除；方案選項仍依原設定只還原 ID。列印使用相同的標準 A4 摘要。</p>
      </div>
      <QuotationEstimator key={scope.remountKey} styleId="luxury" catalog={quotation.catalog} hrefMap={hrefMap} />
    </div>
  );
}
