import { getProductRepo } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";
import { strings } from "@/lib/strings";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TypeSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const productRepo = getProductRepo();
  const type = await productRepo.getProductTypeBySlug(slug);

  if (!type) {
    notFound();
  }

  const products = await productRepo.getProductsByType(type.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-12">
        <Link
          href="/types"
          className="text-sm font-medium text-muted hover:text-primary transition-colors mb-4 inline-block"
        >
          ← {strings.navTypes}
        </Link>
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">
          {type.name}
        </h1>
        <p className="text-muted max-w-2xl text-lg">{type.description}</p>
      </div>

      {products.length === 0 ? (
        <div className="py-12 text-center bg-surface rounded-card border border-border">
          <p className="text-muted">{strings.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
