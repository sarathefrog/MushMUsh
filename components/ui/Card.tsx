import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = "md", hoverable, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-card bg-surface border border-border",
        "shadow-subtle",
        paddingStyles[padding],
        hoverable &&
          "transition-shadow duration-[--transition-fast] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer",
        className
      )}
      {...props}
    />
  );
});
