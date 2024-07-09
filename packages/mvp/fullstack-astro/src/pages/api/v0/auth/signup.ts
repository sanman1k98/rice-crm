import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
  const data = { status: 501, statusText: "Not Implemented" };
  return Response.json(data, data);
}
