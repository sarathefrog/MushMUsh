import type { Order, OrderStatus, Region } from "../types";

export interface CreateOrderInput {
  userId: string;
  items: Order["items"];
  regionId: string;
  address: string;
  note: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: string;
}

export interface OrderRepository {
  getRegions(): Promise<Region[]>;
  getRegionById(id: string): Promise<Region | null>;
  createOrder(input: CreateOrderInput): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null>;
  updateOrderProof(id: string, proofPhotoUrl: string): Promise<Order | null>;
}
