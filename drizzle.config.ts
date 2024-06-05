import { defineConfig } from 'drizzle-kit';
import dbCredentials from './src/constants/dbCredentials';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dbCredentials,
});
