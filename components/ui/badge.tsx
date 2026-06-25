import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-7 items-center rounded-[7px] border px-2.5 text-xs font-semibold leading-none tracking-normal",
  {
    variants: {
      variant: {
        default: "border-primary/35 bg-primary/10 text-primary",
        secondary: "border-border bg-secondary text-secondary-foreground",
        destructive: "border-destructive/35 bg-destructive/10 text-destructive",
        cyan: "border-[rgba(77,219,255,0.35)] bg-[rgba(77,219,255,0.1)] text-[rgb(116,232,255)]",
        success:
          "border-[rgba(62,221,132,0.34)] bg-[rgba(62,221,132,0.1)] text-[rgb(115,240,169)]",
        warning:
          "border-[rgba(255,198,80,0.35)] bg-[rgba(255,198,80,0.1)] text-[rgb(255,211,117)]",
        outline: "border-border bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
