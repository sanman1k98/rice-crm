# MVP

## Tech stack

- [Astro](https://astro.build): an ["all-in-one"](https://docs.astro.build/en/concepts/why-astro/#features) JavaScript web-framework.
  - [File-based routing](https://docs.astro.build/en/guides/routing/).
  - [Server endpoints for API routes](https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes).
  - Create [components](https://docs.astro.build/en/basics/astro-components/) with Astro's simple [templating syntax](https://docs.astro.build/en/basics/astro-syntax/).
  - [Official support for every major UI framework](https://docs.astro.build/en/guides/integrations-guide/#official-integrations).
  - [Offical Node.js SSR adapter](https://docs.astro.build/en/guides/integrations-guide/node/) for deploying to Node targets.
  - Node adapter supports both [standalone mode or middleware mode](https://docs.astro.build/en/guides/integrations-guide/node/#usage).
- [Astro DB](https://docs.astro.build/en/guides/astro-db/): a simple SQLite-powered DB built for specifically for Astro.
  - [Define the database](https://docs.astro.build/en/guides/astro-db/#define-your-database): tables, column types, and table references.
  - For local development, a SQLite DB file is created using [LibSQL](https://github.com/tursodatabase/libsql); no need for Docker or a network connection.
  - Includes a built-in [Drizzle ORM](https://orm.drizzle.team) client.
  - Astro DB can be [self-hosted in production](https://docs.astro.build/en/guides/astro-db/#self-hosted-production-deployment).
- [Lucia](https://lucia-auth.com): framework-agnostic, session-based authentication library.
  - Supports [multiple OAuth providers](https://lucia-auth.com/guides/oauth/multiple-providers) with [Arctic](https://arcticjs.dev)
