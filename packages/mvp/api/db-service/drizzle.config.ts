import { defineConfig } from 'drizzle-kit';
import { localServiceDbPath, relativeFromCwd } from '../db-shared/utils';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  schema: relativeFromCwd(new URL('./schema/index.ts', import.meta.url)),
  out: relativeFromCwd(new URL('./migrations', import.meta.url)),
  dbCredentials: {
    url: process.env.SERVICE_DB_URL ?? localServiceDbPath(),
    authToken: process.env.SERVICE_DB_AUTH_TOKEN!,
  }
})
