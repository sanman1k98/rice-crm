import type { APIRoute } from "astro";

/**
 * Get a list of deals for the organization.
 */
export const GET: APIRoute = () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}
