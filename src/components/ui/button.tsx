import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const primaryStyles = "bg-primary text-primary-foreground hover:bg-primary/90";
const mediumStyles = "min-h-12 gap-2 px-5 py-3";

const buttonVariants = cva(
  "type-button inline-flex min-w-0 shrink-0 items-center justify-center rounded-md border border-transparent text-center whitespace-normal select-none transition-[background-color,color,border-color,box-shadow] duration-brand ease-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: primaryStyles,
        primary: primaryStyles,
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border-border bg-background text-foreground hover:border-secondary hover:bg-surface",
        ghost: "text-foreground hover:bg-surface",
        destructive:
          "bg-destructive text-background hover:bg-destructive/90 focus-visible:ring-destructive",
        link: "text-secondary underline-offset-4 hover:underline",
      },
      size: {
        default: mediumStyles,
        md: mediumStyles,
        sm: "min-h-11 gap-2 px-4 py-2",
        lg: "min-h-14 gap-3 px-6 py-4",
        xs: "min-h-11 gap-1.5 px-3 py-2",
        icon: "size-12 p-3",
        "icon-xs": "size-11 p-2",
        "icon-sm": "size-11 p-2",
        "icon-lg": "size-14 p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonVariantProps &
  (
    | (ComponentProps<"button"> & { asChild?: false })
    | (Omit<ComponentProps<"button">, "disabled" | "type"> & {
        asChild: true;
        // Links have no native disabled state. Use a native disabled Button.
        disabled?: never;
        type?: never;
      })
  );

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
