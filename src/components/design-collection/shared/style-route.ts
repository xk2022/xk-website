import "server-only";
import { notFound } from "next/navigation";
import { createDesignPageMetadata } from "@/lib/design-collection/metadata";
import type { DesignContentPageKey } from "@/lib/design-collection/types";

export function assertPresentationStyle(style: string): asserts style is "heritage" | "luxury" {
  if (style !== "heritage" && style !== "luxury") notFound();
}

export function presentationPageMetadata(style: string, pageKey: DesignContentPageKey, slug?: string) {
  assertPresentationStyle(style);
  const request = pageKey === "technical-project" || pageKey === "brand-showcase"
    ? { styleId: style, pageKey, slug: slug ?? "" } as const
    : { styleId: style, pageKey } as const;
  const metadata = createDesignPageMetadata(request);
  if (!metadata) notFound();
  return metadata;
}
