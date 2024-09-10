import { defineConfig } from 'drizzle-kit';
import { relativeFromCwd } from '../db-shared/utils';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  schema: relativeFromCwd(new URL('../src/db/schemas/org/index.ts', import.meta.url)),
  out: relativeFromCwd(new URL('./migrations', import.meta.url)),
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_AUTH_TOKEN!,
  }
})
