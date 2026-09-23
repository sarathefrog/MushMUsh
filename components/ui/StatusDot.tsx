import { cn, getStatusColor } from "@/lib/utils";

type DotVariant = "lime" | "blue" | "danger" | "success" | "warning" | "muted";

interface StatusDotProps {
  variant?: DotVariant;
  status?: string;
  className?: string;
}

const dotColors: Record<DotVariant, string> = {
  lime: "bg-lime",
  blue: "bg-blue",
  danger: "bg-danger",
  success: "bg-success",
  warning: "bg-warning",
  muted: "bg-muted",
};

export function StatusDot({ variant, status, className }: StatusDotProps) {
  const resolvedVariant = variant || (status ? getStatusColor(status) : "muted");

  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full",
        dotColors[resolvedVariant],
        className
      )}
      aria-hidden="true"
    />
  );
}
