import type { APIRoute } from 'astro';

/**
 * Get a list deals for this account.
 */
export const GET: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Create a new deal for this account.
 */
export const POST: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};
