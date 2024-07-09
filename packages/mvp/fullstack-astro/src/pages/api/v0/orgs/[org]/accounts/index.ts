import type { APIRoute } from "astro";

/**
 * Get a list of accounts for the organization.
 */
export const GET: APIRoute = () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}

/**
 * Create a new account for the organization.
 */
export const POST: APIRoute = () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}
