/**
 * @file Functions to interact with orgs using prepared SQL statements.
 */
import { Account, Organization, OrgRole, Task, User, db, eq, sql } from "astro:db";
import { createInsertPlaceholders } from "@/utils/sql";

const { id: _, ...insertOrgPlaceholders } = createInsertPlaceholders(Organization);

const insertOrg = db
  .insert(Organization)
  .values(insertOrgPlaceholders)
  .returning()
  .prepare();

type CreateOrgValue = Omit<typeof Organization.$inferSelect, "id">;

export async function createOrg(org: CreateOrgValue) {
  return insertOrg.get(org);
}

const orgInfo = db
  .select()
  .from(Organization)
  .where(eq(sql.placeholder("id"), Organization.id))
  .prepare();

export const getOrgInfo = (id: typeof Organization.$inferSelect["id"]) => orgInfo.get({ id });

export const orgTasks = db
  .select()
  .from(Task)
  .where(eq(Task.org, sql.placeholder("id")))
  .prepare();

export const getOrgTasks = (id: typeof Organization.$inferSelect["id"]) => orgTasks.all({ id });

const orgAccounts = db
  .select()
  .from(Account)
  .where(eq(Account.org, sql.placeholder("id")))
  .prepare();

export const getOrgAccounts = (id: typeof Organization.$inferSelect["id"]) => orgAccounts.all({ id });

export const orgMembers = db
  .select()
  .from(OrgRole)
  .leftJoin(User, eq(OrgRole.user, User.id))
  .leftJoin(Organization, eq(OrgRole.org, Organization.id))
  .where(eq(Organization.id, sql.placeholder("org")))
  .prepare();