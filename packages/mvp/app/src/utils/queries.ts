/**
 * @file Prepared SQL statements for common queries.
 */
import { Account, Organization, OrgRole, Task, User, db, eq, sql } from "astro:db";

export const orgInfo = db
  .select()
  .from(Organization)
  .where(eq(sql.placeholder("org"), Organization.id))
  .prepare();

export const orgTasks = db
  .select()
  .from(Task)
  .where(eq(Task.org, sql.placeholder("org")))
  .prepare();

export const orgAccounts = db
  .select()
  .from(Account)
  .where(eq(Account.org, sql.placeholder("org")))
  .prepare();

export const orgMembers = db
  .select()
  .from(OrgRole)
  .leftJoin(User, eq(OrgRole.user, User.id))
  .leftJoin(Organization, eq(OrgRole.org, Organization.id))
  .where(eq(Organization.id, sql.placeholder("org")))
  .prepare();
