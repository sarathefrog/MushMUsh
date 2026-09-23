import type { ProductRepository } from "../repositories/ProductRepository";
import type { Product, ProductType } from "../types";

const NOT_IMPL = "Not implemented — see lib/data/db/README.md";

export class DbProductRepository implements ProductRepository {
  async getProductTypes(): Promise<ProductType[]> {
    throw new Error(NOT_IMPL);
  }
  async getProductTypeBySlug(_slug: string): Promise<ProductType | null> {
    throw new Error(NOT_IMPL);
  }
  async getProducts(): Promise<Product[]> {
    throw new Error(NOT_IMPL);
  }
  async getProductsByType(_typeId: string): Promise<Product[]> {
    throw new Error(NOT_IMPL);
  }
  async getProductById(_id: string): Promise<Product | null> {
    throw new Error(NOT_IMPL);
  }
  async getProductBySlug(_slug: string): Promise<Product | null> {
    throw new Error(NOT_IMPL);
  }
  async getFeaturedProducts(_limit?: number): Promise<Product[]> {
    throw new Error(NOT_IMPL);
  }
}
