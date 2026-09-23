import type { OrderRepository, CreateOrderInput } from "../repositories/OrderRepository";
import type { Order, OrderStatus, Region } from "../types";

const NOT_IMPL = "Not implemented — see lib/data/db/README.md";

export class DbOrderRepository implements OrderRepository {
  async getRegions(): Promise<Region[]> { throw new Error(NOT_IMPL); }
  async getRegionById(_id: string): Promise<Region | null> { throw new Error(NOT_IMPL); }
  async createOrder(_input: CreateOrderInput): Promise<Order> { throw new Error(NOT_IMPL); }
  async getOrderById(_id: string): Promise<Order | null> { throw new Error(NOT_IMPL); }
  async getOrdersByUserId(_userId: string): Promise<Order[]> { throw new Error(NOT_IMPL); }
  async getAllOrders(): Promise<Order[]> { throw new Error(NOT_IMPL); }
  async updateOrderStatus(_id: string, _status: OrderStatus): Promise<Order | null> { throw new Error(NOT_IMPL); }
  async updateOrderProof(_id: string, _proofPhotoUrl: string): Promise<Order | null> { throw new Error(NOT_IMPL); }
}
