/**
 * @file CRUD operations for the entire organization.
 */
import { Account, Company, Contact, db, Opportunity, Task, User } from 'astro:db';

const selectOrgCompanies = db
	.select()
	.from(Company)
	.prepare();

const selectOrgContacts = db
	.select()
	.from(Contact)
	.prepare();

const selectOrgTasks = db
	.select()
	.from(Task)
	.prepare();

const selectOrgAccounts = db
	.select()
	.from(Account)
	.prepare();

const selectOrgOpportunities = db
	.select()
	.from(Opportunity)
	.prepare();

const selectOrgMembers = db
	.select()
	.from(User)
	.prepare();

export function getOrgCompanies() {
	return selectOrgCompanies.all();
}

export function getOrgContacts() {
	return selectOrgContacts.all();
}

/**
 * Get all the tasks for the organization
 *
 * @returns Rows from the "Task" table.
 */
export function getOrgTasks(): Promise<typeof Task.$inferSelect[]> {
	return selectOrgTasks.all();
}

/**
 * Get all the accounts for the organization.
 *
 * @returns Rows from the "Account" table.
 */
export function getOrgAccounts(): Promise<typeof Account.$inferSelect[]> {
	return selectOrgAccounts.all();
}

/**
 * Get all the opportunities for the organization.
 *
 * @returns Rows from the "Opportunity" table.
 */
export function getOrgOpportunities(): Promise<typeof Opportunity.$inferSelect[]> {
	return selectOrgOpportunities.all();
}

export function getOrgMembers(): Promise<typeof User.$inferSelect[]> {
	return selectOrgMembers.all();
}
