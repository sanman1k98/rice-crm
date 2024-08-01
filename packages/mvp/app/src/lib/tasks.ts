/**
 * @file CRUD operations for tasks.
 */
import { Task, db, eq, sql } from "astro:db";
import type { UserInfo } from "./users";

type TaskId = typeof Task.$inferSelect["id"];
type CreateTaskParam = Omit<typeof Task.$inferInsert, "author" | "org">;

/**
 * Create tasks.
 *
 * @param author - A `UserInfo` object to use as the author of the tasks.
 * @param tasks - The list of tasks to create.
 */
export async function createTasks(
  author: UserInfo,
  tasks: CreateTaskParam[],
) {
  const { id: authorId, primary_org: orgId } = author;
  const values = tasks.map(task => ({ org: orgId, author: authorId, ...task }));
  return db.insert(Task).values(values);
}

const selectTask = db
  .select()
  .from(Task)
  .where(eq(Task.id, sql.placeholder("id")))
  .prepare();

/**
 * Get information about a task.
 *
 * @param id - The `id` of the task.
 * @returns The first matching row from the `Task` table if found.
 */
export const getTaskInfo = (id: TaskId): Promise<typeof Task.$inferSelect | undefined> =>
  selectTask.get({ id });
