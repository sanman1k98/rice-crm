import { Hono } from 'hono';
import { serviceSchema } from './db/schemas';
import { createServiceDbClient } from './db/clients/service';

const api = new Hono()

api.get('/', (c) => c.text('Hello CRM!'))

api.get('/orgs', async (c) => {
  const db = createServiceDbClient();
  const orgs = await db.select().from(serviceSchema.organizations).all();
  return c.json(orgs);
})

export default api
