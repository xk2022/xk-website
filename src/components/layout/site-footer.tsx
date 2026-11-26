import Link from "next/link";

import { XkLogo } from "@/components/brand/xk-logo";
import { Container } from "@/components/layout/container";
import { services } from "@/config/homepage";
import { portfolioProjects } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { brandWebsiteShowcases } from "@/config/website-showcases";
import { getPublishedDesignRoutes } from "@/lib/design-collection/routes";
import type { DesignRouteDescriptor } from "@/lib/design-collection/types";
import { isPrivacyPolicyPublished } from "@/lib/privacy-publication";

const footerLinkStyles =
  "inline-flex min-h-11 items-center rounded-sm text-primary-foreground/80 transition-colors duration-brand ease-brand hover:text-primary-foreground motion-reduce:transition-none";

function designRouteLabel(route: DesignRouteDescriptor): string {
  if (route.pageKey === "technical-project") return `${portfolioProjects.find((item) => item.slug === route.slug)?.title ?? route.slug}｜技術規劃`;
  if (route.pageKey === "brand-showcase") return `${brandWebsiteShowcases.find((item) => item.id === route.slug)?.title ?? route.slug}｜作品介紹`;
  const labels = { home: "首頁", about: "關於 XK", services: "服務項目", solutions: "解決方案", portfolio: "作品展示", contact: "聯絡我們", quotation: "方案試算", collection: "設計系列" };
  return labels[route.pageKey];
}

export function SiteFooter() {
  const published = getPublishedDesignRoutes();
  const modernRoutes = published.filter(({ styleId }) => styleId === "modern");
  const presentationDirectories = [
    { id: "heritage", title: "Heritage 網站目錄", routes: published.filter(({ styleId }) => styleId === "heritage") },
    { id: "luxury", title: "Luxury 網站目錄", routes: published.filter(({ styleId }) => styleId === "luxury") },
    { id: "collection", title: "設計系列目錄", routes: published.filter(({ pageKey }) => pageKey === "collection") },
  ];

  return (
    <footer className="bg-primary text-primary-foreground [&_a:focus-visible]:outline-primary-foreground">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr] lg:gap-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex min-h-11 max-w-full items-center gap-3 rounded-sm">
              <XkLogo size={48} variant="white" showWordmark={false} decorative />
              <span lang="en" className="type-body font-semibold">{siteConfig.name}</span>
              <span className="sr-only">首頁，Logo 為暫定版本</span>
            </Link>
            <p lang="en" className="type-body-lg mt-5 max-w-xs text-primary-foreground/90">{siteConfig.slogan}</p>
            <p className="type-body-sm mt-5 max-w-xs text-primary-foreground/75">整合 Web、Java 與 AI 技術，探索企業的數位可能。</p>
          </div>

          <nav aria-label="頁尾導覽">
            <h2 className="type-body mb-4 font-semibold">Modern 網站目錄</h2>
            <ul className="type-body-sm space-y-1">
              {modernRoutes.map((route) => <li key={route.presentationPath}><Link href={route.presentationPath} className={`${footerLinkStyles} max-w-full break-words`}>{designRouteLabel(route)}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="服務分類">
            <h2 className="type-body mb-4 font-semibold">服務分類</h2>
            <ul className="type-body-sm space-y-1">
              {services.map((service) => <li key={service.id}><Link href={`/#service-${service.anchor}`} className={footerLinkStyles}>{service.name}</Link></li>)}
            </ul>
          </nav>

          <div className="grid min-w-0 gap-10 sm:col-span-2 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
            {presentationDirectories.map(({ id, title, routes }) => (
              <nav key={id} aria-labelledby={`site-directory-${id}`} className="min-w-0">
                <h2 id={`site-directory-${id}`} className="type-body mb-4 font-semibold">{title}</h2>
                <ul className="type-body-sm space-y-1">
                  {routes.map((route) => <li key={route.presentationPath} className="min-w-0"><Link href={route.presentationPath} className={`${footerLinkStyles} max-w-full break-words`}>{designRouteLabel(route)}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="type-body-sm mt-12 flex flex-col gap-4 border-t border-primary-foreground/20 pt-6 text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p lang="en">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          {isPrivacyPolicyPublished() ? <Link href="/privacy" className={footerLinkStyles}>隱私權政策</Link> : <p>隱私權政策（待確認）</p>}
        </div>
      </Container>
    </footer>
  );
}
