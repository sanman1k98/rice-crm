/**
 * @file Functions to interact with orgs using prepared SQL statements.
 */
import { Account, Opportunity, Organization, OrgRole, Task, User, db, eq, sql } from "astro:db";

type CreateOrgValue = Omit<typeof Organization.$inferInsert, "id">;
type OrgId = typeof Organization.$inferSelect["id"];

/**
 * Inserts a new row in the "Organization" table.
 *
 * @param org An object with properties defining a new Organization.
 * @returns A promise resolving to the inserted row.
 */
export async function createOrg(org: CreateOrgValue): Promise<typeof Organization.$inferSelect> {
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

/**
 * Get information about an Organization with the given "id".
 *
 * @param id The id of the Organization.
 * @returns The first matching fow from the "Organization" table if found.
 */
export const getOrgInfo = (id: OrgId): Promise<typeof Organization.$inferSelect | undefined> =>
  selectOrg.get({ id });

const selectOrgTasks = db
  .select()
  .from(Task)
  .where(eq(Task.org, sql.placeholder("id")))
  .prepare();

/**
 * Get all the tasks for the given Organization
 *
 * @param id The id of the Organization.
 * @returns Rows from the "Task" table.
 */
export const getOrgTasks = (id: OrgId): Promise<typeof Task.$inferSelect[] | undefined> =>
  selectOrgTasks.all({ id });

const selectOrgAccounts = db
  .select()
  .from(Account)
  .where(eq(Account.org, sql.placeholder("id")))
  .prepare();

/**
 * Get all the accounts for the given Organization
 *
 * @param id The id of the Organization.
 * @returns Rows from the "Account" table.
 */
export const getOrgAccounts = (id: OrgId): Promise<typeof Account.$inferSelect[] | undefined> =>
  selectOrgAccounts.all({ id });

const selectOrgOpportunities = db
  .select()
  .from(Opportunity)
  .where(eq(Opportunity.org, sql.placeholder("id")))
  .prepare();

/**
 * Get all the opportunities for the given Organization
 *
 * @param id The id of the Organization.
 * @returns Rows from the "Opportunity" table.
 */
export const getOrgOpportunities = (id: OrgId): Promise<typeof Opportunity.$inferSelect[] | undefined> =>
  selectOrgOpportunities.all({ id });

const joinOrgMembers = db
  .select()
  .from(OrgRole)
  .leftJoin(User, eq(OrgRole.user, User.id))
  .leftJoin(Organization, eq(OrgRole.org, Organization.id))
  .where(eq(Organization.id, sql.placeholder("org")))
  .prepare();

export const getOrgMembers = (id: OrgId) => joinOrgMembers.all({ id });
