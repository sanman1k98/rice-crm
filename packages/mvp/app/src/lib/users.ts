import { generateId, scrypt } from '@/auth/utils';
/**
 * @file CRUD operations for users.
 */
import { db, eq, OrgRole, sql, User } from 'astro:db';

export const OrgRoleValueEnum = {
	/** Default role for a new user. */
	Member: 0,
	Owner: 1,
} as const;

/** @see {@link OrgRoleValueEnum} */
export type OrgRoleValue = typeof OrgRoleValueEnum[keyof typeof OrgRoleValueEnum];
export type UserInfo = Omit<typeof User.$inferSelect, 'password_hash'>;

type UserId = UserInfo['id'];
type UserInit = Omit<typeof User.$inferInsert, 'id' | 'password_hash'> & {
	password: string;
	/** @defaultValue `OrgRoleValueEnum.Member` */
	role?: OrgRoleValue;
};

/**
 * @summary Used to specify which columns in `User` table to query.
 *
 * WARN: `@astrojs/db@0.11.7` table types DO NOT accurately match their runtime values.
 *
 * Astro DB uses Drizzle ORM under the hood but with some added functionality
 * in order to simplify the developer experience. For example, you can define a
 * table without a column to use as the primary key and Astro DB will
 * implicitly create one for you. Unfortunately, this behavior appears to be
 * undocumented and the generated types don't seem to reflect this.
 *
 * We should use `getTableColumns()` from Drizzle which can be used to omit
 * certain columns for a partial selection, but Astro DB does not re-export
 * that helper function.
 *
 * @see https://orm.drizzle.team/docs/goodies#get-typed-table-columns
 *
 * According to the generated type information for `User`, we should be able to
 * use object destructuring and the spread operator to create the
 * `partialUserColumns` object below.
 *
 * @example
 * ```ts
 * // This will not work
 * const { password_hash: _, ...partialUserColumns } = User._.columns;
 * ```
 *
 * But the generated type information intended for the developer using the ORM
 * do not include all of the private runtime internals that power its full
 * type-safety, hence the reason for the `getTableColumns()` helper function.
 *
 * At least we can use the generated types to derive our own type which we can
 * then use to constrain the `partialUserColumns` object.
 */
const partialUserColumns: Omit<typeof User._.columns, 'password_hash'> = {
	id: User.id,
	username: User.username,
	fullname: User.fullname,
	primary_org: User.primary_org,
};

/**
 * Create a new user and define their role within the given organization.
 *
 * @param opts -
 * An object with properties defining the new user, including an
 * optional `role` property to change from default.
 *
 * @returns
 * The row inserted into the `User` table including the generated `id`, but
 * without the `password_hash` column.
 */
export async function createUser(opts: UserInit): Promise<UserInfo> {
	const { role = OrgRoleValueEnum.Member, password, ...rest } = opts;

	const id = generateId() as string;
	const password_hash = await scrypt.hash(password);

	// Insert the new user and get it back.
	const newUser = await db
		.insert(User)
		.values({ id, password_hash, ...rest })
		.returning(partialUserColumns)
		.get();

	// Define their role in their primary org.
	await db
		.insert(OrgRole)
		.values({
			user: newUser.id,
			org: newUser.primary_org,
			role,
		});

	// TODO: Return both `UserInfo` and `OrgRole` information.
	return newUser;
};

const selectUser = db
	.select(partialUserColumns)
	.from(User)
	.where(eq(sql.placeholder('id'), User.id))
	.prepare();

/**
 * Get information about the given user.
 *
 * @param id - The `id` of the user.
 * @returns The first matching row from the `User` table if found.
 */
export function getUserInfo(id: UserId): Promise<UserInfo | undefined> {
	return selectUser.get({ id });
}
