import type { APIRoute } from "astro";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const GET: APIRoute<never, { name: string }> = ({ params }) =>
  Response.json({ text: `Hello ${capitalize(params.name)}!` });
