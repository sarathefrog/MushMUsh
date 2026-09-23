import Link from "next/link";
import Image from "next/image";
import { getProductRepo } from "@/lib/data";
import { strings } from "@/lib/strings";

export default async function TypesPage() {
  const productRepo = getProductRepo();
  const types = await productRepo.getProductTypes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-4xl font-bold tracking-tight mb-4">
        {strings.typesHeading}
      </h1>
      <p className="text-muted mb-12 max-w-2xl text-lg">
        Explore our curated collection by material type.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {types.map((type) => (
          <Link
            key={type.id}
            href={`/types/${type.slug}`}
            className="group relative rounded-card overflow-hidden h-64 md:h-80 bg-surface border border-border focus-ring flex flex-col justify-end"
          >
            <Image
              src={type.imageUrl}
              alt={type.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10 p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                {type.name}
              </h2>
              <p className="text-white/90 text-sm md:text-base">
                {type.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
