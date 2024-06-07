import type { Sale } from './Sale';

export type SaleWithoutId = Omit<Sale, 'id'>;

export interface SaleModel {
  findAll(): Promise<Sale[]>;
  findById(id: Sale['id']): Promise<Sale | null>;
  create(Sale: SaleWithoutId): Promise<unknown>;
  delete(id: Sale['id']): Promise<void>;
  update(id: Sale['id'], data: Partial<SaleWithoutId>): Promise<Sale>;
}
