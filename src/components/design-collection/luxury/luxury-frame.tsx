import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { StyleSwitcher } from "@/components/design-collection/shared/style-switcher";
import { InquiryButton } from "@/components/layout/inquiry-button";
import { luxuryThemeStyle } from "@/design-systems/luxury";
import { getDesignContent } from "@/lib/design-collection/content";
import { getDesignDirectoryGroups, getDesignHeaderItems, getDesignNavigationModel } from "@/lib/design-collection/navigation-model";
import type { DesignContentPageKey } from "@/lib/design-collection/types";

import { LuxuryNavigation } from "./luxury-navigation";

import "@/design-systems/luxury/luxury.css";

export function LuxuryFrame({ children, pageKey }: Readonly<{ children: ReactNode; pageKey: DesignContentPageKey; slug?: string }>) {
  const { site, contact } = getDesignContent();
  const home = getDesignNavigationModel().styles.find(({ id }) => id === "luxury")?.homeHref;
  if (!home) throw new Error("Luxury navigation requires its published homepage");
  const items = getDesignHeaderItems("luxury", pageKey);
  const groups = getDesignDirectoryGroups(["luxury", "modern", "heritage"]);

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
        <div className="lx-header-context"><div className="lx-container lx-header-context-row design-switcher-inquiry-only"><p id="luxury-inquiry-note">{contact.action.description}</p></div></div>
      </header>
      <StyleSwitcher />
      <main id="main-content" tabIndex={-1} className="lx-main">{children}</main>
      <footer className="lx-footer">
        <div className="lx-container">
          <div className="lx-footer-intro"><Link href={home} className="lx-footer-brand" aria-label={`${site.name} Luxury 首頁`}><Image src="/brand/source/xk-logo-white.svg" alt={site.name} width={620} height={410} unoptimized loading="lazy" className="lx-footer-logo" /></Link><p lang="en" className="lx-footer-slogan">{site.slogan}</p></div>
          <div className="lx-footer-directory">{groups.map(({ id, title, entries }) => <nav key={id} aria-labelledby={`luxury-directory-${id}`}><h2 id={`luxury-directory-${id}`}>{title}</h2><ul>{entries.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}</div>
          <div className="lx-footer-end"><p lang="en">© {new Date().getFullYear()} {site.name}. All rights reserved.</p><p>隱私權政策：待核准公開</p></div>
        </div>
      </footer>
      <div id="luxury-portal-root" className="lx-portal-root" data-design-portal-container="luxury" />
    </div>
  );
}
