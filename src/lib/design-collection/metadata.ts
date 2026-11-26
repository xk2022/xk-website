import type { Metadata } from "next";

import { designCollectionRegistry } from "../../config/design-collection.ts";
import { getSeoPage, type SeoPage } from "../../config/seo.ts";
import { siteConfig } from "../../config/site.ts";
import { createPageMetadata, getBrandUrl } from "../seo.ts";
import { describeDesignRoute } from "./routes.ts";
import type { DesignAvailability, DesignPath, DesignRouteRequest } from "./types.ts";

export type DesignMetadataContract = Readonly<{
  availability: DesignAvailability;
  canonicalPath: DesignPath;
  presentationPath: DesignPath;
  metadata: Metadata;
}>;

/** Describes a known plan, without adding it to the public SEO registry. */
export function describeDesignMetadata(request: DesignRouteRequest): DesignMetadataContract | null {
  const route = describeDesignRoute(request);
  if (!route) return null;

  let page: SeoPage;
  if (route.pageKey === "collection") {
    page = {
      path: route.presentationPath,
      title: "XK Design Collection | Xplore Kaleidoscope",
      description: "比較 Modern、Heritage 與 Luxury 網站設計系列，了解同一份 XK 品牌內容的不同呈現方向。",
      availability: route.availability === "public" ? "public" : "draft",
    };
  } else {
    const original = getSeoPage(route.canonicalPath);
    const style = designCollectionRegistry.styles.find(({ id }) => id === route.styleId);
    if (!style) return null;
    page = route.styleId === "modern" ? original : {
      ...original,
      path: route.presentationPath,
      title: `${original.title}｜${style.name} 設計展示`,
      description: `${original.description} 本頁為 ${style.name} 設計展示，服務範圍與參考資料不因風格改變。`,
      availability: route.availability === "public" ? "public" : "draft",
    };
  }

  // The existing helper keeps protected robots, truthful OG fields and text-only Twitter.
  const metadata = createPageMetadata(page, siteConfig);
  if (route.canonicalPath !== route.presentationPath) {
    metadata.alternates = { canonical: getBrandUrl(route.canonicalPath, siteConfig.url) };
  }
  return Object.freeze({
    availability: route.availability,
    canonicalPath: route.canonicalPath,
    presentationPath: route.presentationPath,
    metadata,
  });
}

/** Safe future route entry point: planned styles and Gallery never emit public metadata. */
export function createDesignPageMetadata(request: DesignRouteRequest): Metadata | null {
  const contract = describeDesignMetadata(request);
  return contract?.availability === "public" ? contract.metadata : null;
}
