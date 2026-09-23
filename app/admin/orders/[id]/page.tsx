import { getOrderRepo, getUserRepo } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const orderRepo = getOrderRepo();
  const userRepo = getUserRepo();

  const order = await orderRepo.getOrderById(id);
  if (!order) {
    notFound();
  }

  const user = await userRepo.getUserById(order.userId);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-muted hover:text-primary transition-colors mb-4 inline-block"
        >
          ← Back to Orders
        </Link>
        <h1 className="font-heading text-3xl font-bold">Order {order.id}</h1>
        <p className="text-muted">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h2 className="font-heading text-xl font-bold mb-6">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between py-4 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">
                      {item.quantity} × {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span>{formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="font-heading text-xl font-bold mb-6">
              Payment Proof
            </h2>
            {order.proofPhotoUrl ? (
              <div>
                <a
                  href={order.proofPhotoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block relative w-full max-w-md aspect-video rounded-input overflow-hidden border border-border hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={order.proofPhotoUrl}
                    alt="Payment proof"
                    fill
                    className="object-cover"
                  />
                </a>
                <p className="text-sm text-muted mt-2">
                  Click image to open in new tab
                </p>
              </div>
            ) : (
              <p className="text-muted">No payment proof uploaded yet.</p>
            )}
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <h2 className="font-heading text-xl font-bold mb-4">Status</h2>
            <OrderStatusForm orderId={order.id} initialStatus={order.status} />
          </Card>

          <Card>
            <h2 className="font-heading text-xl font-bold mb-4">Customer</h2>
            {user ? (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted">Name:</span> {user.name}
                </p>
                <p>
                  <span className="text-muted">Email:</span> {user.email}
                </p>
                <p>
                  <span className="text-muted">User ID:</span>{" "}
                  <span className="font-mono">{user.id}</span>
                </p>
              </div>
            ) : (
              <p className="text-muted">Customer not found.</p>
            )}
          </Card>

          <Card>
            <h2 className="font-heading text-xl font-bold mb-4">Delivery</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted mb-1">Address</p>
                <p className="whitespace-pre-wrap">{order.address}</p>
              </div>
              {order.note && (
                <div>
                  <p className="text-muted mb-1">Order Note</p>
                  <p className="whitespace-pre-wrap italic">"{order.note}"</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
