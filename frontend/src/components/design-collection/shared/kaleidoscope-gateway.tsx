import Image from "next/image";
import Link from "next/link";

import { resolveDesignHref } from "@/lib/design-collection/routes";
import type { DesignStyleId } from "@/lib/design-collection/types";

import "./kaleidoscope-gateway.css";

const sectors = [
  { id: "modern", name: "Modern 現代專業", path: "M 83 259 A 482 482 0 0 1 917 259 L 673 400 A 200 200 0 0 0 327 400 Z", color: "#81e6ff" },
  { id: "heritage", name: "Heritage 懷舊復古", path: "M 500 982 A 482 482 0 0 1 83 259 L 327 400 A 200 200 0 0 0 500 700 Z", color: "#f4e9d8" },
  { id: "luxury", name: "Luxury 奢華精品", path: "M 917 259 A 482 482 0 0 1 500 982 L 500 700 A 200 200 0 0 0 673 400 Z", color: "#ffdc87" },
] as const satisfies readonly { id: DesignStyleId; name: string; path: string; color: string }[];

export function KaleidoscopeGateway({ isHome = false }: Readonly<{ isHome?: boolean }>) {
  const entries = sectors.flatMap((sector) => {
    const href = resolveDesignHref({ styleId: sector.id, pageKey: "home" });
    return href ? [{ ...sector, href }] : [];
  });

  return (
    <section className="xkg1-gateway" aria-labelledby="design-collection-title" data-gateway-location={isHome ? "home" : "gallery"}>
      <p className="xkg1-eyebrow" lang="en">XPLORE KALEIDOSCOPE · DESIGN COLLECTION</p>
      <h1 id="design-collection-title" className="xkg1-title" lang="en">{isHome ? "XK SYSTEM — One Brand. Infinite Perspectives." : "One Brand. Infinite Perspectives."}</h1>
      <p className="xkg1-subtitle">一個品牌，無限視角。選擇你的設計風格。</p>
      <div className="xkg1-wheel">
        <Image src="/design-collection/kaleidoscope-gateway.webp" alt="" width={1024} height={1024} unoptimized loading="eager" fetchPriority="high" className="xkg1-art" />
        <div className="xkg1-center">
          <Image src="/brand/source/xk-logo-white.svg" alt="XK SYSTEM" width={620} height={410} unoptimized className="xkg1-logo" />
        </div>
        <svg viewBox="0 0 1000 1000" className="xkg1-overlay" aria-label="萬花筒三種網站風格" role="group">
          {entries.map(({ id, name, href, path, color }) => (
            <a key={id} href={href} aria-label={`瀏覽 ${name}`} className="xkg1-sector">
              <path d={path} fill={color} className={`xkg1-effect ${"xkg1-" + id}`} />
              <path d={path} fill="transparent" stroke="transparent" className="xkg1-hit" />
            </a>
          ))}
        </svg>
      </div>
      <nav className="xkg1-choices" aria-label="網站風格入口">
        {entries.map(({ id, name, href }) => <Link key={id} href={href} className={`xkg1-choice ${"xkg1-" + id + "Choice"}`}>{name} <span aria-hidden="true">↗</span></Link>)}
      </nav>
      <p className="xkg1-note">三種設計，同一份品牌、服務與作品內容。</p>
    </section>
  );
}
