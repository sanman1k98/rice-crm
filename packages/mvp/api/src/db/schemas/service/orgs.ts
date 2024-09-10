/**
 * Copied from Turso's instructional blog post.
 *
 * @see https://turso.tech/blog/creating-a-multitenant-saas-service-with-turso-remix-and-drizzle-6205cf47
 * @see https://turso.tech/blog/speeding-up-a-remix-website-with-tursos-embedded-replicas-hosted-on-akamais-linode-e5e5a738
 */

import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const organizations = sqliteTable(
  'organizations',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    website: text('website').notNull(),
    username: text('username').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    logo: text('logo'),
    dbUrl: text('db_url'),
    createdAt: integer('created_at').default(sql`(cast(unixepoch() as int))`),
    updatedAt: integer('updated_at').default(sql`(cast(unixepoch() as int))`),
  },
  (authors) => ({
    emailIdx: uniqueIndex('email_idx').on(authors.email),
    usernameIdx: uniqueIndex('username_idx').on(authors.username),
    nameIdx: index('name_idx').on(authors.name),
  }),
);
