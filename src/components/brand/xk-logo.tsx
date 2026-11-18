import {
  horizontalSymbolTransform,
  horizontalWordmarkTransform,
  symbolOnlyTransform,
  symbolPaths,
  wordmarkPaths,
} from "@/components/brand/xk-logo-data";
import { cn } from "@/lib/utils";

export interface XkLogoProps {
  /** SVG height in CSS pixels; the original aspect ratio is preserved. */
  size?: number;
  variant?: "primary" | "white" | "monochrome";
  showWordmark?: boolean;
  className?: string;
  /** Hide the image when its surrounding link already has a visible label. */
  decorative?: boolean;
}

/** Supplied XK artwork, retained as a provisional brand identity. */
export function XkLogo({
  size = 96,
  variant = "primary",
  showWordmark = true,
  className,
  decorative = false,
}: XkLogoProps) {
  const primaryFill =
    variant === "white" ? "var(--background)" : "var(--logo-primary)";
  const secondaryFill =
    variant === "primary" ? "var(--logo-secondary)" : primaryFill;
  const label = "Xplore Kaleidoscope Logo（暫定版本）";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={showWordmark ? "0 0 850 204" : "0 0 472 472"}
      width={showWordmark ? (size * 850) / 204 : size}
      height={size}
      className={cn("inline-block h-auto max-w-full shrink-0 align-middle", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      data-provisional="true"
      data-variant={variant}
    >
      {!decorative && <title>{label}</title>}
      <g transform={showWordmark ? horizontalSymbolTransform : symbolOnlyTransform}>
        <path fill={primaryFill} d={symbolPaths[0]} />
        <path fill={secondaryFill} d={symbolPaths[1]} />
      </g>
      {showWordmark && (
        <g fill={primaryFill} transform={horizontalWordmarkTransform}>
          {wordmarkPaths.map((path) => (
            <path key={path.transform} transform={path.transform} d={path.d} />
          ))}
        </g>
      )}
    </svg>
  );
}
