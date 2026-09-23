import Link from "next/link";
import { strings } from "@/lib/strings";
import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/products/ProductCard";

interface FeaturedGridProps {
  products: Product[];
}

export function FeaturedGrid({ products }: FeaturedGridProps) {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
            {strings.featuredHeading}
          </h2>
          <Link
            href="/types"
            className="text-sm font-medium text-blue hover:text-blue-hover transition-colors focus-ring rounded-input px-2 py-1"
          >
            {strings.featuredViewAll} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
