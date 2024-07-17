/**
 * @file
 */
import { db, User, Organization, Task, OrgRole, Account } from "astro:db";
import { generateId, scrypt } from "@/auth";

async function createUser(
  {
    fullname,
    username,
    password,
    primary_org: org,
  }: {
    fullname: string,
    username: string,
    password: string,
    primary_org?: ReturnType<typeof createOrg>,
  }
): Promise<typeof User.$inferInsert> {
  return {
    id: generateId(),
    fullname,
    username,
    password_hash: await scrypt.hash(password),
    primary_org: org?.id ?? null,
  }
}

let orgCounter = 0;

function createOrg(name: string, desc?: string): typeof Organization.$inferInsert {
  return {
    id: String(++orgCounter),
    name,
    description: desc ?? null,
  };
}

function createRoles(
  org: ReturnType<typeof createOrg>,
  userRoles: [user: Awaited<ReturnType<typeof createUser>>, role: string][],
): typeof OrgRole.$inferInsert[] {
  const orgId = org.id!;
  return userRoles.map(userRole => ({
    org: orgId,
    user: userRole[0].id!,
    role: userRole[1],
  }));
}

function createAccount(
  org: ReturnType<typeof createOrg>,
  name: string,
  info?: any,
): typeof Account.$inferInsert {
  return {
    org: org.id!,
    name,
    info,
  };
}

function createTasks(
  org: ReturnType<typeof createOrg>,
  author: Awaited<ReturnType<typeof createUser>>,
  tasks: Omit<typeof Task.$inferInsert, "org" | "author" >[],
): typeof Task.$inferInsert[] {
  return tasks.map(task => ({
    org: org.id!,
    author: author.id!,
    ...task,
  }));
}

export default async function() {
  const testOrg = createOrg("Test Company Incorporated");

  const testUser = await createUser({
    fullname: "Firstname Lastname",
    username: "test",
    password: "password",
    primary_org: testOrg,
  });

  const testRoles = createRoles(testOrg, [
    [testUser, "owner"],
  ]);

  const testAccount = createAccount(testOrg, "Test Account");

  const testOrgTasks = createTasks(testOrg, testUser, [
    { title: "Create backend" },
    { title: "Create frontend" },
    { title: "Profit" },
    { title: "Spend money" },
  ]);

  await db.insert(Organization).values(testOrg);
  await db.insert(User).values(testUser);
  await db.insert(OrgRole).values(testRoles);
  await db.insert(Account).values(testAccount);
  await db.insert(Task).values(testOrgTasks);
}
