"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/lib/hooks/useCart";
import { strings } from "@/lib/strings";

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  open,
  onClose,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setQuantity(1); // Reset for next time
    }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose} className="p-0 max-w-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image side with lime background */}
        <div className="w-full md:w-1/2 bg-surface relative aspect-square md:aspect-auto border-b md:border-b-0 md:border-r border-border p-8 flex items-center justify-center overflow-hidden">
          {/* Lime circle accent */}
          <div className="absolute w-64 h-64 rounded-full bg-lime/20 blur-2xl" />
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover relative z-10"
          />
        </div>

        {/* Details side */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col bg-white/80">
          <p className="label mb-2">{product.era}</p>
          <h2 className="font-heading text-2xl font-bold text-primary mb-2">
            {product.name}
          </h2>
          <p className="text-xl font-medium text-primary mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-sm text-muted mb-6 flex-1">{product.story}</p>

          <div className="space-y-3 text-sm mb-8 border-y border-border py-4">
            <div className="flex justify-between">
              <span className="text-muted">{strings.productMaterial}</span>
              <span className="font-medium text-primary text-right">
                {product.material}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">{strings.productDimensions}</span>
              <span className="font-medium text-primary text-right">
                {product.dimensions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">{strings.productCondition}</span>
              <span className="font-medium text-primary text-right">
                {product.condition}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {product.stock > 0
                  ? `${product.stock} ${strings.productStock}`
                  : strings.productOutOfStock}
              </span>
              {product.stock > 0 && (
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                />
              )}
            </div>

            <Button
              size="lg"
              fullWidth
              disabled={product.stock === 0 || added}
              onClick={handleAddToCart}
            >
              {added ? strings.productAdded : strings.productAddToOrder}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
