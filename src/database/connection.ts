import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import dbCredentials from '../constants/dbCredentials';
import * as schema from './schema';

const connection = await mysql.createConnection(dbCredentials);
export const db = drizzle(connection, { schema, mode: 'default' });
