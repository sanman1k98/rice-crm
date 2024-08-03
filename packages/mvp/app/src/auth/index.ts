/**
 * @file Configures auth library to handle sessions.
 *
 * @see https://lucia-auth.com/tutorials/username-and-password/astro
 * @see https://github.com/lucia-auth/examples/blob/main/astro/username-and-password/src/lib/auth.ts
 */
import { db, Session, User } from "astro:db";
import { Lucia } from "lucia";
import { AstroDBAdapter } from "./adapter";

export * from "./utils";

const adapter = new AstroDBAdapter(db, Session, User);

type UserColumns = typeof User.$inferSelect;

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // Set to `false` for MVP.
      secure: false,
    },
  },
  getUserAttributes: (user) => ({
    username: user.username,
    fullname: user.fullname,
    primary_org: user.primary_org,
  }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Pick<UserColumns, "fullname" | "username" | "primary_org">;
  }
}
