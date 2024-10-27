import type { MiddlewareHandler } from 'astro';
import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from './lib/sessions';

/**
 * Validate user requests with Lucia.
 *
 * @see https://lucia-auth.com/getting-started/astro
 */
const auth: MiddlewareHandler = async (context, next) => {
	const token = context.cookies.get('session')?.value ?? null;
	if (token === null) {
		context.locals.user = null;
		context.locals.session = null;
		return next();
	}

	const { session, user } = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(context, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(context);
	}

	context.locals.session = session;
	context.locals.user = user;
	return next();
};

// TODO: Validate requests only on certain routes.
export const onRequest = auth;
