/**
 * @file Defines tables for users and sessions.
 *
 * @see https://lucia-auth.com/database/drizzle
 * @see https://github.com/tursodatabase/examples/blob/master/app-turso-crm-er/drizzle/org-schema.ts
 */

import { sql } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const members = sqliteTable(
  'members',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    createdAt: integer("created_at").default(sql`(cast(unixepoch() as int))`),
    updatedAt: integer("updated_at").default(sql`(cast(unixepoch() as int))`),
  },
  (members) => ({
    emailIdx: uniqueIndex('email_idx').on(members.email),
  }),
);

export const sessions = sqliteTable('sessions',
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => members.id),
    expiresAt: integer("expires_at").notNull()
  }, 
  (sessions) => ({
    userIdx: uniqueIndex('user_idx').on(sessions.userId),
  })
);
