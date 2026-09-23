import type { ProductRepository } from "../repositories/ProductRepository";
import type { Product, ProductType } from "../types";
import { seedProductTypes, seedProducts } from "./seed";

export class MockProductRepository implements ProductRepository {
  async getProductTypes(): Promise<ProductType[]> {
    return seedProductTypes;
  }

  async getProductTypeBySlug(slug: string): Promise<ProductType | null> {
    return seedProductTypes.find((t) => t.slug === slug) || null;
  }

  async getProducts(): Promise<Product[]> {
    return seedProducts;
  }

  async getProductsByType(typeId: string): Promise<Product[]> {
    return seedProducts.filter((p) => p.typeId === typeId);
  }

  async getProductById(id: string): Promise<Product | null> {
    return seedProducts.find((p) => p.id === id) || null;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return seedProducts.find((p) => p.slug === slug) || null;
  }

  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    // Return a deterministic subset
    return seedProducts.slice(0, limit);
  }
}
