import { eq } from 'drizzle-orm';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { db as defaultDatabase } from '../database/connection';
import * as schema from '../database/schema';
import { ProductNotFound } from '../exceptions/ProductNotFound';
import type { Product } from '../interfaces/Product';
import type { ProductModel, ProductWithoutId } from '../interfaces/ProductModel';

export class ProductModelDrizzle implements ProductModel {
  #db: MySql2Database<typeof schema>;

  constructor(db = defaultDatabase) {
    this.#db = db;
  }

  async findAll(): Promise<Product[]> {
    return this.#db.query.products.findMany();
  }

  async findById(id: Product['id']): Promise<Product | null> {
    const result = await this.#db.query.products.findFirst({ where: eq(schema.products.id, id) });
    return result ?? null;
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const [{ insertId }] = await this.#db.insert(schema.products).values(product);
    const createdProduct = await this.findById(insertId);

    if (!createdProduct) throw new ProductNotFound();

    return createdProduct;
  }

  async delete(id: number): Promise<void> {
    await this.#db.delete(schema.products).where(eq(schema.products.id, id));
  }

  async update(id: number, data: Partial<ProductWithoutId>): Promise<Product> {
    const [{ insertId }] = await this.#db
      .update(schema.products)
      .set(data)
      .where(eq(schema.products.id, id));

    const updatedProduct = await this.findById(insertId);
    if (!updatedProduct) throw new ProductNotFound();

    return updatedProduct;
  }
}
