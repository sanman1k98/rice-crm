import type { APIRoute } from "astro";
import { db, eq, User } from "astro:db";
import { lucia, DANGEROUS_insecurelyVerify } from "@/auth";

export const POST: APIRoute = async (context) => {
  const formData = await context.request.formData();
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return new Response("Invalid username", {
      status: 400
    });
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    return new Response("Invalid password", {
      status: 400
    });
  }

  const existingUserRes = await db.select()
    .from(User)
    .where(eq(User.username, username));

  if (existingUserRes.length !== 1) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid
    // usernames from response times, allowing them to only focus on guessing
    // passwords in brute-force attacks. As a preventive measure, you may want
    // to hash passwords even for invalid usernames. However, valid usernames
    // can be already be revealed with the signup page among other methods. It
    // will also be much more resource intensive. Since protecting against this
    // is non-trivial, it is crucial your implementation is protected against
    // brute-force attacks with login throttling etc. If usernames are public,
    // you may outright tell the user that the username is invalid.
    return new Response("Incorrect username or password", {
      status: 400
    });
  }

  const existingUser = existingUserRes.pop()!;

  const validPassword = await DANGEROUS_insecurelyVerify(existingUser.password_hash, password);
  if (!validPassword) {
    return new Response("Incorrect username or password", {
      status: 400
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return Response.json({ "text": "Sucess!" });
  // return context.redirect("/");
}
