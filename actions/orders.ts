"use server";

import { getOrderRepo, getStorageRepo, getAuthService } from "@/lib/data";
import type { CreateOrderInput } from "@/lib/data";
import type { Order, OrderStatus } from "@/lib/data/types";

export async function createOrderAction(
  input: Omit<CreateOrderInput, "userId">
): Promise<{ success: boolean; order?: Order; error?: string }> {
  const auth = getAuthService();
  const session = await auth.getSession();

  if (!session) {
    return { success: false, error: "Not authenticated." };
  }

  const orderRepo = getOrderRepo();
  const order = await orderRepo.createOrder({
    ...input,
    userId: session.userId,
  });

  return { success: true, order };
}

export async function getOrderAction(
  id: string
): Promise<Order | null> {
  const orderRepo = getOrderRepo();
  return orderRepo.getOrderById(id);
}

export async function uploadProofAction(
  orderId: string,
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get("proof") as File | null;
  if (!file) {
    return { success: false, error: "No file provided." };
  }

  const storageRepo = getStorageRepo();
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `proof-${orderId}.${ext}`;
  const url = await storageRepo.upload(file, filename);

  const orderRepo = getOrderRepo();
  await orderRepo.updateOrderProof(orderId, url);

  return { success: true, url };
}

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus
): Promise<{ success: boolean; error?: string }> {
  const auth = getAuthService();
  const session = await auth.getSession();

  if (!session || session.role !== "admin") {
    return { success: false, error: "Unauthorized." };
  }

  const orderRepo = getOrderRepo();
  const updated = await orderRepo.updateOrderStatus(orderId, status);

  if (!updated) {
    return { success: false, error: "Order not found." };
  }

  return { success: true };
}
