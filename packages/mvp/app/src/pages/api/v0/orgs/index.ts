import type { APIRoute } from 'astro';

/**
 * Create an organization for the authenticated user.
 */
export const POST: APIRoute = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Get a list of organizations for the authenticated user.
 */
export const GET: APIRoute = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};
