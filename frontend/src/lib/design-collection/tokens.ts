/**
 * Required semantic roles only: no Modern overrides, palette values or CSS are
 * emitted. Values use a deliberately bounded, Node-checkable syntax: hex/rgb
 * colors or semantic var aliases, simple lengths (fluid clamp for type sizes),
 * unitless line heights/weights and CSS shadow/duration/easing primitives.
 * Every role except reducedDuration can refer to one existing var(--token).
 * Alias existence, resolution and resolved positivity are not checked here;
 * reducedDuration must remain an explicit zero rather than an unresolved alias.
 * Shape/syntax validation is not contrast, font licensing, asset availability,
 * a browser CSS test or approval of a Heritage/Luxury visual design.
 */
export const requiredDesignTokenSchema = Object.freeze({
  color: Object.freeze({
    background: "color", surface: "color", surfaceForeground: "color", foreground: "color",
    card: "color", cardForeground: "color", popover: "color", popoverForeground: "color",
    muted: "color", mutedForeground: "color", primary: "color", primaryForeground: "color",
    secondary: "color", secondaryForeground: "color", accent: "color", accentForeground: "color",
    border: "color", input: "color", ring: "color", destructive: "color", destructiveForeground: "color",
    errorText: "color", success: "color", successForeground: "color", disabled: "color",
    disabledForeground: "color", disabledBorder: "color", selection: "color", selectionForeground: "color",
    selectionBorder: "color", interactiveHover: "color", interactiveActive: "color",
    loading: "color", loadingForeground: "color", empty: "color", emptyForeground: "color",
  }),
  typography: Object.freeze({
    bodyFont: "font-family", headingFont: "font-family", caption: "font-size", bodySmall: "font-size",
    body: "font-size", bodyLarge: "font-size", h3: "font-size", h2: "font-size", h1: "font-size",
    bodyLineHeight: "unitless", headingLineHeight: "unitless",
    regularWeight: "font-weight", mediumWeight: "font-weight", semiboldWeight: "font-weight", boldWeight: "font-weight",
  }),
  layout: Object.freeze({ containerMax: "positive-length", gutterMobile: "length", gutterDesktop: "length" }),
  spacing: Object.freeze({ tiny: "length", small: "length", medium: "length", large: "length", sectionMobile: "length", sectionDesktop: "length" }),
  radius: Object.freeze({ small: "length", medium: "length", large: "length", full: "length" }),
  shadow: Object.freeze({ subtle: "shadow", default: "shadow", elevated: "shadow" }),
  motion: Object.freeze({ fastDuration: "duration", normalDuration: "duration", slowDuration: "duration", easing: "easing", reducedDuration: "zero-duration" }),
} as const);

type TokenSchema = typeof requiredDesignTokenSchema;
export type DesignTokenGroup = keyof TokenSchema;
export type DesignTokenKind = {
  [Group in DesignTokenGroup]: TokenSchema[Group][keyof TokenSchema[Group]];
}[DesignTokenGroup];
export type SemanticAlias = `var(--${string})`;
type TokenValue<Kind> = Kind extends "unitless" | "font-weight" ? number | SemanticAlias : string;

export type DesignSemanticTokens = {
  readonly [Group in DesignTokenGroup]: {
    readonly [Role in keyof TokenSchema[Group]]: TokenValue<TokenSchema[Group][Role]>;
  };
};

export type DesignTokenIssue = Readonly<{
  path: string;
  code: "missing" | "invalid" | "unknown";
  expected: string;
}>;

export type DesignTokenValidation = Readonly<{
  valid: boolean;
  errors: readonly DesignTokenIssue[];
}>;

const hexColor = /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;
const semanticAlias = /^var\(--[a-z][\w-]*\)$/i;
const simpleLength = /^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|ch|vw|vh|%))$/;
const signedLength = /^-?(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em))$/;
const duration = /^(?:\d+(?:\.\d+)?|\.\d+)(?:ms|s)$/;

function plainRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function safeString(value: unknown): value is string {
  return typeof value === "string" && !!value && value.length <= 512 && value === value.trim()
    && !/[;{}<>\u0000-\u001f\u007f]/.test(value) && !/url\s*\(/i.test(value);
}

function validColor(value: string): boolean {
  if (hexColor.test(value) || semanticAlias.test(value) || value === "transparent" || value === "currentColor") return true;
  const rgb = /^rgba?\(([^()]+)\)$/i.exec(value);
  if (!rgb?.[1]) return false;
  const body = rgb[1].trim();
  let parts: string[];
  if (body.includes(",")) {
    if (body.includes("/")) return false;
    parts = body.split(",").map((part) => part.trim());
  } else {
    const sections = body.split("/");
    if (sections.length > 2) return false;
    const channels = sections[0];
    if (!channels) return false;
    parts = channels.trim().split(/\s+/);
    if (parts.length !== 3) return false;
    const alpha = sections[1];
    if (alpha !== undefined) parts.push(alpha.trim());
  }
  if (parts.length !== 3 && parts.length !== 4) return false;
  return parts.every((part, index) => {
    if (!/^(?:\d+(?:\.\d+)?|\.\d+)%?$/.test(part)) return false;
    const maximum = part.endsWith("%") ? 100 : index === 3 ? 1 : 255;
    return Number.parseFloat(part) <= maximum;
  });
}

function validFont(value: string): boolean {
  return value.split(",").every((part) => {
    const font = part.trim();
    return semanticAlias.test(font) || /^(?:"[^"\\]+"|'[^'\\]+'|[\p{L}\p{N}_ -]+)$/u.test(font);
  });
}

function validTypeSize(value: string): boolean {
  if (simpleLength.test(value)) return Number.isFinite(Number.parseFloat(value)) && Number.parseFloat(value) > 0;
  const clamp = /^clamp\(([^()]+)\)$/.exec(value);
  if (!clamp?.[1]) return false;
  const parts = clamp[1].split(",").map((part) => part.trim());
  return parts.length === 3 && parts.every((part) => simpleLength.test(part) && Number.isFinite(Number.parseFloat(part)) && Number.parseFloat(part) > 0);
}

function validShadow(value: string): boolean {
  if (value === "none" || semanticAlias.test(value)) return true;
  return value.split(/,(?![^()]*\))/).every((part) => {
    const match = /^(.*?)\s+(#[\da-f]+|rgba?\([^()]+\)|var\(--[a-z][\w-]*\))$/i.exec(part.trim());
    if (!match?.[1] || !match[2] || !validColor(match[2])) return false;
    const dimensions = match[1].trim().replace(/^inset\s+/, "").split(/\s+/);
    const blur = dimensions[2];
    return dimensions.length >= 2 && dimensions.length <= 4 && dimensions.every((item) => signedLength.test(item) && Number.isFinite(Number.parseFloat(item)))
      && (blur === undefined || Number.parseFloat(blur) >= 0);
  });
}

function validEasing(value: string): boolean {
  if (/^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(value)) return true;
  if (/^steps\([1-9]\d*,\s*(?:start|end)\)$/.test(value)) return true;
  const bezier = /^cubic-bezier\(([^()]+)\)$/.exec(value);
  if (!bezier?.[1]) return false;
  const points = bezier[1].split(",").map((point) => point.trim());
  if (points.length !== 4 || points.some((point) => !/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(point))) return false;
  const numbers = points.map(Number);
  const [firstX, , secondX] = numbers;
  return numbers.every(Number.isFinite) && firstX !== undefined && firstX >= 0 && firstX <= 1
    && secondX !== undefined && secondX >= 0 && secondX <= 1;
}

function validValue(value: unknown, kind: DesignTokenKind): boolean {
  if (kind !== "zero-duration" && safeString(value) && semanticAlias.test(value)) return true;
  if (kind === "unitless") return typeof value === "number" && Number.isFinite(value) && value > 0;
  if (kind === "font-weight") return typeof value === "number" && Number.isFinite(value) && value >= 1 && value <= 1000;
  if (!safeString(value)) return false;
  switch (kind) {
    case "color": return validColor(value);
    case "font-family": return validFont(value);
    case "font-size": return validTypeSize(value);
    case "length": return simpleLength.test(value) && Number.isFinite(Number.parseFloat(value));
    case "positive-length": return simpleLength.test(value) && Number.isFinite(Number.parseFloat(value)) && Number.parseFloat(value) > 0;
    case "shadow": return validShadow(value);
    case "duration": return duration.test(value) && Number.isFinite(Number.parseFloat(value));
    case "zero-duration": return duration.test(value) && Number.parseFloat(value) === 0;
    case "easing": return validEasing(value);
  }
}

/** Checks the same complete contract for every style without mutating its input. */
export function validateDesignSemanticTokens(input: unknown): DesignTokenValidation {
  const errors: DesignTokenIssue[] = [];
  if (!plainRecord(input)) return { valid: false, errors: [{ path: "$", code: "invalid", expected: "semantic token object" }] };
  for (const key of Object.keys(input)) {
    if (!Object.hasOwn(requiredDesignTokenSchema, key)) errors.push({ path: key, code: "unknown", expected: "known semantic group" });
  }
  for (const [group, roles] of Object.entries(requiredDesignTokenSchema)) {
    if (!Object.hasOwn(input, group)) {
      errors.push({ path: group, code: "missing", expected: "semantic group" });
      continue;
    }
    const values = input[group];
    if (!plainRecord(values)) {
      errors.push({ path: group, code: "invalid", expected: "semantic group object" });
      continue;
    }
    for (const role of Object.keys(values)) {
      if (!Object.hasOwn(roles, role)) errors.push({ path: `${group}.${role}`, code: "unknown", expected: "known semantic role" });
    }
    for (const [role, kind] of Object.entries(roles)) {
      const path = `${group}.${role}`;
      if (!Object.hasOwn(values, role)) errors.push({ path, code: "missing", expected: kind });
      else if (!validValue(values[role], kind)) errors.push({ path, code: "invalid", expected: kind });
    }
  }
  return { valid: errors.length === 0, errors };
}

export function assertDesignSemanticTokens(input: unknown): asserts input is DesignSemanticTokens {
  const result = validateDesignSemanticTokens(input);
  if (!result.valid) throw new TypeError(`Invalid design semantic tokens: ${result.errors.map(({ path, code }) => `${path} (${code})`).join(", ")}`);
}
