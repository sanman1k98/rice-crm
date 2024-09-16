import type { APIRoute } from 'astro';

/**
 * Get information about a team.
 */
export const GET: APIRoute = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Update a team.
 */
export const PATCH: APIRoute = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Delete a team.
 */
export const DELETE: APIRoute = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};
