import { db, User } from "astro:db";
import { generateId, DANGEROUS_insecurelyHashPassword } from "@/auth";

async function devUser(name: string, password: string): Promise<typeof User.$inferInsert> {
  return {
    id: generateId(),
    username: name,
    password_hash: await DANGEROUS_insecurelyHashPassword(password),
  }
}

export default async function() {
  const users = await Promise.all([
    devUser("test", "password"),
  ]);

  await db.insert(User).values(users);
}
