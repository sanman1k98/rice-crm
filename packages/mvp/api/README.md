# Database-per-tenant CRM API

> [!WARNING]
> WORK IN PROGRESS

## Tech stack

- [Hono](https://hono.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [libsql and Turso](https://turso.tech)
  - [Turso's database per tenant](https://turso.tech/database-per-tenant)
- [Lucia](https://lucia-auth.com): framework-agnostic, session-based authentication library.
  - Supports [multiple OAuth providers](https://lucia-auth.com/guides/oauth/multiple-providers) with [Arctic](https://arcticjs.dev)

## Resources

### Example apps

- Turso CRM
  - Instructional blog post: [Creating a multitenant SaaS service with Turso, Remix, and Drizzle](https://turso.tech/blog/creating-a-multitenant-saas-service-with-turso-remix-and-drizzle-6205cf47)
  - [GitHub repo](https://github.com/tursodatabase/examples/tree/master/app-turso-crm)
- Turso CRM with embedded replicas
  - Follow up blog post: [Speeding up a Remix website with Turso's embedded replicas hosted on Akamai's Linode](https://turso.tech/blog/speeding-up-a-remix-website-with-tursos-embedded-replicas-hosted-on-akamais-linode-e5e5a738)
  - [GitHub repo](https://github.com/tursodatabase/examples/tree/master/app-turso-crm-er)
- Drizzle ORM example using Hono and libsql/Turso
  - [GitHub repo](https://github.com/drizzle-team/drizzle-orm/tree/main/examples/libsql)
- Turso Per User Starter
  - Blog post: [Introducing the Turso Per-User Starter](https://turso.tech/blog/introducing-the-turso-per-user-starter-boilerplate)
  - [GitHub repo](https://github.com/notrab/turso-per-user-starter)

### API documentation of popular services

- HubSpot:
  - [Understanding the CRM](https://developers.hubspot.com/docs/api/crm/understanding-the-crm)
  - Object overviews and API endpoints:
    - [Companies](https://developers.hubspot.com/docs/api/crm/companies) (also called *Accounts* in other CRMs)
    - [Contacts](https://developers.hubspot.com/docs/api/crm/contacts)
    - [Deals](https://developers.hubspot.com/docs/api/crm/deals) (also called *Opportunities* in other CRMs)
    - [Tasks](https://developers.hubspot.com/docs/api/crm/tasks)
    - [Notes](https://developers.hubspot.com/docs/api/crm/notes)
    - [Communications](https://developers.hubspot.com/docs/api/crm/communications)
- [GitHub's REST API](https://docs.github.com/en/rest/about-the-rest-api/about-the-rest-api?apiVersion=2022-11-28)
  - [Organizations](https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28)
  - [Issues](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28)

### Misc

- O'Reilly book: [RESTful Web Services](https://www.oreilly.com/library/view/restful-web-services/9780596529260/)
- Google Cloud documentation: [Resource-oriented design](https://cloud.google.com/apis/design/resources)
