import "server-only";
import { notFound } from "next/navigation";
import { createDesignPageMetadata } from "@/lib/design-collection/metadata";
import type { DesignContentPageKey } from "@/lib/design-collection/types";

export function assertLuxuryStyle(style: string): asserts style is "luxury" {
  if (style !== "luxury") notFound();
}
export function luxuryPageMetadata(style: string, pageKey: DesignContentPageKey, slug?: string) {
  assertLuxuryStyle(style);
  const request = pageKey === "technical-project" || pageKey === "brand-showcase"
    ? { styleId: style, pageKey, slug: slug ?? "" } as const
    : { styleId: style, pageKey } as const;
  const metadata = createDesignPageMetadata(request);
  if (!metadata) notFound();
  return metadata;
}
