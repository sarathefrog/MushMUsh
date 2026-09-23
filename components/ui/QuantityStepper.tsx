"use client";

import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled,
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-pill border border-border bg-surface",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className={cn(
          "w-8 h-8 flex items-center justify-center",
          "text-sm font-medium text-primary",
          "rounded-l-pill",
          "transition-colors duration-[--transition-fast]",
          "hover:bg-white focus-ring cursor-pointer",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className={cn(
          "w-8 h-8 flex items-center justify-center",
          "text-sm font-medium text-primary",
          "rounded-r-pill",
          "transition-colors duration-[--transition-fast]",
          "hover:bg-white focus-ring cursor-pointer",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
