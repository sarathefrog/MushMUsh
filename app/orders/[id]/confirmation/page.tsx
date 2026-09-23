import { getOrderRepo, getAuthService } from "@/lib/data";
import { notFound, redirect } from "next/navigation";
import { strings } from "@/lib/strings";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ProofUpload } from "@/components/orders/ProofUpload";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { id } = await params;
  const orderRepo = getOrderRepo();
  const auth = getAuthService();

  const session = await auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const order = await orderRepo.getOrderById(id);
  
  if (!order || order.userId !== session.userId) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-16 px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-lime text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold mb-4">
          {strings.orderConfirmedTitle}
        </h1>
        <p className="text-muted max-w-xl mx-auto">
          {strings.orderConfirmedSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h2 className="font-heading text-xl font-bold mb-6">Order Details</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Order Number</span>
              <span className="font-medium font-mono">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Status</span>
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>

          <div className="border-t border-border pt-4 mb-6">
            <h3 className="font-medium mb-4">Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-muted">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="font-medium">{formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </Card>

        <div>
          {order.proofPhotoUrl ? (
            <Card className="bg-surface border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue/10 text-blue rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">
                Proof Uploaded
              </h3>
              <p className="text-sm text-muted mb-6">
                We'll review your payment and confirm shipping shortly.
              </p>
              <div className="relative w-full aspect-video rounded-input overflow-hidden border border-border">
                <Image
                  src={order.proofPhotoUrl}
                  alt="Payment proof"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          ) : (
            <ProofUpload orderId={order.id} onSuccess={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}
