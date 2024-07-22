import { Task, User, db, eq, sql } from "astro:db";

type CreateTaskValues = Omit<typeof Task.$inferInsert, "author" | "org">[]

export async function createTasks(
  author: typeof User.$inferSelect,
  tasks: CreateTaskValues,
) {
  const { id: authorId, primary_org: orgId } = author;
  const values = tasks.map(task => ({ org: orgId, author: authorId, ...task }));
  return db.insert(Task).values(values);
}

export async function getTaskInfo(id: typeof Task.$inferSelect["id"]) {
  return db
    .select()
    .from(Task)
    .where(eq(sql.placeholder("id"), Task.id))
    .get({ id });
}
