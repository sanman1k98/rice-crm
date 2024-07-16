import type { APIRoute } from "astro";

export const GET: APIRoute = () => Response.json({ text: "Hello World!" });
