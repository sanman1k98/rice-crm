import { db, Session, User } from "astro:db";
import { Lucia, generateIdFromEntropySize } from "lucia";
import { AstroDBAdapter } from "./adapter";

const adapter = new AstroDBAdapter(db, Session, User);

// Adapted from Lucia's "Username and password auth" tutorial.
// https://lucia-auth.com/tutorials/username-and-password/astro
// https://github.com/lucia-auth/examples/blob/main/astro/username-and-password/src/lib/auth.ts

type UserColumns = typeof User.$inferSelect;

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // Set to `true` when using HTTPS.
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: ({ username }) => ({ username }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Pick<UserColumns, "username">;
  }
}

export const generateId = () => generateIdFromEntropySize(10);

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const encode = encoder.encode.bind(encoder);
const decode = decoder.decode.bind(decoder);

/** 
 * @see https://lucia-auth.com/tutorials/username-and-password/astro
 * @see https://thecopenhagenbook.com/password-authentication#password-storage
 * @see https://github.com/napi-rs/node-rs
 * @see https://github.com/paulmillr/noble-hashes
 */
export async function hashPassword() {
  // TODO: implementation.
  throw new Error("Not implmented");
}

/** 
 * @see https://lucia-auth.com/tutorials/username-and-password/astro
 * @see https://thecopenhagenbook.com/password-authentication#password-storage
 * @see https://github.com/napi-rs/node-rs
 * @see https://github.com/paulmillr/noble-hashes
 */
export async function verify() {
  throw new Error("Not implmented");
}

/**
 * **DO NOT USE THIS IN PRODUCTION**. You will be fired from the startup:)
 *
 * @see https://thecopenhagenbook.com/password-authentication#password-storage
 */
export async function DANGEROUS_insecurelyHashPassword(password: string) {
  console.warn("[auth]: USING INSECURE HASHING ALGORITHM")
  const bytes = encode(password);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return decode(hash);
}

export async function DANGEROUS_insecurelyVerify(hashed: string, password: string): Promise<boolean> {
  return hashed === await DANGEROUS_insecurelyHashPassword(password);
}
