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

/** Approved XK V2 artwork. */
export function XkLogo({
  size = 96,
  variant = "primary",
  showWordmark = true,
  className,
  decorative = false,
}: XkLogoProps) {
  const primaryFill = variant === "white" ? "#FFFFFF" : "var(--logo-primary)";
  const secondaryFill =
    variant === "primary" ? "var(--logo-secondary)" : primaryFill;
  const label = "Xplore Kaleidoscope Logo";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={showWordmark ? "0 0 2198 480" : "0 0 504 504"}
      width={showWordmark ? (size * 2198) / 480 : size}
      height={size}
      className={cn("inline-block h-auto max-w-full shrink-0 align-middle", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      data-logo-version="2"
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
