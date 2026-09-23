import { cn, getStatusColor } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

type BadgeVariant = "lime" | "blue" | "danger" | "success" | "warning" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** If provided, auto-select variant from order status */
  status?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  lime: "bg-lime text-primary",
  blue: "bg-blue text-white",
  danger: "bg-danger text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-primary",
  muted: "bg-surface text-muted",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, status, dot, className, children, ...props },
  ref
) {
  const resolvedVariant = variant || (status ? getStatusColor(status) : "muted");

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5",
        "text-xs font-medium whitespace-nowrap",
        variantStyles[resolvedVariant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            resolvedVariant === "lime" ? "bg-primary" : "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
});
