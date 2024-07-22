import { OrgRole, User, db, eq, sql } from "astro:db";
import { generateId, scrypt } from "@/auth";

type CreateUserValue = Omit<typeof User.$inferInsert, "id" | "password_hash"> & {
  password: string;
  role?: "member" | "owner";
};

export const createUser = async (user: CreateUserValue) => {
  const {
    primary_org: orgId,
    password,
    role = "member",
    ...rest
  } = user;
  const userId = generateId();
  const newUser = await db
    .insert(User)
    .values({
      id: userId,
      primary_org: orgId,
      password_hash: await scrypt.hash(password),
      ...rest,
    })
    .returning()
    .get();
  await db
    .insert(OrgRole)
    .values({
      org: orgId,
      user: userId,
      role,
    });
  return newUser;
};

const selectUser = db
  .select()
  .from(User)
  .where(eq(sql.placeholder("id"), User.id))
  .prepare();

export async function getUserInfo(id: typeof User.$inferSelect["id"]) {
  return selectUser.get({ id });
}
