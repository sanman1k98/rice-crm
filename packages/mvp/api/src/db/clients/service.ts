import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { localServiceDbPath } from '../../../db-shared/utils';
import * as schema from '../schemas/service';

export function createServiceDbClient() {
	let url: string, authToken: string | undefined;
	if (import.meta.env.PROD) {
		url = import.meta.env.SERVICE_DB_URL!;
		authToken = import.meta.env.SERVICE_DB_AUTH_TOKEN!;
	} else {
		url = localServiceDbPath();
		authToken = undefined;
	}
	return drizzle(createClient({ url, authToken }), { schema });
}
