/**
 * @module 
 */
/**
 * @file CRUD operations for tasks.
 */
import { Task, db, eq, sql } from "astro:db";
import type { UserInfo } from "./users";

/** Maps application logic to database values. */
export const TaskStatusEnum = {
  /** Default status when creating a new task. */
  Open: 0,
  Closed: 1,
} as const;

/** @see {@link TaskStatusEnum} */
export type TaskStatus = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];
export type TaskInfo = typeof Task.$inferSelect;

type TaskId = TaskInfo["id"];
type TaskInit = Omit<typeof Task.$inferInsert, "id"> & {
  /**
   * Optionally use {@link TaskStatusEnum} to specify a value.
   *
   * @default `TaskStatusEnum.Open`
   */
  status?: TaskStatus;
};

/**
 * Create tasks.
 *
 * @param author - A `UserInfo` object to use as the author of the tasks.
 * @param tasks - The list of tasks to create.
 */
export async function createTasks(
  author: UserInfo,
  tasks: Omit<TaskInit, "author" | "org">[],
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
