import type { ReactNode } from "react";

import { StyleSwitcher } from "@/components/design-collection/shared/style-switcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { modernDesignSystem } from "@/design-systems/modern";

/** Fragment preserves the original body children and print/landmark structure. */
export function ModernFrame({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <a href="#main-content" className={modernDesignSystem.skipLink}>
        跳至主要內容
      </a>
      <SiteHeader />
      <StyleSwitcher />
      <main id="main-content" tabIndex={-1} className={modernDesignSystem.main}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
