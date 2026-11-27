import "@/components/sections/quotation/quotation.css";

import { QuotationEstimator } from "@/components/sections/quotation/quotation-estimator";
import { getDesignContent } from "@/lib/design-collection/content";
import { createDesignInteractionScope } from "@/lib/design-collection/interactions";

import { heritageHref } from "./heritage-links";

/** Same controller, selection store, calculations and standard A4 in a Heritage recipe. */
export function HeritageQuotation() {
  const { quotation } = getDesignContent();
  const scope = createDesignInteractionScope("heritage", "quotation");
  // Resolve public presentation routes on the server without shipping the core
  // content/route registries into the shared Modern client bundle.
  const hrefMap = Object.fromEntries([
    "/contact", "/contact#contact-channels", "/portfolio",
    ...quotation.catalog.builds.flatMap((build) => [build.serviceLink.href, ...(build.showcase ? [build.showcase.href] : [])]),
  ].map((href) => [href, heritageHref(href)]));

  return (
    <div data-heritage-interaction="quotation" data-quotation-page="true" className="htg-quotation quotation-root">
      <div className="htg-container quotation-screen-only">
        <p className="htg-contact-note">切換設計系列或離開本頁時，客戶稱呼與專案名稱會清除，不會帶往 Modern 或其他頁面；方案選項仍只依原有設定保留 ID。列印使用共用的標準 A4 摘要。</p>
      </div>
      <QuotationEstimator key={scope.remountKey} styleId="heritage" catalog={quotation.catalog} hrefMap={hrefMap} />
    </div>
  );
}
