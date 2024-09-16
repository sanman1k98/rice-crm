import type { APIRoute } from 'astro';

/**
 * Get information about an organization.
 */
export const GET: APIRoute<never, { org: string }> = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Update an organization.
 */
export const PATCH: APIRoute<never, { org: string }> = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};

/**
 * Delete an organization.
 */
export const DELETE: APIRoute<never, { org: string }> = async () => {
	const data = { status: 501, statusText: 'Not Implemented' };
	return Response.json(data, data);
};
