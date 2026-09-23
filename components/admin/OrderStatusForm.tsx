"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatusAction } from "@/actions/orders";
import type { OrderStatus } from "@/lib/data/types";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface OrderStatusFormProps {
  orderId: string;
  initialStatus: OrderStatus;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function OrderStatusForm({ orderId, initialStatus }: OrderStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await updateOrderStatusAction(orderId, status);
      if (!res.success) {
        throw new Error(res.error || "Update failed");
      }
      setMessage("Status updated successfully.");
      router.refresh();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Select
            label="Order Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            options={STATUS_OPTIONS}
          />
        </div>
        <Button
          onClick={handleUpdate}
          disabled={loading || status === initialStatus}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
      {message && (
        <p
          className={`text-sm ${
            message.includes("failed") ? "text-danger" : "text-primary"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
