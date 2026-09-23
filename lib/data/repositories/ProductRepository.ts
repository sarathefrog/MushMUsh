import type { Product, ProductType } from "../types";

export interface ProductRepository {
  getProductTypes(): Promise<ProductType[]>;
  getProductTypeBySlug(slug: string): Promise<ProductType | null>;
  getProducts(): Promise<Product[]>;
  getProductsByType(typeId: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
}
