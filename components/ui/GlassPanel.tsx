import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel({ padding = "md", className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "glass rounded-card",
          paddingStyles[padding],
          className
        )}
        {...props}
      />
    );
  }
);
