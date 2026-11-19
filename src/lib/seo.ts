import type { Metadata, MetadataRoute } from "next";

import type { SeoPage } from "../config/seo";

type SeoBrand = Readonly<{ name: string; url: string }>;

export function getBrandUrl(path: string, origin: string): string {
  const brand = new URL(origin);
  if (brand.protocol !== "https:" || (origin !== brand.origin && origin !== `${brand.origin}/`)) {
    throw new Error("SEO requires a plain HTTPS brand origin");
  }
  if (path !== "/" && !/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?$/.test(path)) {
    throw new Error("SEO requires a route path without query or fragment");
  }

  const pathname = path === "/" ? path : path.replace(/\/$/, "");
  return new URL(pathname, brand.origin).href;
}

/** Protection is intentional and cannot be disabled by an environment variable. */
export function createPageMetadata(page: SeoPage, brand: SeoBrand): Metadata {
  const { title, description } = page;
  const url = getBrandUrl(page.path, brand.url);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name,
      locale: "zh_TW",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export function createRobotsMetadata(basePath: string, pages: readonly SeoPage[]): MetadataRoute.Robots {
  const prefix = basePath.replace(/\/$/, "");
  if ((prefix && !/^(\/[A-Za-z0-9._~-]+)*$/.test(prefix)) || prefix.split("/").some((segment) => segment === "." || segment === "..")) {
    throw new Error("Invalid robots Base Path");
  }

  return {
    rules: {
      userAgent: "*",
      // Crawling public HTML lets crawlers read its noindex; this does not permit indexing.
      allow: `${prefix}/`,
      disallow: [`${prefix}/dev/`, ...pages.filter((page) => page.availability === "draft").map((page) => `${prefix}${page.path}`)],
    },
  };
}

export function createWebsiteJsonLd(brand: SeoBrand & Readonly<{ locale: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: getBrandUrl("/", brand.url),
    inLanguage: brand.locale,
  } as const;
}

export function serializeJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
