import { designCollectionRegistry } from "../../config/design-collection.ts";
import { pagesDeployment } from "../../config/deployment.ts";
import type { DesignAvailability, DesignContentPageKey, DesignPath, DesignRouteDescriptor, DesignRouteRequest, DesignStatus, DesignStyleId } from "./types.ts";

function availability(status: DesignStatus): DesignAvailability {
  return status === "implemented" ? "public" : "planned";
}

function approvedHash(value: unknown, anchors: readonly string[]): { hash: string | null; hashPreserved: boolean } {
  const candidate = typeof value === "string" ? value.replace(/^#/, "") : "";
  const hash = /^[a-z][a-z0-9-]*$/.test(candidate) && anchors.includes(candidate) ? candidate : null;
  return { hash, hashPreserved: hash !== null };
}

/** Describes both known plans and public routes. Only resolveDesignHref publishes links. */
export function describeDesignRoute(request: DesignRouteRequest): DesignRouteDescriptor | null {
  if (!request || typeof request !== "object" || Array.isArray(request)) return null;
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) return null;
  const value = request as unknown as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["pageKey", "styleId", "slug", "hash"].includes(key))) return null;
  if (value.hash !== undefined && typeof value.hash !== "string") return null;

  if (value.pageKey === "collection") {
    if ((value.styleId !== undefined && value.styleId !== null) || "slug" in value) return null;
    return Object.freeze({
      pageKey: "collection", styleId: null, slug: null,
      canonicalPath: designCollectionRegistry.collection.path,
      presentationPath: designCollectionRegistry.collection.path,
      availability: availability(designCollectionRegistry.collection.status),
      ...approvedHash(value.hash, designCollectionRegistry.collectionAnchors),
    });
  }

  const style = designCollectionRegistry.styles.find(({ id }) => id === value.styleId);
  const page = designCollectionRegistry.contentPages.find(({ pageKey }) => pageKey === value.pageKey);
  if (!style || !page) return null;
  let slug: string | null = null;
  if (page.kind === "detail") {
    const slugs: readonly string[] = page.pageKey === "technical-project" ? designCollectionRegistry.technicalProjectSlugs : designCollectionRegistry.brandShowcaseSlugs;
    if (typeof value.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) || !slugs.includes(value.slug)) return null;
    slug = value.slug;
  } else if ("slug" in value) return null;

  const canonicalPath = (slug ? `${page.path}/${slug}` : page.path) as DesignPath;
  const prefix = style.id === "modern" ? "" : `${designCollectionRegistry.namespace}/${style.id}`;
  const presentationPath = `${prefix}${canonicalPath === "/" ? "" : canonicalPath}` || "/";
  const fragment = approvedHash(value.hash, designCollectionRegistry.anchors[style.id][page.pageKey] ?? []);
  const common = { canonicalPath, presentationPath: presentationPath as DesignPath, availability: availability(style.status), ...fragment };
  if (page.kind === "detail" && slug !== null) return Object.freeze({ ...common, pageKey: page.pageKey, styleId: style.id, slug });
  if (page.kind === "simple") return Object.freeze({ ...common, pageKey: page.pageKey, styleId: style.id, slug: null });
  return null;
}

/** No opt-in flag exists for creating links to planned Gallery or styles. */
export function resolveDesignHref(request: DesignRouteRequest): string | null {
  const route = describeDesignRoute(request);
  return route?.availability === "public" ? `${route.presentationPath}${route.hash ? `#${route.hash}` : ""}` : null;
}

function knownRequests(): DesignRouteRequest[] {
  const requests: DesignRouteRequest[] = [{ pageKey: "collection" }];
  for (const { id: styleId } of designCollectionRegistry.styles) {
    for (const page of designCollectionRegistry.contentPages) {
      if (page.pageKey === "technical-project") {
        for (const slug of designCollectionRegistry.technicalProjectSlugs) requests.push({ pageKey: page.pageKey, styleId, slug });
      } else if (page.pageKey === "brand-showcase") {
        for (const slug of designCollectionRegistry.brandShowcaseSlugs) requests.push({ pageKey: page.pageKey, styleId, slug });
      } else requests.push({ pageKey: page.pageKey, styleId });
    }
  }
  return requests;
}

/** Strict reverse lookup; raw paths are checked before URL normalization can hide traversal. */
export function identifyDesignRoute(pathOrHref: string): DesignRouteDescriptor | null {
  if (typeof pathOrHref !== "string" || !pathOrHref || pathOrHref.length > 2048 || /[\s\\?\u0000-\u001f\u007f]/.test(pathOrHref)) return null;
  const separator = pathOrHref.indexOf("#");
  const reference = separator < 0 ? pathOrHref : pathOrHref.slice(0, separator);
  const hash = separator < 0 ? undefined : pathOrHref.slice(separator + 1);
  let path = reference;
  if (/^https?:\/\//.test(reference)) {
    const match = reference.match(/^(https?:\/\/[^/]+)(\/.*)?$/);
    if (!match) return null;
    try {
      const origin = new URL(`${match[1]}/`);
      if (origin.origin !== pagesDeployment.origin || origin.username || origin.password) return null;
    } catch { return null; }
    path = match[2] ?? "/";
  }
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?)?$/.test(path)) return null;
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  for (const request of knownRequests()) {
    const route = describeDesignRoute(request);
    if (route?.presentationPath === normalized) return describeDesignRoute({ ...request, ...(hash === undefined ? {} : { hash }) });
  }
  return null;
}

export function getPublishedDesignRoutes(): readonly DesignRouteDescriptor[] {
  return Object.freeze(knownRequests().flatMap((request) => {
    const route = describeDesignRoute(request);
    return route?.availability === "public" ? [route] : [];
  }));
}

// Re-export the key identities for consumers that only need this module's API.
export type { DesignContentPageKey, DesignStyleId };
