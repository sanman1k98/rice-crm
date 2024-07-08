import { column, defineDb, defineTable } from "astro:db";

// "User" and "Session" table definitions are adapted from "lucia-adapter-astrodb".
// https://github.com/pilcrowOnPaper/lucia-adapter-astrodb

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    // TODO: Consider supporting email-based auth.
    // https://lucia-auth.com/guides/email-and-password/
    username: column.text({ unique: true }),
    // FIXME: Deprecate username-based auth.
    // Since this is just an MVP, its fine for now.
    password_hash: column.text(),
    // TODO: Support multiple OAuth providers.
    // https://arcticjs.dev
    //
    // TODO: Define "memberships" for users.
    // A single user should can be "Members" of one or more "Organizations".
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
    expiresAt: column.date(),
    userId: column.text({
      references: () => User.columns.id
    })
  }
});

// TODO: Integrations?? How should we do integrations?
// What level should integrations be at:
// - the org level?
// - the member level?
// - the user level?

// TODO: Define "Organization" table.
// - "Organization" generally means a business, but can be something else like
//   a nonprofit.
// - an org can be created by a "User"
// - an org can have multiple "Accounts" that it must keep track of
// - an org must have at least one "Member"
// - a "Member" of an org can be an employee
// - a "Member" 

// TODO: Define "Member" (or "Membership"?) table.
// - a member is tied to a single "User"
// - a member is tied to an "Organization"
// - a member has a set of permissions and

// TODO: Define "Account" table.
// - "Account" can also mean "Customer"
// - an account belongs to an "Organization"
// - keep track of "activity"; i.e., comments that members of the org can post
// - an account can have many "Opportunities"

// TODO: Define "Opportunity" table.
// - an opportunity is tied to a single "Account"
// - can be commented on by "Members"
// - can be assigned to a "Member"

export default defineDb({
  tables: {
    User,
    Session
  },
});
