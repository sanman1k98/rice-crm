import type { APIRoute } from 'astro';

/**
 * Get a deal.
 */
export const GET: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Update a deal.
 */
export const PATCH: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Delete a deal.
 */
export const DELETE: APIRoute = () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};
