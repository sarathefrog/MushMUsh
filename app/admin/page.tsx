import { getOrderRepo, getUserRepo } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default async function AdminDashboard() {
  const orderRepo = getOrderRepo();
  const userRepo = getUserRepo();

  const orders = await orderRepo.getAllOrders();
  const users = await userRepo.getAllUsers();

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-surface border-border">
          <p className="text-sm text-muted mb-1">Total Revenue</p>
          <p className="font-heading text-2xl font-bold text-primary">
            {formatPrice(totalRevenue)}
          </p>
        </Card>
        <Card className="bg-surface border-border">
          <p className="text-sm text-muted mb-1">Total Orders</p>
          <p className="font-heading text-2xl font-bold text-primary">
            {orders.length}
          </p>
        </Card>
        <Card className="bg-surface border-border">
          <p className="text-sm text-muted mb-1">Pending Orders</p>
          <p className="font-heading text-2xl font-bold text-primary">
            {pendingOrders}
          </p>
        </Card>
        <Card className="bg-surface border-border">
          <p className="text-sm text-muted mb-1">Total Customers</p>
          <p className="font-heading text-2xl font-bold text-primary">
            {users.length}
          </p>
        </Card>
      </div>

      <h2 className="font-heading text-xl font-bold mb-4">Recent Orders</h2>
      <div className="bg-surface rounded-card border border-border overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-black/5 text-muted">
            <tr>
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-white transition-colors">
                <td className="py-3 px-4 font-mono text-xs">{order.id}</td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
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
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
