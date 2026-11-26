"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export type LuxuryNavigationItem = Readonly<{ href: string; label: string; current: boolean }>;

/** Native disclosure first; closing enhancements never require a modal or a persisted preference. */
export function LuxuryNavigation({ items }: { items: readonly LuxuryNavigationItem[] }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menu.current?.open) {
        event.preventDefault();
        menu.current.open = false;
        trigger.current?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && menu.current?.open && !menu.current.contains(event.target)) menu.current.open = false;
    }
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches && menu.current) menu.current.open = false;
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  return (
    <div className="lx-navigation">
      <nav className="lx-desktop-nav" aria-label="Luxury 主要導覽"><ul>{items.map(({ href, label, current }) => <li key={href}><Link href={href} aria-current={current ? "page" : undefined}>{label}</Link></li>)}</ul></nav>
      <details ref={menu} className="lx-mobile-menu" onBlurCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}>
        <summary ref={trigger}>網站目錄<span className="lx-menu-hint">展開／收合</span></summary>
        <nav aria-label="Luxury 手機導覽"><ul>{items.map(({ href, label, current }) => <li key={href}><Link href={href} aria-current={current ? "page" : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</Link></li>)}</ul></nav>
      </details>
    </div>
  );
}
