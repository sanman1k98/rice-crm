import { Account, db, eq, sql } from "astro:db";

export async function createAccount(
  account: typeof Account.$inferInsert,
) {
  return db
    .insert(Account)
    .values(account)
    .returning()
    .get();
}

export async function getAccountInfo(accountId: typeof Account.$inferSelect["id"]) {
  return db
    .select()
    .from(Account)
    .where(eq(sql.placeholder("id"), Account.id))
    .get({ id: accountId });
}
