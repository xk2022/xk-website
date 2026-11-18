import type { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const cardStyles =
  "flex min-w-0 flex-col gap-6 rounded-lg border bg-card p-6 text-card-foreground shadow-subtle";

type CardProps =
  | (ComponentProps<"div"> & { variant?: "default" })
  | (ComponentProps<typeof Link> & { variant: "interactive" });

/** Interactive cards are links. Do not place other links or buttons inside them. */
function Card(props: CardProps) {
  if (props.variant === "interactive") {
    const { variant, className, ...linkProps } = props;

    return (
      <Link
        data-slot="card"
        data-variant={variant}
        className={cn(
          cardStyles,
          "transition-[border-color,box-shadow] duration-brand ease-brand hover:border-secondary hover:shadow-default focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
          className,
        )}
        {...linkProps}
      />
    );
  }

  const { variant = "default", className, ...divProps } = props;

  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardStyles, className)}
      {...divProps}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function CardTitle({
  as: Tag = "h3",
  className,
  ...props
}: ComponentProps<"h3"> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Tag
      data-slot="card-title"
      className={cn("type-h3 text-primary", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("type-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("type-body", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-auto flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
}

function CardIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="card-icon"
      aria-hidden="true"
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-md bg-surface text-secondary [&_svg]:size-6",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardIcon,
};
export type { CardProps };
