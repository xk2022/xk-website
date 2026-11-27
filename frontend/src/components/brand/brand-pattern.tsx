import { cn } from "@/lib/utils";

type BrandPatternProps = {
  variant?: "grid" | "kaleidoscope" | "gradient" | "shapes";
  className?: string;
};

const variants = {
  grid: "brand-pattern-grid",
  kaleidoscope: "brand-pattern-kaleidoscope",
  gradient: "brand-pattern-gradient",
  shapes: "brand-pattern-shapes",
} as const;

/** Decorative only. Place inside a positioned, overflow-hidden container. */
export function BrandPattern({ variant = "grid", className }: BrandPatternProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", variants[variant], className)}
    />
  );
}
