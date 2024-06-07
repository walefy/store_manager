import { eq } from 'drizzle-orm';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { db as defaultDatabase } from '../database/connection';
import * as schema from '../database/schema';
import { SaleNotFound } from '../exceptions/SaleNotFound';
import type { Sale } from '../interfaces/Sale';
import type { SaleModel, SaleWithoutId } from '../interfaces/SaleModel';

export class SaleModelDrizzle implements SaleModel {
  #db: MySql2Database<typeof schema>;

  constructor(db = defaultDatabase) {
    this.#db = db;
  }

  async findAll(): Promise<Sale[]> {
    return this.#db.query.sales.findMany();
  }

  async findById(id: Sale['id']): Promise<Sale | null> {
    const result = await this.#db.query.sales.findFirst({ where: eq(schema.products.id, id) });
    return result ?? null;
  }

  async create(sale: SaleWithoutId): Promise<Sale> {
    const [{ insertId }] = await this.#db.insert(schema.sales).values(sale);
    const createdSale = await this.findById(insertId);

    if (!createdSale) throw new SaleNotFound();

    return createdSale;
  }

  async delete(id: Sale['id']): Promise<void> {
    await this.#db.delete(schema.sales).where(eq(schema.sales.id, id));
  }

  async update(id: number, data: Partial<SaleWithoutId>): Promise<Sale> {
    const [{ insertId }] = await this.#db
      .update(schema.sales)
      .set(data)
      .where(eq(schema.products.id, id));

    const updatedSale = await this.findById(insertId);
    if (!updatedSale) throw new SaleNotFound();

    return updatedSale;
  }
}
