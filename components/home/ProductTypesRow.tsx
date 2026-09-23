import Link from "next/link";
import Image from "next/image";
import { strings } from "@/lib/strings";
import type { ProductType } from "@/lib/data/types";

interface ProductTypesRowProps {
  types: ProductType[];
}

export function ProductTypesRow({ types }: ProductTypesRowProps) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-8">
          {strings.typesHeading}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {types.map((type) => (
            <Link
              key={type.id}
              href={`/types/${type.slug}`}
              className="group relative rounded-card overflow-hidden aspect-square bg-surface border border-border focus-ring transition-all duration-[--transition-normal] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <Image
                src={type.imageUrl}
                alt={type.name}
                fill
                className="object-cover transition-transform duration-[--transition-normal] group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 glass p-3">
                <p className="font-heading text-sm font-semibold">
                  {type.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
