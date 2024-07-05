import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // Use `export const prerender = false` on pages that should be
  // server-rendered on-demand.
  output: "hybrid",
  // TODO: Investigate running an Astro project in middleware mode.
  // - https://docs.astro.build/en/guides/integrations-guide/node/#middleware
  // TODO: Investigate using SST v3 (Ion) for deployments on AWS or Cloudflare.
  // - https://ion.sst.dev/docs/
  // - https://ion.sst.dev/docs/start/aws/astro/
  adapter: node({ mode: "standalone" }),
  integrations: [
    tailwind({
      // Support CSS nesting in Astro `<style>` tags.
      nesting: true,
    }),
    // NOTE: Astro DB is a fully managed SQL DB designed exclusively for Astro.
    //
    // It has a TypeScript ORM (Drizzle), schema management, and automatic
    // schema migrations. It uses a libSQL (an improved fork of SQLite) and
    // offers a hosted libSQL database powered by Turso.
    //
    // Astro DB:
    // - https://astro.build/blog/astro-db/
    // - https://astro.build/blog/astro-db-deep-dive/
    // - https://docs.astro.build/en/guides/astro-db/
    // - https://docs.astro.build/en/guides/astro-db/#self-hosted-production-deployment
    // - https://docs.astro.build/en/guides/integrations-guide/db/
    //
    // Turso and libSQL;
    // - https://turso.tech
    // - https://github.com/tursodatabase/libsql
    //
    // Drizzle ORM (included with Astro DB):
    // - https://orm.drizzle.team
    // - https://orm.drizzle.team/docs/overview
    db(),
  ],
  security: {
    // Enable CSRF for Lucia auth.
    checkOrigin: true,
  },
  experimental: {
    // Will be the default in Astro 5.0.
    directRenderScript: true,
  }
});
