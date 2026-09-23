"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";
import { ProductDetailModal } from "./ProductDetailModal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { strings } from "@/lib/strings";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card
        padding="none"
        hoverable
        onClick={() => setModalOpen(true)}
        className="group overflow-hidden flex flex-col bg-white h-full"
      >
        <div className="relative w-full aspect-square bg-surface border-b border-border p-4 flex items-center justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[--transition-normal] group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="muted">{strings.productOutOfStock}</Badge>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="label mb-1">{product.era}</p>
              <h3 className="font-heading text-base font-semibold text-primary">
                {product.name}
              </h3>
            </div>
            <p className="text-sm font-medium text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Card>

      <ProductDetailModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
