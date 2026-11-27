import type { CSSProperties } from "react";

import type { DesignSemanticTokens } from "@/lib/design-collection/tokens";

/** Same-version v1 approved palette. Functional roles are independently measurable. */
export const luxuryTokens = {
  color: {
    background: "#0C1017", surface: "#151B24", surfaceForeground: "#F5F1E8", foreground: "#F5F1E8",
    card: "#151B24", cardForeground: "#F5F1E8", popover: "#151B24", popoverForeground: "#F5F1E8",
    muted: "#151B24", mutedForeground: "#B8B1A5", primary: "#06B6D4", primaryForeground: "#0C1017",
    secondary: "#06B6D4", secondaryForeground: "#0C1017", accent: "#06B6D4", accentForeground: "#0C1017",
    border: "#3A404A", input: "#8B95A5", ring: "#06B6D4", destructive: "#FDA4AF", destructiveForeground: "#0C1017",
    errorText: "#FDA4AF", success: "#86EFAC", successForeground: "#0C1017", disabled: "#151B24",
    disabledForeground: "#B8B1A5", disabledBorder: "#8B95A5", selection: "#151B24", selectionForeground: "#F5F1E8",
    selectionBorder: "#06B6D4", interactiveHover: "#F5F1E8", interactiveActive: "#F5F1E8",
    loading: "#06B6D4", loadingForeground: "#0C1017", empty: "#151B24", emptyForeground: "#B8B1A5",
  },
  typography: {
    bodyFont: 'var(--font-inter), var(--font-noto-sans-tc), "Microsoft JhengHei", "PingFang TC", Arial, sans-serif',
    headingFont: 'var(--font-inter), var(--font-noto-sans-tc), "Microsoft JhengHei", "PingFang TC", Arial, sans-serif',
    caption: "0.8125rem", bodySmall: "0.875rem", body: "1rem", bodyLarge: "1.125rem",
    h3: "clamp(1.5rem, 2.5vw, 2rem)", h2: "clamp(1.75rem, 3.5vw, 2.5rem)", h1: "clamp(2.25rem, 5vw, 4rem)",
    bodyLineHeight: 1.7, headingLineHeight: 1.35, regularWeight: 400, mediumWeight: 500, semiboldWeight: 600, boldWeight: 700,
  },
  layout: { containerMax: "80rem", gutterMobile: "1.25rem", gutterDesktop: "3rem" },
  spacing: { tiny: "0.5rem", small: "1rem", medium: "1.5rem", large: "3rem", sectionMobile: "3rem", sectionDesktop: "5.5rem" },
  radius: { small: "0.125rem", medium: "0.25rem", large: "0.375rem", full: "9999px" },
  shadow: { subtle: "none", default: "none", elevated: "0 8px 24px #00000080" },
  motion: { fastDuration: "160ms", normalDuration: "200ms", slowDuration: "240ms", easing: "ease-out", reducedDuration: "0ms" },
} as const satisfies DesignSemanticTokens;

Object.values(luxuryTokens).forEach(Object.freeze);
Object.freeze(luxuryTokens);

/** Gold is an approved, decoration-only extension; it is never a control or status role. */
export const luxuryDecoration = Object.freeze({ gold: "#C8A96B" } as const);

/** All 72 required roles plus the separate decorative role come from this source. */
export const luxuryThemeStyle = Object.freeze(Object.fromEntries([
  ...Object.entries(luxuryTokens).flatMap(([group, roles]) => Object.entries(roles).map(([role, value]) => [
    `--lx-${group}-${role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value,
  ])),
  ["--lx-decoration-gold", luxuryDecoration.gold],
])) as Readonly<CSSProperties & Record<`--lx-${string}`, string | number>>;

export const luxuryRecipes = Object.freeze({
  theme: "lx-theme", container: "lx-container", hero: "lx-hero", section: "lx-section", link: "lx-link", button: "lx-button",
  badge: "lx-badge", disclosure: "lx-disclosure", note: "lx-note", list: "lx-list", stack: "lx-stack", work: "lx-work",
} as const);

export const luxuryDesignSystem = Object.freeze({ id: "luxury", tokens: luxuryTokens, decoration: luxuryDecoration, style: luxuryThemeStyle, recipes: luxuryRecipes } as const);
