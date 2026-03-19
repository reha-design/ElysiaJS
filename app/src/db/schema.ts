import { mysqlTable, int, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

export const posts = mysqlTable('posts', {
  id: int('id').autoincrement().primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  content: text('content').notNull(),
  author: varchar('author', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// TypeScript 타입 추론
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
