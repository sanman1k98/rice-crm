import { db, User, Organization, Task } from "astro:db";
import { generateId, scrypt } from "@/auth";

async function devUser(name: string, password: string): Promise<typeof User.$inferInsert> {
  return {
    id: generateId(),
    username: name,
    password_hash: await scrypt.hash(password),
  }
}

function devOrg(userId: string, name: string): typeof Organization.$inferInsert {
  return {
    id: name,
    created_by: userId,
  };
}

export default async function() {
  const users = await Promise.all([
    devUser("test", "password"),
  ]);

  const orgs = [
    devOrg(users[0]!.id!, "test-org")
  ];

  await db.insert(User).values(users);
  await db.insert(Organization).values(orgs)
}
