import { resolveDesignContentHref, resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignDetailPageKey, DesignRouteRequest, DesignSimplePageKey } from "@/lib/design-collection/types";

function published(request: DesignRouteRequest): string {
  const href = resolveDesignHref(request);
  if (!href) throw new Error("Luxury content references an unpublished design destination");
  return href;
}

/** Shared content mapping keeps all series on the same approved resolver. */
export function luxuryHref(href: string): string {
  return resolveDesignContentHref(href, "luxury");
}

export function luxuryPageHref(pageKey: DesignSimplePageKey, hash?: string): string {
  return published({ pageKey, styleId: "luxury", ...(hash ? { hash } : {}) });
}

export function luxuryDetailHref(pageKey: DesignDetailPageKey, slug: string, hash?: string): string {
  return published({ pageKey, styleId: "luxury", slug, ...(hash ? { hash } : {}) });
}
