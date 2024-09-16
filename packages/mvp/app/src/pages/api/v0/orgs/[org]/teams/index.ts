import type { APIRoute } from 'astro';

/**
 * Get a list of all teams in the organization.
 */
export const GET: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Create a new team within the organization.
 */
export const POST: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};
