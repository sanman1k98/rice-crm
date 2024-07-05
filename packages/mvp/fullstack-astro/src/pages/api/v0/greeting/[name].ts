import type { APIRoute } from "astro";

export const prerender = false;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const GET: APIRoute<never, { name: string }> = ({ params }) => {
  const { name } = params;
  return new Response(JSON.stringify({ text: `Hello ${capitalize(name)}!` }))
}
