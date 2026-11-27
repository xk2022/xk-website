/** Compatibility recipes; existing semantic tokens remain in app/globals.css. */
export const modernDesignSystem = Object.freeze({
  id: "modern",
  tokenSource: "src/app/globals.css",
  skipLink: "sr-only fixed top-4 left-4 z-50 rounded-md bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only",
  main: "flex-1",
} as const);
