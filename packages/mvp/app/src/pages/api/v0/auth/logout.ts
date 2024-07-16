import type { APIRoute } from "astro";
import { lucia } from "@/auth";

/**
 * Adapted from Lucia's documentation.
 *
 * @see https://lucia-auth.com/tutorials/username-and-password/astro
 */
export const POST: APIRoute = async (context) => {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401
    });
  }

  await lucia.invalidateSession(context.locals.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return context.redirect("/");
}
