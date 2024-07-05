import { column, defineDb, defineTable } from "astro:db";

// "User" and "Session" table definitions are adapted from "lucia-adapter-astrodb".
// https://github.com/pilcrowOnPaper/lucia-adapter-astrodb

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text({ unique: true }),
    password_hash: column.text(),
  }
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    userId: column.text({
      references: () => User.columns.id
    })
  }
});

export default defineDb({
  tables: {
    User,
    Session
  },
});
