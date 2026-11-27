"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export type HeritageNavigationItem = Readonly<{ href: string; label: string; current: boolean }>;

const inStyleSwitcher = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest("[data-design-switcher]"));

/** Native disclosure stays usable without JavaScript; enhancement matches the existing close behavior. */
export function HeritageNavigation({ items }: { items: readonly HeritageNavigationItem[] }) {
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && disclosureRef.current?.open) {
        event.preventDefault();
        disclosureRef.current.open = false;
        summaryRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && disclosureRef.current?.open && !disclosureRef.current.contains(event.target) && !inStyleSwitcher(event.target)) disclosureRef.current.open = false;
    }
    function onClick(event: MouseEvent) {
      // Closing after the click target is established preserves the band's hit area.
      if (event.target instanceof Node && disclosureRef.current?.open && !disclosureRef.current.contains(event.target)) disclosureRef.current.open = false;
    }
    function onFocusIn(event: FocusEvent) {
      if (event.target instanceof Node && disclosureRef.current?.open && !disclosureRef.current.contains(event.target) && !inStyleSwitcher(event.target)) disclosureRef.current.open = false;
    }
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches && disclosureRef.current) disclosureRef.current.open = false;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return (
    <div className="htg-navigation">
      <div className="htg-container">
        <nav className="htg-desktop-navigation" aria-label="Heritage 主要導覽">
          <ul>{items.map(({ href, label, current }) => <li key={href}><Link href={href} aria-current={current ? "page" : undefined}>{label}</Link></li>)}</ul>
        </nav>
        <details ref={disclosureRef} className="htg-mobile-navigation" onBlurCapture={(event) => {
          if ((!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) && !inStyleSwitcher(event.relatedTarget)) event.currentTarget.open = false;
        }}>
          <summary ref={summaryRef}>網站導覽<span className="htg-navigation-hint">展開／收合目錄</span></summary>
          <nav aria-label="Heritage 手機導覽"><ul>{items.map(({ href, label, current }) => <li key={href}><Link href={href} aria-current={current ? "page" : undefined} onClick={() => { if (disclosureRef.current) disclosureRef.current.open = false; }}>{label}</Link></li>)}</ul></nav>
        </details>
      </div>
    </div>
  );
}
