import "server-only";

import { designCollectionRegistry } from "../../config/design-collection.ts";
import { getDesignContent } from "./content.ts";
import { getPublishedDesignRoutes, resolveDesignHref } from "./routes.ts";
import type { DesignDirectoryGroup, DesignHeaderItem, DesignNavigationModel } from "./navigation.ts";
import type { DesignContentPageKey, DesignRouteDescriptor, DesignRouteRequest, DesignSimplePageKey, DesignStyleId } from "./types.ts";

const labels = { home: "首頁", about: "關於 XK", services: "服務項目", solutions: "解決方案", portfolio: "作品展示", contact: "聯絡我們", quotation: "方案試算" } as const satisfies Record<DesignSimplePageKey, string>;
const styleNames = { modern: "Modern", heritage: "Heritage", luxury: "Luxury" } as const;

function published(request: DesignRouteRequest): string {
  const href = resolveDesignHref(request);
  if (!href) throw new Error("Navigation requires an approved published route");
  return href;
}
function routeHref(route: DesignRouteDescriptor): string {
  if (route.pageKey === "collection") return published({ pageKey: "collection" });
  return route.slug === null
    ? published({ styleId: route.styleId, pageKey: route.pageKey })
    : published({ styleId: route.styleId, pageKey: route.pageKey, slug: route.slug });
}

/** Only lightweight public route identities/anchors cross the Client boundary. */
export function getDesignNavigationModel(): DesignNavigationModel {
  return {
    styles: designCollectionRegistry.styles.filter(({ status }) => status === "implemented").map(({ id, name }) => ({ id, name, homeHref: published({ styleId: id, pageKey: "home" }) })),
    routes: getPublishedDesignRoutes().map((route) => ({
      path: routeHref(route), styleId: route.styleId, pageKey: route.pageKey, slug: route.slug,
      anchors: route.pageKey === "collection" ? designCollectionRegistry.collectionAnchors : designCollectionRegistry.anchors[route.styleId][route.pageKey] ?? [],
    })),
    collectionHref: published({ pageKey: "collection" }),
  };
}

export function getDesignHeaderItems(styleId: DesignStyleId, currentPageKey?: DesignContentPageKey, keys: readonly DesignSimplePageKey[] = ["home", "about", "services", "solutions", "portfolio", "contact", "quotation"], includeCollection = true): readonly DesignHeaderItem[] {
  const items: DesignHeaderItem[] = keys.map((pageKey) => ({ href: published({ styleId, pageKey }), label: labels[pageKey], pageKey, current: currentPageKey === pageKey }));
  if (includeCollection) items.push({ href: published({ pageKey: "collection" }), label: "設計系列", pageKey: "collection", current: false });
  return items;
}

export function getDesignDirectoryGroups(order: readonly DesignStyleId[]): readonly DesignDirectoryGroup[] {
  const content = getDesignContent();
  const routes = getPublishedDesignRoutes();
  function label(route: DesignRouteDescriptor): string {
    if (route.pageKey === "collection") return "設計系列";
    if (route.pageKey === "technical-project") return `${content.portfolio.projects.find(({ slug }) => slug === route.slug)?.title ?? route.slug}｜技術規劃`;
    if (route.pageKey === "brand-showcase") return `${content.portfolio.websiteShowcases.find(({ id }) => id === route.slug)?.title ?? route.slug}｜作品介紹`;
    return labels[route.pageKey];
  }
  return [...order.map((id) => ({ id, title: `${styleNames[id]} 網站目錄`, entries: routes.filter((route) => route.styleId === id).map((route) => ({ href: routeHref(route), label: label(route) })) })), { id: "collection", title: "設計系列目錄", entries: [{ href: "/", label: "萬花筒共同入口" }, ...routes.filter(({ pageKey }) => pageKey === "collection").map((route) => ({ href: routeHref(route), label: label(route) }))] }];
}
