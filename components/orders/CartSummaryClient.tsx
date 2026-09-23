"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { strings } from "@/lib/strings";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Select } from "@/components/ui/Select";
import type { Region } from "@/lib/data/types";

interface CartSummaryClientProps {
  regions: Region[];
}

export function CartSummaryClient({ regions }: CartSummaryClientProps) {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">
          {strings.orderSummaryTitle}
        </h1>
        <p className="text-muted mb-8">{strings.orderSummaryEmptySub}</p>
        <Link href="/types">
          <Button>{strings.heroCta}</Button>
        </Link>
      </div>
    );
  }

  const selectedRegion = regions.find((r) => r.id === selectedRegionId);
  const shippingFee = selectedRegion?.shippingFee || 0;
  const total = subtotal + shippingFee;

  const handleContinue = () => {
    if (!selectedRegionId) return;
    // We could store region in cart context or local storage, but passing via URL is easy
    router.push(`/checkout?regionId=${selectedRegionId}`);
  };

  return (
    <div className="py-12 md:py-16">
      <h1 className="font-heading text-3xl font-bold mb-8">
        {strings.orderSummaryTitle}
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-6 py-6 border-b border-border last:border-0"
            >
              <div className="relative w-24 h-24 bg-surface rounded-card overflow-hidden shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-heading font-semibold text-lg">
                      {item.name}
                    </h3>
                    <p className="font-medium">{formatPrice(item.unitPrice)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-sm text-danger hover:opacity-80 transition-opacity"
                  >
                    {strings.orderSummaryRemove}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(q) => updateQuantity(item.productId, q)}
                  />
                  <p className="font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary side */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="sticky top-24">
            <h2 className="font-heading text-xl font-bold mb-6">Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{strings.orderSummarySubtotal}</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              <div className="border-t border-border pt-4">
                <Select
                  label={strings.orderSummaryRegion}
                  placeholder={strings.orderSummarySelectRegion}
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  options={regions.map((r) => ({
                    value: r.id,
                    label: `${r.name} (${formatPrice(r.shippingFee)})`,
                  }))}
                />
              </div>

              {selectedRegion && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{strings.orderSummaryShipping}</span>
                  <span className="font-medium">{formatPrice(shippingFee)}</span>
                </div>
              )}

              <div className="border-t border-border pt-4 flex justify-between font-bold">
                <span>{strings.orderSummaryTotal}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              size="lg"
              fullWidth
              disabled={!selectedRegionId}
              onClick={handleContinue}
            >
              {strings.orderSummaryContinue}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
