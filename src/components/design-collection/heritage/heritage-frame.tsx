import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { heritageThemeStyle } from "@/design-systems/heritage";
import { getDesignContent } from "@/lib/design-collection/content";
import { getPublishedDesignRoutes, resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignContentPageKey, DesignRouteDescriptor, DesignSimplePageKey } from "@/lib/design-collection/types";

import { HeritageNavigation, type HeritageNavigationItem } from "./heritage-navigation";
import { HeritageInquiry } from "./heritage-content-shared";

import "@/design-systems/heritage/heritage.css";

const pageLabels = {
  home: "首頁", about: "關於 XK", services: "服務項目", solutions: "解決方案", portfolio: "作品展示", contact: "聯絡我們", quotation: "方案試算",
} as const satisfies Record<DesignSimplePageKey, string>;

function routeLabel(route: DesignRouteDescriptor): string {
  const content = getDesignContent();
  if (route.pageKey === "collection") return "設計系列";
  if (route.pageKey === "technical-project") return `${content.portfolio.projects.find(({ slug }) => slug === route.slug)?.title ?? route.slug}｜技術規劃`;
  if (route.pageKey === "brand-showcase") return `${content.portfolio.websiteShowcases.find(({ id }) => id === route.slug)?.title ?? route.slug}｜作品介紹`;
  return pageLabels[route.pageKey];
}

export function HeritageFrame({ children, pageKey, slug }: Readonly<{ children: ReactNode; pageKey: DesignContentPageKey; slug?: string }>) {
  const { site, contact } = getDesignContent();
  const homeHref = resolveDesignHref({ styleId: "heritage", pageKey: "home" });
  const collectionHref = resolveDesignHref({ pageKey: "collection" });
  if (!homeHref || !collectionHref) throw new Error("Heritage Frame requires its approved public routes");
  const navigation: HeritageNavigationItem[] = (Object.keys(pageLabels) as DesignSimplePageKey[]).flatMap((key) => {
    const href = resolveDesignHref({ styleId: "heritage", pageKey: key });
    return href ? [{ href, label: pageLabels[key], current: key === pageKey }] : [];
  });
  navigation.push({ href: collectionHref, label: "設計系列", current: false });
  const modernHref = pageKey === "technical-project" || pageKey === "brand-showcase"
    ? resolveDesignHref({ styleId: "modern", pageKey, slug: slug ?? "" })
    : resolveDesignHref({ styleId: "modern", pageKey });
  const published = getPublishedDesignRoutes();
  const directories = [
    { id: "heritage", title: "Heritage 網站目錄", routes: published.filter((route) => route.styleId === "heritage") },
    { id: "modern", title: "Modern 網站目錄", routes: published.filter((route) => route.styleId === "modern") },
    { id: "luxury", title: "Luxury 網站目錄", routes: published.filter((route) => route.styleId === "luxury") },
    { id: "collection", title: "設計系列目錄", routes: published.filter((route) => route.pageKey === "collection") },
  ];

  return (
    <div className="heritage-theme" data-design-style="heritage" style={heritageThemeStyle}>
      <a href="#main-content" className="htg-skip-link">跳至主要內容</a>
      <header className="htg-header">
        <div className="htg-container htg-masthead">
          <Link href={homeHref} className="htg-brand-link" aria-label={`${site.name} Heritage 首頁`}>
            <Image src="/brand/source/xk-logo-horizontal.svg" width={850} height={204} alt={site.name} unoptimized className="htg-brand-image" />
          </Link>
          <p className="htg-brand-note"><span lang="en">HERITAGE / XK DESIGN COLLECTION</span>相同品牌內容，編輯式閱讀呈現</p>
        </div>
        <HeritageNavigation items={navigation} />
        <div className="htg-container htg-context-layout"><HeritageInquiry descriptionId="heritage-header-inquiry-note" /><p id="heritage-header-inquiry-note">{contact.action.description}</p></div>
        {modernHref && <div className="htg-context-bar"><div className="htg-container htg-context-layout"><Link href={modernHref} aria-describedby="heritage-style-change-note" className="htg-context-link">查看此頁 Modern 版本</Link><p id="heritage-style-change-note">切換呈現方式會離開本頁；聯絡草稿、稱呼與專案名稱不會攜帶。已保存的試算選項可依原規則還原。</p></div></div>}
      </header>
      <main id="main-content" tabIndex={-1} className="htg-main">{children}</main>
      <footer className="htg-footer">
        <div className="htg-container">
          <div className="htg-footer-introduction"><Link href={homeHref} className="htg-footer-brand" aria-label={`${site.name} Heritage 首頁`}><Image src="/brand/source/xk-logo-white.svg" width={620} height={410} alt={site.name} unoptimized loading="lazy" className="htg-footer-logo" /></Link><div><p lang="en" className="htg-footer-slogan">{site.slogan}</p><p>同一份 XK 品牌、服務與作品資料，以 Heritage 編輯式版面呈現。</p></div></div>
          <div className="htg-footer-directories">{directories.map(({ id, title, routes }) => <nav key={id} aria-labelledby={`heritage-directory-${id}`}><h2 id={`heritage-directory-${id}`}>{title}</h2><ul>{routes.map((route) => <li key={route.presentationPath}><Link href={route.presentationPath}>{routeLabel(route)}</Link></li>)}</ul></nav>)}</div>
          <div className="htg-footer-end"><p lang="en">© {new Date().getFullYear()} {site.name}. All rights reserved.</p><p>隱私權政策：待核准公開</p></div>
        </div>
      </footer>
      <div id="heritage-portal-root" className="htg-portal-root" data-design-portal-container="heritage" />
    </div>
  );
}
