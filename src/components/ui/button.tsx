import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg hover:opacity-90 active:scale-[0.98]",
        ghost:
          "bg-transparent text-fg border border-border hover:bg-elevated",
      },
      size: {
        default: "h-11 px-5 rounded-md text-sm",
        lg: "h-12 px-6 rounded-lg text-sm tracking-wide",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
