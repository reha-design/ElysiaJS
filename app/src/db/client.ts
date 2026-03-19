import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// mysql2 커넥션 풀 생성
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

// Drizzle 클라이언트 (스키마 포함)
export const db = drizzle(pool, { schema, mode: 'default' });
