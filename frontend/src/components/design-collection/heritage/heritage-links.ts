import { resolveDesignContentHref, resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignDetailPageKey, DesignSimplePageKey } from "@/lib/design-collection/types";

/** Shared content mapping keeps all series on the same approved resolver. */
export function heritageHref(href: string): string {
  return resolveDesignContentHref(href, "heritage");
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
