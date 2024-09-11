import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client'
import { localServiceDbPath } from 'db-shared/utils';
import { serviceSchema } from "../src/db/schemas";

const db = drizzle(
  createClient({ url: localServiceDbPath() }),
  { schema: serviceSchema },
);

const newAccount = await db
  .insert(serviceSchema.organizations)
  .values({
    name: 'test',
    email: 'test@example.com',
    website: 'example.com',
    username: 'test',
    password: 'gonna hash these dont worry lol',
    id: 'test',
  })
  .returning()
  .get();

console.log(newAccount);
