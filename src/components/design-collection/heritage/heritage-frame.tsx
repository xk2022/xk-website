import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { StyleSwitcher } from "@/components/design-collection/shared/style-switcher";
import { heritageThemeStyle } from "@/design-systems/heritage";
import { getDesignContent } from "@/lib/design-collection/content";
import { getDesignDirectoryGroups, getDesignHeaderItems, getDesignNavigationModel } from "@/lib/design-collection/navigation-model";
import type { DesignContentPageKey } from "@/lib/design-collection/types";

import { HeritageNavigation } from "./heritage-navigation";
import { HeritageInquiry } from "./heritage-content-shared";

import "@/design-systems/heritage/heritage.css";

export function HeritageFrame({ children, pageKey }: Readonly<{ children: ReactNode; pageKey: DesignContentPageKey; slug?: string }>) {
  const { site, contact } = getDesignContent();
  const homeHref = getDesignNavigationModel().styles.find(({ id }) => id === "heritage")?.homeHref;
  if (!homeHref) throw new Error("Heritage navigation requires its published homepage");
  const navigation = getDesignHeaderItems("heritage", pageKey);
  const directories = getDesignDirectoryGroups(["heritage", "modern", "luxury"]);

  return (
    <div className="heritage-theme" data-design-style="heritage" style={heritageThemeStyle}>
      <a href="#main-content" className="htg-skip-link">跳至主要內容</a>
      <header className="htg-header">
        <div className="htg-container htg-masthead">
          <Link href={homeHref} className="htg-brand-link" aria-label={`${site.name} Heritage 首頁`}>
            <Image src="/brand/source/v2/xk-logo-dark.svg" width={2198} height={480} alt={site.name} unoptimized className="htg-brand-image" />
          </Link>
          <p className="htg-brand-note"><span lang="en">HERITAGE / XK DESIGN COLLECTION</span>相同品牌內容，編輯式閱讀呈現</p>
        </div>
        <HeritageNavigation items={navigation} />
        <div className="htg-container htg-context-layout"><HeritageInquiry descriptionId="heritage-header-inquiry-note" /><p id="heritage-header-inquiry-note">{contact.action.description}</p></div>
      </header>
      <StyleSwitcher />
      <main id="main-content" tabIndex={-1} className="htg-main">{children}</main>
      <footer className="htg-footer">
        <div className="htg-container">
          <div className="htg-footer-introduction"><Link href={homeHref} className="htg-footer-brand" aria-label={`${site.name} Heritage 首頁`}><Image src="/brand/source/v2/xk-logo-white.svg" width={2198} height={480} alt={site.name} unoptimized loading="lazy" className="htg-footer-logo" /></Link><div><p lang="en" className="htg-footer-slogan">{site.slogan}</p><p>同一份 XK 品牌、服務與作品資料，以 Heritage 編輯式版面呈現。</p></div></div>
          <div className="htg-footer-directories">{directories.map(({ id, title, entries }) => <nav key={id} aria-labelledby={`heritage-directory-${id}`}><h2 id={`heritage-directory-${id}`}>{title}</h2><ul>{entries.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}</div>
          <div className="htg-footer-end"><p lang="en">© {new Date().getFullYear()} {site.name}. All rights reserved.</p><p>隱私權政策：待核准公開</p></div>
        </div>
      </footer>
      <div id="heritage-portal-root" className="htg-portal-root" data-design-portal-container="heritage" />
    </div>
  );
}
