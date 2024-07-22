import { db, Account } from "astro:db";

export async function createAccount(
  account: typeof Account.$inferInsert,
) {
  return db
    .insert(Account)
    .values(account)
    .returning()
    .get();
}
