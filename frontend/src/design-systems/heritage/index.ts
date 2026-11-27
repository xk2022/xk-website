import type { CSSProperties } from "react";

import type { DesignSemanticTokens } from "@/lib/design-collection/tokens";

/** Approved v1 presentation values; functional roles receive separate contrast checks. */
export const heritageTokens = {
  color: {
    background: "#F4E9D8", surface: "#FFF9F0", surfaceForeground: "#2D241E", foreground: "#2D241E",
    card: "#FFF9F0", cardForeground: "#2D241E", popover: "#FFFFFF", popoverForeground: "#101828",
    muted: "#F4E9D8", mutedForeground: "#705D4A", primary: "#2D241E", primaryForeground: "#FFF9F0",
    secondary: "#2563EB", secondaryForeground: "#FFFFFF", accent: "#2563EB", accentForeground: "#FFFFFF",
    border: "#D5C7B1", input: "#806B55", ring: "#2563EB", destructive: "#B42318", destructiveForeground: "#FFFFFF",
    errorText: "#B42318", success: "#166534", successForeground: "#FFFFFF", disabled: "#F4E9D8",
    disabledForeground: "#705D4A", disabledBorder: "#806B55", selection: "#FFF9F0", selectionForeground: "#2D241E",
    selectionBorder: "#2563EB", interactiveHover: "#101828", interactiveActive: "#101828",
    loading: "#2563EB", loadingForeground: "#FFFFFF", empty: "#FFF9F0", emptyForeground: "#705D4A",
  },
  typography: {
    bodyFont: 'var(--font-inter), var(--font-noto-sans-tc), "Microsoft JhengHei", "PingFang TC", Arial, sans-serif',
    headingFont: 'var(--font-inter), var(--font-noto-sans-tc), "Microsoft JhengHei", "PingFang TC", Arial, sans-serif', caption: "0.8125rem", bodySmall: "0.875rem",
    body: "1rem", bodyLarge: "1.125rem", h3: "1.375rem", h2: "clamp(1.75rem, 3vw, 2.25rem)", h1: "clamp(2.25rem, 4.2vw, 3.25rem)",
    bodyLineHeight: 1.8, headingLineHeight: 1.4, regularWeight: 400, mediumWeight: 500, semiboldWeight: 600, boldWeight: 700,
  },
  layout: { containerMax: "73.75rem", gutterMobile: "1.25rem", gutterDesktop: "3rem" },
  spacing: { tiny: "0.5rem", small: "1rem", medium: "1.5rem", large: "2.5rem", sectionMobile: "2.75rem", sectionDesktop: "4rem" },
  radius: { small: "0.125rem", medium: "0.25rem", large: "0.375rem", full: "9999px" },
  shadow: { subtle: "none", default: "none", elevated: "0 8px 24px #10182826" },
  motion: { fastDuration: "120ms", normalDuration: "160ms", slowDuration: "160ms", easing: "ease-out", reducedDuration: "0ms" },
} as const satisfies DesignSemanticTokens;

Object.values(heritageTokens).forEach(Object.freeze);
Object.freeze(heritageTokens);

/** Every required role is emitted on the actual frame from this single source. */
export const heritageThemeStyle = Object.freeze(Object.fromEntries(
  Object.entries(heritageTokens).flatMap(([group, roles]) => Object.entries(roles).map(([role, value]) => [
    `--htg-${group}-${role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
    value,
  ])),
)) as Readonly<CSSProperties & Record<`--htg-${string}`, string | number>>;

export const heritageRecipes = Object.freeze({
  theme: "heritage-theme", container: "htg-container", skipLink: "htg-skip-link", main: "htg-main",
  hero: "htg-hero", section: "htg-section", link: "htg-link", button: "htg-button", badge: "htg-badge",
  list: "htg-list", disclosure: "htg-disclosure", card: "htg-entry", selected: "htg-selected", error: "htg-error",
} as const);

export const heritageDesignSystem = Object.freeze({ id: "heritage", tokens: heritageTokens, recipes: heritageRecipes, style: heritageThemeStyle } as const);
