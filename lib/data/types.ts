/* ─── Core data types ────────────────────────────────────────────── */

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  typeId: string;
  name: string;
  slug: string;
  story: string;
  era: string;
  material: string;
  dimensions: string;
  /** Price in minor units (cents) */
  price: number;
  currency: string;
  condition: string;
  stock: number;
  imageUrl: string;
}

export interface Region {
  id: string;
  name: string;
  /** Shipping fee in minor units (cents) */
  shippingFee: number;
  currency: string;
}

export type UserRole = "admin" | "customer";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

/** Omit passwordHash for client-safe user data */
export type SafeUser = Omit<User, "passwordHash">;

export interface OrderItem {
  productId: string;
  name: string;
  /** Unit price in minor units */
  unitPrice: number;
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  regionId: string;
  address: string;
  note: string;
  /** Subtotal in minor units */
  subtotal: number;
  /** Shipping fee in minor units */
  shippingFee: number;
  /** Total in minor units */
  total: number;
  currency: string;
  status: OrderStatus;
  proofPhotoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/* ─── Cart types (client-side only) ──────────────────────────────── */

export interface CartItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}

/* ─── Session type ───────────────────────────────────────────────── */

export interface Session {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}
