import type { APIRoute } from 'astro';
import { db, eq, User } from 'astro:db';

export const GET: APIRoute<never, { username: string }> = async ({ params, locals }) => {
	const res = await db.select({ id: User.id, username: User.username })
		.from(User)
		.where(eq(User.username, params.username));

	if (res.length === 0) {
		return Response.json({
			error: 'User not found',
		}, {
			status: 404,
			statusText: 'User not found',
		});
	}

	const user = res.pop()!;
	const userCtx = locals.user;

	return Response.json({
		...user,
		current: user.username === userCtx?.username,
	});
};
