import type { DesignPageKey, DesignSimplePageKey, DesignStyleId } from "./types.ts";

export type DesignNavigationRoute = Readonly<{
  path: string;
  styleId: DesignStyleId | null;
  pageKey: DesignPageKey;
  slug: string | null;
  anchors: readonly string[];
}>;
export type DesignNavigationModel = Readonly<{
  styles: readonly Readonly<{ id: DesignStyleId; name: string; homeHref: string }>[];
  routes: readonly DesignNavigationRoute[];
  collectionHref: string;
}>;
export type DesignHeaderItem = Readonly<{ href: string; label: string; current: boolean; pageKey: DesignSimplePageKey | "collection" }>;
export type DesignDirectoryGroup = Readonly<{ id: string; title: string; entries: readonly Readonly<{ href: string; label: string }>[] }>;
export type StyleSwitchDestination = Readonly<{
  styleId: DesignStyleId;
  name: string;
  href: string;
  current: boolean;
  fallback: boolean;
  reason: "same-content" | "gallery" | "unknown-page" | "missing-counterpart";
  hashPreserved: boolean;
}>;

/** Match approved paths before any URL normalization could conceal traversal. */
export function normalizeDesignPathname(pathname: string): string | null {
  if (typeof pathname !== "string" || pathname.length > 2048 || /[\s\\\u0000-\u001f\u007f?#]/.test(pathname) || !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?)?$/.test(pathname)) return null;
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

/** Pure client-safe decision over a server-built publication model; no storage or business imports. */
export function resolveStyleSwitch(model: DesignNavigationModel, pathname: string, hash: string, targetStyleId: DesignStyleId): StyleSwitchDestination | null {
  const style = model.styles.find(({ id }) => id === targetStyleId);
  if (!style) return null;
  const normalized = normalizeDesignPathname(pathname);
  const source = normalized ? model.routes.find(({ path }) => path === normalized) : undefined;
  const counterpart = source && source.pageKey !== "collection"
    ? model.routes.find((route) => route.styleId === targetStyleId && route.pageKey === source.pageKey && route.slug === source.slug)
    : undefined;
  const home = model.routes.find((route) => route.styleId === targetStyleId && route.pageKey === "home");
  if (!counterpart && !home) return null;
  const target = counterpart ?? home!;
  const candidate = typeof hash === "string" ? hash.replace(/^#/, "") : "";
  const hashPreserved = Boolean(counterpart && source && /^[a-z][a-z0-9-]*$/.test(candidate) && source.anchors.includes(candidate) && target.anchors.includes(candidate));
  return {
    styleId: style.id,
    name: style.name,
    href: `${target.path}${hashPreserved ? `#${candidate}` : ""}`,
    current: Boolean(counterpart && source?.styleId === targetStyleId),
    fallback: !counterpart,
    reason: counterpart ? "same-content" : source?.pageKey === "collection" ? "gallery" : source ? "missing-counterpart" : "unknown-page",
    hashPreserved,
  };
}
