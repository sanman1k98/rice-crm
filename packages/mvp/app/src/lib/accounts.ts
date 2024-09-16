import type { OpportunityInfo } from './opportunities';
/**
 * @file CRUD operations for accounts.
 */
import { Account, db, eq, Opportunity, sql } from 'astro:db';

type AccountInfo = typeof Account.$inferSelect;
type AccountId = AccountInfo['id'];
type AccountInit = Omit<typeof Account.$inferInsert, 'id'>;

/**
 * Create a new account.
 *
 * @param opts - Properties describing the new account.
 * @returns The row inserted into the `Account` table.
 */
export async function createAccount(opts: AccountInit): Promise<AccountInfo> {
	return db
		.insert(Account)
		.values(opts)
		.returning()
		.get();
}

const selectAccount = db
	.select()
	.from(Account)
	.where(eq(Account.id, sql.placeholder('id')))
	.prepare();

const selectAccountOpportunities = db
	.select()
	.from(Opportunity)
	.where(eq(Opportunity.account, sql.placeholder('id')))
	.prepare();

/**
 * Get information about an account.
 *
 * @param id - The `id` of the account.
 * @returns The first matching row from the `Account` table if found.
 */
export function getAccountInfo(id: AccountId): Promise<AccountInfo | undefined> {
	return selectAccount.get({ id });
}

/**
 * Get all the opportunities for a given account.
 *
 * @param id - The `id` of the account.
 * @returns A list of opportunities associated with the given account.
 */
export function getAccountOpportunities(id: AccountId): Promise<OpportunityInfo[]> {
	return selectAccountOpportunities.all({ id });
}
