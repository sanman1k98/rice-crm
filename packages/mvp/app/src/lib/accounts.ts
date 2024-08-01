/**
 * @file CRUD operations for accounts.
 */
import { Account, db, eq, sql } from "astro:db";

type AccountId = typeof Account.$inferSelect["id"];
type AccountInit = Omit<typeof Account.$inferInsert, "id">;
type AccountInfo = typeof Account.$inferSelect;

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
  .where(eq(Account.id, sql.placeholder("id")))
  .prepare();

/**
 * Get information about an account.
 *
 * @param id - The `id` of the account.
 * @returns The first matching row from the `Account` table if found.
 */
export const getAccountInfo = (id: AccountId): Promise<AccountInfo | undefined> =>
  selectAccount.get({ id });
