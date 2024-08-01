/**
 * @file Functions to interact with orgs using prepared SQL statements.
 */
import { Account, Opportunity, Organization, OrgRole, Task, User, db, eq, sql } from "astro:db";

type CreateOrgValue = Omit<typeof Organization.$inferSelect, "id">;
type OrgId = typeof Organization.$inferSelect["id"];

export async function createOrg(org: CreateOrgValue) {
  return db
    .insert(Organization)
    .values(org)
    .returning()
    .get();
}

const selectOrg = db
  .select()
  .from(Organization)
  .where(eq(sql.placeholder("id"), Organization.id))
  .prepare();

export const getOrgInfo = (id: OrgId) => selectOrg.get({ id });

const selectOrgTasks = db
  .select()
  .from(Task)
  .where(eq(Task.org, sql.placeholder("id")))
  .prepare();

export const getOrgTasks = (id: OrgId) => selectOrgTasks.all({ id });

const selectOrgAccounts = db
  .select()
  .from(Account)
  .where(eq(Account.org, sql.placeholder("id")))
  .prepare();

export const getOrgAccounts = (id: OrgId) => selectOrgAccounts.all({ id });

const selectOrgOpportunities = db
  .select()
  .from(Opportunity)
  .where(eq(Opportunity.org, sql.placeholder("id")))
  .prepare();

export const getOrgOpportunities = (id: OrgId) => selectOrgOpportunities.all({ id })

const joinOrgMembers = db
  .select()
  .from(OrgRole)
  .leftJoin(User, eq(OrgRole.user, User.id))
  .leftJoin(Organization, eq(OrgRole.org, Organization.id))
  .where(eq(Organization.id, sql.placeholder("org")))
  .prepare();

export const getOrgMembers = (id: OrgId) => joinOrgMembers.all({ id });
