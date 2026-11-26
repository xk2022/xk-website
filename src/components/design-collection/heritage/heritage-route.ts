import "server-only";
import { notFound } from "next/navigation";

import { createDesignPageMetadata } from "@/lib/design-collection/metadata";
import type { DesignContentPageKey } from "@/lib/design-collection/types";

export function assertHeritageStyle(style: string): asserts style is "heritage" {
  if (style !== "heritage") notFound();
}

export function heritagePageMetadata(style: string, pageKey: DesignContentPageKey, slug?: string) {
  assertHeritageStyle(style);
  const request = pageKey === "technical-project" || pageKey === "brand-showcase"
    ? { styleId: style, pageKey, slug: slug ?? "" } as const
    : { styleId: style, pageKey } as const;
  const metadata = createDesignPageMetadata(request);
  if (!metadata) notFound();
  return metadata;
}
