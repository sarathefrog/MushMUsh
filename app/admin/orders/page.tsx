import { getOrderRepo } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orderRepo = getOrderRepo();
  const orders = await orderRepo.getAllOrders();

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">All Orders</h1>

      <div className="bg-surface rounded-card border border-border overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-black/5 text-muted">
            <tr>
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Customer (User ID)</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border last:border-0 hover:bg-white transition-colors"
              >
                <td className="py-3 px-4 font-mono text-xs">{order.id}</td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-mono text-xs truncate max-w-[120px]">
                  {order.userId}
                </td>
                <td className="py-3 px-4 font-medium">
                  {formatPrice(order.total)}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant={
                      order.status === "pending"
                        ? "muted"
                        : order.status === "cancelled"
                        ? "danger"
                        : "lime"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-blue hover:underline font-medium"
                  >
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
