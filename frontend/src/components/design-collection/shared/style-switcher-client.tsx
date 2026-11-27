"use client";

import { useId, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { resolveStyleSwitch, type DesignNavigationModel } from "@/lib/design-collection/navigation";

import "./style-switcher.css";

const locationEvent = "design-style-location-change";

function subscribeLocation(notify: () => void) {
  let frame: number | undefined;
  function afterLocalLinkClick(event: MouseEvent) {
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!anchor || anchor.origin !== window.location.origin) return;
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => { frame = undefined; notify(); });
  }
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  window.addEventListener(locationEvent, notify);
  const navigation = "navigation" in window && window.navigation instanceof EventTarget ? window.navigation : null;
  navigation?.addEventListener("currententrychange", notify);
  document.addEventListener("click", afterLocalLinkClick);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
    window.removeEventListener(locationEvent, notify);
    navigation?.removeEventListener("currententrychange", notify);
    document.removeEventListener("click", afterLocalLinkClick);
    if (frame !== undefined) window.cancelAnimationFrame(frame);
  };
}

const browserHash = () => window.location.hash;

export function StyleSwitcherClient({ model }: { model: DesignNavigationModel }) {
  const noteId = useId();
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeLocation, browserHash, () => "");

  function refreshHref(anchor: HTMLAnchorElement, target: DesignNavigationModel["styles"][number]["id"]) {
    // The activation URL is authoritative even before a hash/history re-render.
    // Only pathname/hash enter the pure resolver; query data is never forwarded.
    const destination = resolveStyleSwitch(model, window.location.pathname, window.location.hash, target);
    if (destination) {
      anchor.setAttribute("href", destination.href);
      if (destination.fallback) anchor.setAttribute("data-style-fallback", "true");
      else anchor.removeAttribute("data-style-fallback");
    }
    window.dispatchEvent(new Event(locationEvent));
  }

  return (
    <nav data-design-switcher className="design-style-switcher" aria-label="網站設計風格">
      <div className="design-style-switcher-inner">
        <div className="design-style-switcher-heading"><p>網站呈現風格</p><p>同一份內容，不同閱讀方式。</p><Link href="/" prefetch={false} className="design-style-switcher-collection-link">返回萬花筒入口</Link><a href={model.collectionHref} data-design-collection-link className="design-style-switcher-collection-link">比較三套版面</a></div>
        <ul className="design-style-switcher-options">
          {model.styles.map((style) => {
            const destination = resolveStyleSwitch(model, pathname, hash, style.id);
            if (!destination) return null;
            const content = <><span>{style.name}</span>{destination.current ? <span className="design-style-switcher-state">✓ 目前版本</span> : destination.fallback ? <span className="design-style-switcher-state">本頁無對應版本，前往首頁</span> : <span className="design-style-switcher-state">查看此頁版本</span>}</>;
            return <li key={style.id}>{destination.current ? (
              <span className="design-style-switcher-item design-style-switcher-current" data-design-switcher-target={style.id} aria-current="page">{content}</span>
            ) : (
              <a
                className="design-style-switcher-item"
                data-design-switcher-target={style.id}
                data-style-fallback={destination.fallback ? "true" : undefined}
                href={destination.href}
                aria-describedby={noteId}
                onPointerDown={(event) => refreshHref(event.currentTarget, style.id)}
                onFocus={(event) => refreshHref(event.currentTarget, style.id)}
                onClick={(event) => refreshHref(event.currentTarget, style.id)}
                onAuxClick={(event) => refreshHref(event.currentTarget, style.id)}
                onContextMenu={(event) => refreshHref(event.currentTarget, style.id)}
              >{content}</a>
            )}</li>;
          })}
        </ul>
        <p id={noteId} className="design-style-switcher-note">切換風格不帶入聯絡草稿、客戶稱呼與專案名稱，也不會自動複製個人欄位；已儲存的試算選項可還原。</p>
      </div>
    </nav>
  );
}
