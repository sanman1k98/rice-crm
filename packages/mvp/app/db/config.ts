/**
 * @file Define database tables used by the app.
 *
 * @see https://docs.astro.build/en/guides/astro-db/
 */
import { column, defineDb, defineTable, NOW } from "astro:db";
import type { OrgRoleNameEnum } from "@/lib/users";
import type { TaskStatusEnum } from "@/lib/tasks";

/**
 * - "Organization" generally means a business, but can be something else like
 *   a nonprofit.
 * - an org can be created by a "User"
 * - an org can have multiple "Accounts"
 * - an org must have at least one "Member"
 */
const Organization = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text({ optional: true }),
  },
})

// "User" and "Session" table definitions are adapted from "lucia-adapter-astrodb".
// https://github.com/pilcrowOnPaper/lucia-adapter-astrodb

/**
 *
 * @todo Consider supporting email-based auth.
 * @see https://lucia-auth.com/guides/email-and-password/
 * @todo Multiple OAuth providers.
 * @see https://arcticjs.dev
 */
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text({ unique: true }),
    password_hash: column.text(),
    fullname: column.text(),
    primary_org: column.number({ references: () => Organization.columns.id }),
  }
});

/**
 * Used by Lucia to keep track of user sessions.
 *
 * @see https://lucia-auth.com/database/
 * @see https://lucia-auth.com/reference/main/Adapter
 * @see https://github.com/pilcrowOnPaper/lucia-adapter-astrodb
 */
const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    expiresAt: column.date(),
  }
});

// TODO: Integrations?? How should we do integrations?
// What level should integrations be at:
// - the org level?
// - the member level?
// - the user level?

/**
 * Defines relationships between "Organizations" and "Users".
 *
 * - a role is tied to a single "User"
 * - a role is tied to an "Organization"
 * - a role has a set of permissions
 *
 * @summary Use to check what org a user belongs to.
 * @todo Should we have a separate table containing different types of roles?
 */
const OrgRole = defineTable({
  columns: {
    org: column.number({ references: () => Organization.columns.id }),
    user: column.text({ references: () => User.columns.id }),
    /** @see {@link OrgRoleNameEnum} */
    role: column.number({ default: 0 }),
  }
});

/**
 * - "Account" can also mean "Customer" or "Company"
 * - an "Account" represents the other organizations that interact with your
 *   business.
 * - an account can be created within an "Organization"
 * - keep track of "activity"; i.e., comments that members of the org can post
 * - an account can be associated with one or more "Deals"
 */
const Account = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    org: column.number({ references: () => Organization.columns.id }),
    name: column.text(),
    description: column.text(),
    email: column.text(),
    address: column.text(),
  },
});

/**
 * - an "Opportunity" is tied to a single "Account"
 * - can be commented on by "Members"
 * - can be assigned to a "Member"
 */
const Opportunity = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    org: column.number({ references: () => Organization.columns.id }),
    account: column.number({ references: () => Account.columns.id }),
    author: column.text({ references: () => User.columns.id }),
    name: column.text(),
    stage: column.text(),
    amount: column.number(),
  },
});

/**
 * - a task is can be created by a member of an org
 * - can be associated with a deal
 * - can be assigned to a member
 */
const Task = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    created: column.date({ default: NOW }),
    author: column.text({ references: () => User.columns.id }),
    org: column.number({ references: () => Organization.columns.id }),
    title: column.text(),
    body: column.text({ optional: true }),
    /**
     * @see {@link TaskStatusEnum}
     */
    status: column.number({ default: 0 }),
  },
});

export default defineDb({
  tables: {
    User,
    Session,
    Organization,
    OrgRole,
    Account,
    Opportunity,
    Task,
  },
});
