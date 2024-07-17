import { db, Session, User } from "astro:db";
import { Lucia, Scrypt, generateIdFromEntropySize } from "lucia";
import { AstroDBAdapter } from "./adapter";

const adapter = new AstroDBAdapter(db, Session, User);

// Adapted from Lucia's "Username and password auth" tutorial.
// https://lucia-auth.com/tutorials/username-and-password/astro
// https://github.com/lucia-auth/examples/blob/main/astro/username-and-password/src/lib/auth.ts

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

export const generateId = () => generateIdFromEntropySize(10);

/** 
 * Lucia's pure JavaScript implmentation of the "Scrypt" hashing algorithm. For
 * a faster API, see Oslo's Scrypt which wraps `node:crypto`.
 * 
 * @see https://oslo.js.org/reference/password/Scrypt/
 * @see https://lucia-auth.com/reference/main/Scrypt/
 * @see https://thecopenhagenbook.com/password-authentication#password-storage
 * @see https://github.com/napi-rs/node-rs
 * @see https://github.com/paulmillr/noble-hashes
 */
export const scrypt = new Scrypt();

