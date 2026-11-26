import { identifyDesignRoute, resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignDetailPageKey, DesignSimplePageKey } from "@/lib/design-collection/types";

/** Presentation-only URL mapping, safe for both server and client consumers. */
export function heritageHref(href: string): string {
  // A declared in-page destination retains its current page and native behavior.
  if (/^#[a-z][a-z0-9-]*$/.test(href)) return href;
  const route = identifyDesignRoute(href);
  if (!route) return href;
  const request = route.pageKey === "collection"
    ? { pageKey: "collection" as const }
    : route.slug === null
      ? { pageKey: route.pageKey as DesignSimplePageKey, styleId: "heritage" as const }
      : { pageKey: route.pageKey as DesignDetailPageKey, styleId: "heritage" as const, slug: route.slug };
  const resolved = resolveDesignHref({ ...request, ...(route.hash ? { hash: route.hash } : {}) });
  if (!resolved) throw new Error(`Unpublished Heritage destination: ${href}`);
  return resolved;
}

export function heritagePageHref(pageKey: DesignSimplePageKey, hash?: string): string {
  const resolved = resolveDesignHref({ pageKey, styleId: "heritage", ...(hash ? { hash } : {}) });
  if (!resolved) throw new Error(`Unpublished Heritage page: ${pageKey}`);
  return resolved;
}

export function heritageDetailHref(pageKey: DesignDetailPageKey, slug: string, hash?: string): string {
  const resolved = resolveDesignHref({ pageKey, styleId: "heritage", slug, ...(hash ? { hash } : {}) });
  if (!resolved) throw new Error(`Unpublished Heritage detail: ${slug}`);
  return resolved;
}
