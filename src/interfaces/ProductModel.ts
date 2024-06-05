import type { Product } from './Product';

export type ProductWithoutId = Omit<Product, 'id'>;

export interface ProductModel {
  findAll(): Promise<Product[]>;
  findById(id: Product['id']): Promise<Product | null>;
  create(product: ProductWithoutId): Promise<unknown>;
  delete(id: Product['id']): Promise<void>;
  update(id: Product['id'], data: Partial<ProductWithoutId>): Promise<Product>;
}
