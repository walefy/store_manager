import type { Product } from './Product';
import type { Sale } from './Sale';

export type SaleWithoutId = Omit<Sale, 'id'>;
export type SaleWithProduct = Sale & {
  salesProducts: {
    productId: number;
    saleId: number;
  }[];
};

export type SaleWithProducts = {
  id: Sale['id'];
  products: Product[];
};

export interface SaleModel {
  findAll(): Promise<Sale[]>;
  findById(id: Sale['id']): Promise<Sale | null>;
  create(Sale: SaleWithoutId, productIds: number[]): Promise<SaleWithProducts[]>;
  delete(id: Sale['id']): Promise<void>;
  update(id: Sale['id'], data: Partial<SaleWithoutId>): Promise<Sale>;
}
