import { db, User } from "astro:db";

export default async function() {
  await db.insert(User).values([
    { id: "test" },
  ]);
}
