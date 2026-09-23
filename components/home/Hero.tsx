import Link from "next/link";
import Image from "next/image";
import { strings } from "@/lib/strings";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";

interface HeroProps {
  featured: Product;
}

export function Hero({ featured }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <p className="label">{strings.siteName}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-primary">
              {strings.heroHeading}
            </h1>
            <p className="text-lg text-muted max-w-md">
              {strings.heroSubheading}
            </p>
            <Link href="/types">
              <Button size="lg">{strings.heroCta}</Button>
            </Link>
          </div>

          {/* Featured product with lime circle behind */}
          <div className="relative flex items-center justify-center">
            {/* Acid lime circle */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-lime" />

            {/* Glass card over the circle */}
            <GlassPanel className="relative z-10 max-w-sm w-full" padding="lg">
              <div className="relative w-full aspect-square mb-4 rounded-card overflow-hidden bg-surface">
                <Image
                  src={featured.imageUrl}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="label mb-1">{featured.era}</p>
              <h3 className="font-heading text-lg font-semibold">
                {featured.name}
              </h3>
              <p className="text-muted text-sm mt-1">
                {formatPrice(featured.price)}
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
