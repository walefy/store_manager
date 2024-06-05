import { relations, sql } from 'drizzle-orm';
import { datetime, int, mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 30 }).notNull(),
});

export const sales = mysqlTable('sales', {
  id: int('id').primaryKey(),
  date: datetime('date').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const salesProducts = mysqlTable(
  'sales_products',
  {
    productId: int('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    saleId: int('sale_id')
      .notNull()
      .references(() => sales.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.saleId] }),
  }),
);

export const salesRelations = relations(sales, ({ many }) => ({
  salesProducts: many(salesProducts),
}));

export const productsRelations = relations(products, ({ many }) => ({
  salesProducts: many(salesProducts),
}));

export const salesProductsRelations = relations(salesProducts, ({ one }) => ({
  group: one(sales, { fields: [salesProducts.saleId], references: [sales.id] }),
  product: one(products, { fields: [salesProducts.productId], references: [products.id] }),
}));
