import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { InquiryButton } from "@/components/layout/inquiry-button";
import { luxuryThemeStyle } from "@/design-systems/luxury";
import { getDesignContent } from "@/lib/design-collection/content";
import { getPublishedDesignRoutes, resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignContentPageKey, DesignRouteDescriptor, DesignSimplePageKey } from "@/lib/design-collection/types";

import { LuxuryNavigation, type LuxuryNavigationItem } from "./luxury-navigation";

import "@/design-systems/luxury/luxury.css";

const pageLabels = {
  home: "首頁", about: "關於 XK", services: "服務項目", solutions: "解決方案", portfolio: "作品展示", contact: "聯絡我們", quotation: "方案試算",
} as const satisfies Record<DesignSimplePageKey, string>;

function directoryLabel(route: DesignRouteDescriptor): string {
  const content = getDesignContent();
  if (route.pageKey === "collection") return "設計系列";
  if (route.pageKey === "brand-showcase") return `${content.portfolio.websiteShowcases.find(({ id }) => id === route.slug)?.title ?? route.slug}｜作品介紹`;
  if (route.pageKey === "technical-project") return `${content.portfolio.projects.find(({ slug }) => slug === route.slug)?.title ?? route.slug}｜技術規劃`;
  return pageLabels[route.pageKey];
}

export function LuxuryFrame({ children, pageKey, slug }: Readonly<{ children: ReactNode; pageKey: DesignContentPageKey; slug?: string }>) {
  const { site, contact } = getDesignContent();
  const home = resolveDesignHref({ styleId: "luxury", pageKey: "home" });
  const collection = resolveDesignHref({ pageKey: "collection" });
  if (!home || !collection) throw new Error("Luxury Frame requires its approved public routes");
  const items: LuxuryNavigationItem[] = (Object.keys(pageLabels) as DesignSimplePageKey[]).flatMap((key) => {
    const href = resolveDesignHref({ styleId: "luxury", pageKey: key });
    return href ? [{ href, label: pageLabels[key], current: pageKey === key }] : [];
  });
  items.push({ href: collection, label: "設計系列", current: false });
  const modern = pageKey === "brand-showcase" || pageKey === "technical-project"
    ? resolveDesignHref({ styleId: "modern", pageKey, slug: slug ?? "" })
    : resolveDesignHref({ styleId: "modern", pageKey });
  const routes = getPublishedDesignRoutes();
  const groups = [
    { id: "luxury", name: "Luxury 網站目錄", entries: routes.filter((route) => route.styleId === "luxury") },
    { id: "modern", name: "Modern 網站目錄", entries: routes.filter((route) => route.styleId === "modern") },
    { id: "collection", name: "設計系列", entries: routes.filter((route) => route.pageKey === "collection") },
  ];

  return (
    <div className="lx-theme" data-design-style="luxury" style={luxuryThemeStyle}>
      <a href="#main-content" className="lx-skip">跳至主要內容</a>
      <header className="lx-header">
        <div className="lx-container lx-header-brand-row">
          <Link href={home} className="lx-brand" aria-label={`${site.name} Luxury 首頁`}><Image src="/brand/source/xk-logo-horizontal.svg" alt={site.name} width={850} height={204} unoptimized className="lx-brand-image" /></Link>
          <p className="lx-header-series" lang="en">LUXURY / XK DESIGN COLLECTION</p>
          <InquiryButton size="sm" className="lx-header-inquiry" descriptionId="luxury-inquiry-note" />
        </div>
        <div className="lx-container"><LuxuryNavigation items={items} /></div>
        <div className="lx-header-context"><div className="lx-container lx-header-context-row"><div>{modern && <Link id="luxury-modern-return" href={modern} aria-describedby="luxury-style-note">查看此頁 Modern 版本</Link>}<p id="luxury-style-note">切換設計系列會清除本頁聯絡草稿、客戶稱呼與專案名稱；已保存的試算選項仍依原規則還原。</p></div><p id="luxury-inquiry-note">{contact.action.description}</p></div></div>
      </header>
      <main id="main-content" tabIndex={-1} className="lx-main">{children}</main>
      <footer className="lx-footer">
        <div className="lx-container">
          <div className="lx-footer-intro"><Link href={home} className="lx-footer-brand" aria-label={`${site.name} Luxury 首頁`}><Image src="/brand/source/xk-logo-white.svg" alt={site.name} width={620} height={410} unoptimized loading="lazy" className="lx-footer-logo" /></Link><p lang="en" className="lx-footer-slogan">{site.slogan}</p></div>
          <div className="lx-footer-directory">{groups.map(({ id, name, entries }) => <nav key={id} aria-labelledby={`luxury-directory-${id}`}><h2 id={`luxury-directory-${id}`}>{name}</h2><ul>{entries.map((route) => <li key={route.presentationPath}><Link href={route.presentationPath}>{directoryLabel(route)}</Link></li>)}</ul></nav>)}</div>
          <div className="lx-footer-end"><p lang="en">© {new Date().getFullYear()} {site.name}. All rights reserved.</p><p>隱私權政策：待核准公開</p></div>
        </div>
      </footer>
      <div id="luxury-portal-root" className="lx-portal-root" data-design-portal-container="luxury" />
    </div>
  );
}
