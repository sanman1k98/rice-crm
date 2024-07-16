import type { APIRoute } from "astro";

/**
 * Get an account.
 */
export const GET: APIRoute = () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}

/**
 * Update an account.
 */
export const PATCH: APIRoute = () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}

/**
 * Delete an account.
 */
export const DELETE: APIRoute = () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}
