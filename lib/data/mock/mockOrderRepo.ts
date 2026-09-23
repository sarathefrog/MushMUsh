import type {
  OrderRepository,
  CreateOrderInput,
} from "../repositories/OrderRepository";
import type { Order, OrderStatus, Region } from "../types";
import { seedRegions } from "./seed";
import { getDB, saveDB } from "./persist";
import { generateId } from "@/lib/utils";

export class MockOrderRepository implements OrderRepository {
  async getRegions(): Promise<Region[]> {
    return seedRegions;
  }

  async getRegionById(id: string): Promise<Region | null> {
    return seedRegions.find((r) => r.id === id) || null;
  }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    const db = getDB();
    const now = new Date().toISOString();
    const order: Order = {
      id: `ord-${generateId().slice(0, 8)}`,
      userId: input.userId,
      items: input.items,
      regionId: input.regionId,
      address: input.address,
      note: input.note,
      subtotal: input.subtotal,
      shippingFee: input.shippingFee,
      total: input.total,
      currency: input.currency,
      status: "pending",
      proofPhotoUrl: null,
      createdAt: now,
      updatedAt: now,
    };
    db.orders.push(order);
    saveDB(db);
    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const db = getDB();
    return db.orders.find((o) => o.id === id) || null;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const db = getDB();
    return db.orders.filter((o) => o.userId === userId);
  }

  async getAllOrders(): Promise<Order[]> {
    const db = getDB();
    return [...db.orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<Order | null> {
    const db = getDB();
    const order = db.orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    saveDB(db);
    return order;
  }

  async updateOrderProof(
    id: string,
    proofPhotoUrl: string
  ): Promise<Order | null> {
    const db = getDB();
    const order = db.orders.find((o) => o.id === id);
    if (!order) return null;
    order.proofPhotoUrl = proofPhotoUrl;
    order.updatedAt = new Date().toISOString();
    saveDB(db);
    return order;
  }
}
