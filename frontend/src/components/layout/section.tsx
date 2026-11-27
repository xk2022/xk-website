import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const backgrounds = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  primary: "bg-primary text-primary-foreground",
} as const;

type SectionProps = ComponentProps<"section"> & {
  background?: keyof typeof backgrounds;
  spacing?: "default" | "compact";
};

export function Section({
  background = "default",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        backgrounds[background],
        spacing === "compact" ? "xk-section-compact" : "xk-section",
        className,
      )}
      {...props}
    />
  );
}

export type { SectionProps };
