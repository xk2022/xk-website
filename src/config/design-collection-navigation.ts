import { resolveDesignHref } from "@/lib/design-collection/routes";

// Server-rendered directory entry; keep the core out of client header config.
const collectionHref = resolveDesignHref({ pageKey: "collection" });
if (!collectionHref) throw new Error("The implemented Design Collection must have a public route");
export const collectionNavigation = { href: collectionHref, label: "設計系列" } as const;

