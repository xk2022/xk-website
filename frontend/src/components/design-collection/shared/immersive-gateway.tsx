"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import "./immersive-gateway.css";

const sectors = [
  { id: "modern", en: "Modern", zh: "現代專業", clip: "m", color: "#3157d5", path: "M 83 259 A 482 482 0 0 1 917 259 L 673 400 A 200 200 0 0 0 327 400 Z" },
  { id: "heritage", en: "Heritage", zh: "經典復古", clip: "h", color: "#8a3b2e", path: "M 500 982 A 482 482 0 0 1 83 259 L 327 400 A 200 200 0 0 0 500 700 Z" },
  { id: "luxury", en: "Luxury", zh: "奢華精品", clip: "l", color: "#0c1017", path: "M 917 259 A 482 482 0 0 1 500 982 L 500 700 A 200 200 0 0 0 673 400 Z" },
] as const;
type StyleId = typeof sectors[number]["id"];

export function ImmersiveGateway({ destinations, legacyAnchors }: Readonly<{ destinations: Record<StyleId, string>; legacyAnchors: readonly string[] }>) {
  const [paused, setPaused] = useState(false);
  const [transition, setTransition] = useState<CSSProperties | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (legacyAnchors.includes(hash) && hash !== "main-content") window.location.replace(`${destinations.modern}#${hash}`);
    const reset = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; setTransition(null); };
    window.addEventListener("pageshow", reset);
    return () => { if (timer.current) clearTimeout(timer.current); window.removeEventListener("pageshow", reset); };
  }, [destinations.modern, legacyAnchors]);
  function select(event: MouseEvent, id: StyleId, color: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (timer.current !== null) return;
    setTransition({ "--selected": color, "--x": `${event.clientX || innerWidth / 2}px`, "--y": `${event.clientY || innerHeight / 2}px` } as CSSProperties);
    timer.current = setTimeout(() => window.location.assign(destinations[id]), 360);
  }

  return <main id="main-content" className="xkg2-screen" data-gateway-location="home" data-paused={paused} data-leaving={transition !== null} style={transition ?? undefined}>
    <h1 className="xkg2-eyebrow" lang="en">Xplore Kaleidoscope</h1>
    <div className="xkg2-wheel">
      <Image className="xkg2-art" src="/design-collection/kaleidoscope-gateway.webp" width={1024} height={1024} alt="" unoptimized loading="eager" fetchPriority="high" />
      <div className="xkg2-center"><Image src="/brand/source/xk-logo-white.svg" alt="XK SYSTEM" width={620} height={410} unoptimized /><p lang="en">ONE BRAND.<br />INFINITE PERSPECTIVES.</p></div>
      <svg className="xkg2-links" viewBox="0 0 1000 1000" role="group" aria-label="萬花筒三種網站風格">
        <defs>{sectors.map(s => <path key={s.id} id={`gateway-${s.clip}`} d={s.path} />)}{sectors.map(s => <clipPath id={`gateway-c${s.clip}`} key={s.id}><use href={`#gateway-${s.clip}`} /></clipPath>)}<linearGradient id="gateway-gold" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#fff4cc" stopOpacity="0"/><stop offset=".5" stopColor="#fff4cc" stopOpacity=".9"/><stop offset="1" stopColor="#fff4cc" stopOpacity="0"/></linearGradient></defs>
        <g className="xkg2-ambient" clipPath="url(#gateway-cm)"><path className="xkg2-modern-flow" d="M180 165 Q500 50 820 165 M230 300 Q500 -30 770 300 M90 225 Q500 80 910 225"/><circle className="xkg2-node" cx="500" cy="175" r="6"/><circle className="xkg2-node" cx="296" cy="150" r="4" style={{animationDelay:".6s"}}/><circle className="xkg2-node" cx="720" cy="171" r="4" style={{animationDelay:"1.2s"}}/></g>
        <g className="xkg2-ambient" clipPath="url(#gateway-ch)"><use className="xkg2-heritage-shine" href="#gateway-h" fill="#f4e9d8"/></g>
        <g className="xkg2-ambient" clipPath="url(#gateway-cl)"><rect className="xkg2-gold-shine" x="680" y="240" width="100" height="800" fill="url(#gateway-gold)" transform="rotate(-35 730 640)"/><circle className="xkg2-spark" cx="880" cy="416" r="3"/><circle className="xkg2-spark" cx="941" cy="630" r="3" style={{animationDelay:"1.1s"}}/></g>
        {sectors.map(s => <a key={s.id} href={destinations[s.id]} className={`xkg2-sector ${"xkg2-" + s.id}`} aria-label={`${s.en} ${s.zh}`} onClick={e=>select(e,s.id,s.color)}><use href={`#gateway-${s.clip}`} fill="transparent" stroke="transparent" className="xkg2-hit"/></a>)}
      </svg>
    </div>
    <p className="xkg2-prompt">選擇你的視角 · 探索不同的可能</p>
    <nav className="xkg2-choices" aria-label="三種設計入口">{sectors.map(s => <a key={s.id} href={destinations[s.id]} className={`xkg2-choice ${"xkg2-" + s.id}`} onClick={e=>select(e,s.id,s.color)}><strong lang="en">{s.en}</strong><span>{s.zh} ↗</span></a>)}</nav>
    <button type="button" className="xkg2-motion" aria-label={paused ? "播放動畫" : "暫停動畫"} aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused ? "▶" : "Ⅱ"}</button>
    <div className="xkg2-veil" aria-hidden="true" />
  </main>;
}
