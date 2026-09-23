import { strings } from "./strings";

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format minor-unit money (e.g. 1500 cents) to display string (e.g. "$15.00").
 */
export function formatPrice(minorUnits: number, currency?: string): string {
  const symbol =
    currency === "USD" || !currency ? strings.currencySymbol : currency;
  const major = (minorUnits / 100).toFixed(2);
  return `${symbol}${major}`;
}

/**
 * Format an ISO date string to a readable date.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format an ISO date string to a readable date+time.
 */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Generate a simple UUID v4.
 */
export function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Truncate string to a max length.
 */
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

/**
 * Status color mapping for order statuses.
 */
export function getStatusColor(
  status: string
): "lime" | "blue" | "danger" | "success" | "warning" | "muted" {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "blue";
    case "shipped":
      return "lime";
    case "delivered":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "muted";
  }
}

/**
 * Get human-readable status label.
 */
export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: strings.confirmationStatusPending,
    confirmed: strings.confirmationStatusConfirmed,
    shipped: strings.confirmationStatusShipped,
    delivered: strings.confirmationStatusDelivered,
    cancelled: strings.confirmationStatusCancelled,
  };
  return map[status] || status;
}
