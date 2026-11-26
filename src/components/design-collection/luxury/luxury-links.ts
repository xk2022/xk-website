import { identifyDesignRoute, resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignDetailPageKey, DesignRouteRequest, DesignSimplePageKey } from "@/lib/design-collection/types";

function published(request: DesignRouteRequest): string {
  const href = resolveDesignHref(request);
  if (!href) throw new Error("Luxury content references an unpublished design destination");
  return href;
}

/** Map recognized company pages only; external sites and mail drafts keep their URL. */
export function luxuryHref(href: string): string {
  if (/^#[a-z][a-z0-9-]*$/.test(href)) return href;
  const route = identifyDesignRoute(href);
  if (!route) return href;
  const hash = route.hash ? { hash: route.hash } : {};
  if (route.pageKey === "collection") return published({ pageKey: "collection", ...hash });
  if (route.slug !== null) {
    return published({ pageKey: route.pageKey as DesignDetailPageKey, styleId: "luxury", slug: route.slug, ...hash });
  }
  return published({ pageKey: route.pageKey as DesignSimplePageKey, styleId: "luxury", ...hash });
}

export function luxuryPageHref(pageKey: DesignSimplePageKey, hash?: string): string {
  return published({ pageKey, styleId: "luxury", ...(hash ? { hash } : {}) });
}

export function luxuryDetailHref(pageKey: DesignDetailPageKey, slug: string, hash?: string): string {
  return published({ pageKey, styleId: "luxury", slug, ...(hash ? { hash } : {}) });
}
