import { Hero } from "@/components/home/Hero";
import { ProductTypesRow } from "@/components/home/ProductTypesRow";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { getProductRepo } from "@/lib/data";

export default async function Home() {
  const productRepo = getProductRepo();
  const types = await productRepo.getProductTypes();
  const featured = await productRepo.getFeaturedProducts(6);
  
  // Pick one for the hero (e.g. the first one)
  const heroProduct = featured[0];

  return (
    <>
      {heroProduct && <Hero featured={heroProduct} />}
      <ProductTypesRow types={types} />
      <FeaturedGrid products={featured.slice(1, 4)} />
    </>
  );
}
