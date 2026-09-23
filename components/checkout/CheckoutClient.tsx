"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";
import { strings } from "@/lib/strings";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import type { Region, Session } from "@/lib/data/types";
import { createOrderAction } from "@/actions/orders";
import { guestCheckoutAction } from "@/actions/auth";
import Link from "next/link";

interface CheckoutClientProps {
  regions: Region[];
  session: Session | null;
}

export function CheckoutClient({ regions, session }: CheckoutClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialRegionId = searchParams.get("regionId") || "";

  const [formData, setFormData] = useState({
    name: session?.name || "",
    email: session?.email || "",
    regionId: initialRegionId,
    address: "",
    note: "",
  });

  const selectedRegion = regions.find((r) => r.id === formData.regionId);
  const shippingFee = selectedRegion?.shippingFee || 0;
  const total = subtotal + shippingFee;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/order-summary");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. If not logged in, create a guest session
      if (!session) {
        const guestRes = await guestCheckoutAction(formData.email, formData.name);
        if (!guestRes.success) {
          throw new Error("Failed to create guest session");
        }
      }

      // 2. Create the order
      const orderRes = await createOrderAction({
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
        })),
        regionId: formData.regionId,
        address: formData.address,
        note: formData.note,
        subtotal,
        shippingFee,
        total,
        currency: "USD",
      });

      if (!orderRes.success || !orderRes.order) {
        throw new Error(orderRes.error || "Failed to create order");
      }

      // 3. Clear cart and redirect to confirmation
      clearCart();
      router.push(`/orders/${orderRes.order.id}/confirmation`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  const isGuest = !session;

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-16">
      <h1 className="font-heading text-3xl font-bold mb-8">
        {strings.checkoutTitle}
      </h1>

      {error && (
        <div className="bg-danger/10 text-danger p-4 rounded-card mb-8">
          {error}
        </div>
      )}

      {isGuest && (
        <Card className="mb-8 border-blue/20 bg-blue/5">
          <p className="font-medium mb-4">{strings.checkoutLoginRequired}</p>
          <div className="flex gap-4">
            <Link href={`/login?redirect=/checkout`}>
              <Button variant="secondary">{strings.navLogin}</Button>
            </Link>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <h2 className="font-heading text-xl font-bold mb-6">
            {strings.checkoutContact}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={strings.checkoutName}
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!!session}
            />
            <Input
              label={strings.checkoutEmail}
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!!session}
            />
          </div>
          {isGuest && (
            <p className="text-xs text-muted mt-4">
              {strings.checkoutGuestEmail}
            </p>
          )}
        </Card>

        <Card>
          <h2 className="font-heading text-xl font-bold mb-6">
            {strings.checkoutDelivery}
          </h2>
          <div className="space-y-6">
            <Select
              label={strings.checkoutRegion}
              required
              value={formData.regionId}
              onChange={(e) =>
                setFormData({ ...formData, regionId: e.target.value })
              }
              options={regions.map((r) => ({
                value: r.id,
                label: `${r.name} (${formatPrice(r.shippingFee)})`,
              }))}
            />
            <Textarea
              label={strings.checkoutAddress}
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <Textarea
              label={strings.checkoutNote}
              placeholder={strings.checkoutNotePlaceholder}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>
        </Card>

        <Card className="bg-lime/10 border-lime/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-muted text-sm">{strings.orderSummaryTotal}</p>
              <p className="font-heading text-2xl font-bold text-primary">
                {formatPrice(total)}
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading || !formData.regionId}
              className="w-full sm:w-auto"
            >
              {loading ? strings.loading : strings.checkoutPlaceOrder}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
