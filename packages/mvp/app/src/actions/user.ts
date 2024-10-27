/**
 * @file Actions for signup, signin, and signout. Adapted from Lucia's Email and password with 2FA
 * in Astro example project.
 *
 * @see https://github.com/lucia-auth/example-astro-email-password-2fa/blob/main/src/pages/api/user/index.ts
 * @see https://github.com/lucia-auth/example-astro-email-password-2fa/blob/main/src/pages/api/session.ts
 */
import { createSession, deleteSessionTokenCookie, generateSessionToken, invalidateSession, setSessionTokenCookie } from '@/lib/sessions';
import { hash, verify } from '@node-rs/argon2';
import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';
import { ActionError, defineAction } from 'astro:actions';
import { db, eq, sql, User } from 'astro:db';
import { z } from 'astro:schema';

const usernameSchema = z.string()
	.min(3, { message: 'Username must be 3 or more characters long' })
	.max(31, { message: 'Username must be 31 or fewer characters long' })
	.regex(/^[a-z0-9_-]+$/, { message: 'Invalid characters in username' });

const passwordSchema = z.string()
	.min(6, { message: 'Password must be 6 or more characters long' })
	.max(255, { message: 'Password must be 255 or fewer characters long' });

const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const random: RandomReader = {
	read(bytes) {
		crypto.getRandomValues(bytes);
	},
};

function generateUserId() {
	return generateRandomString(random, alphanumeric, 16);
}

async function hashPassword(password: string): Promise<string> {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
}

const selectUser = db
	.select()
	.from(User)
	.where(eq(User.username, sql.placeholder('username')))
	.prepare();

/**
 * ```http
 * POST /api/user
 * ```
 */
const signup = defineAction({
	accept: 'form',
	input: z.strictObject({
		fullname: z.string(),
		username: usernameSchema,
		password: passwordSchema,
	}),
	handler: async ({ fullname, username, password }, ctx) => {
		// TODO: rate limiting

		const existingUser = await selectUser.get({ username });

		const newUserId = generateUserId();
		const passwordHash = await hashPassword(password);

		if (existingUser) {
			throw new ActionError({
				code: 'BAD_REQUEST',
				message: 'Username taken',
			});
		}

		await db
			.insert(User)
			.values({
				id: newUserId,
				fullname,
				username,
				password_hash: passwordHash,
			});

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, newUserId);
		setSessionTokenCookie(ctx, sessionToken, session.expiresAt);
	},
});

/**
 * ```http
 * POST /api/user/session
 * ```
 */
const login = defineAction({
	accept: 'form',
	input: z.strictObject({
		username: usernameSchema,
		password: passwordSchema,
	}),
	handler: async ({ username, password }, ctx) => {
		const user = await selectUser.get({ username });
		if (!user) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
				message: 'Incorrect username or password',
			});
		}

		const validPassword = await verify(user.password_hash, password);
		if (!validPassword) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
				message: 'Incorrect username or password',
			});
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(ctx, sessionToken, session.expiresAt);
	},
});

/**
 * ```http
 * DELETE /api/user/session
 * ```
 */
const logout = defineAction({
	accept: 'form',
	input: z.any(),
	handler: async (_input, ctx) => {
		if (ctx.locals.session === null) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
			});
		}
		invalidateSession(ctx.locals.session.id);
		deleteSessionTokenCookie(ctx);
	},
});

export const user = {
	signup,
	login,
	logout,
};
