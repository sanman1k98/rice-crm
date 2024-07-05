import type { APIRoute } from "astro";
import { db, eq, User } from "astro:db";

export const GET: APIRoute<never, { id: string }> = async ({ params }) => {
  const res = await db.select()
    .from(User)
    .where(eq(User.id, params.id));

  if (res.length === 0) {
    return Response.json({
      error: "User not found",
    }, {
      status: 404,
      statusText: "User not found",
    })
  }

  return Response.json(res.pop());
}
