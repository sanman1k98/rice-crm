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

function devTask(
  orgId: string,
  creatorId: string,
  tasks: Omit<typeof Task.$inferInsert, "org_id" | "created_by" >[],
): typeof Task.$inferInsert[] {
  return tasks.map(t => ({
    org_id: orgId,
    created_by: creatorId,
    ...t,
  }));
}

export default async function() {
  const users = await Promise.all([
    devUser("test", "password"),
  ]);

  const testOrgCreator = users[0]!.id!;

  const orgs = [
    devOrg(testOrgCreator, "test-org")
  ];

  const testOrg = orgs[0]!;

  const testOrgTasks = devTask(testOrg.id!, testOrg.created_by!, [
    { number: 1, title: "Create backend" },
    { number: 2, title: "Create frontend" },
    { number: 3, title: "Profit" },
  ]);

  await db.insert(User).values(users);
  await db.insert(Organization).values(orgs)
  await db.insert(Task).values(testOrgTasks)
}
