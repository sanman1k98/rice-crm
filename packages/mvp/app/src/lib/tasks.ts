import type { OpportunityId } from './opportunities';
import type { UserInfo } from './users';
/**
 * @file CRUD operations for tasks.
 */
import { db, eq, sql, Task } from 'astro:db';

/** Maps application logic to database values. */
export const TaskStatusEnum = {
	/** Default status when creating a new task. */
	Open: 0,
	Closed: 1,
} as const;

/** @see {@link TaskStatusEnum} */
export type TaskStatus = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];
export type TaskInfo = typeof Task.$inferSelect;

export type TaskId = TaskInfo['id'];
export type TaskInit = Omit<typeof Task.$inferInsert, 'id'> & {
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
	tasks: Omit<TaskInit, 'author' | 'org'>[],
) {
	const { id: authorId, primary_org: orgId } = author;
	const values = tasks.map((task) => ({ org: orgId, author: authorId, ...task }));
	return db.insert(Task).values(values);
}

export async function createTask(opts: TaskInit) {
	return db
		.insert(Task)
		.values(opts)
		.returning()
		.get();
}

const selectTask = db
	.select()
	.from(Task)
	.where(eq(Task.id, sql.placeholder('id')))
	.prepare();

/**
 * Get information about a task.
 *
 * @param id - The `id` of the task.
 * @returns The first matching row from the `Task` table if found.
 */
export function getTaskInfo(id: TaskId): Promise<typeof Task.$inferSelect | undefined> {
	return selectTask.get({ id });
}

const selectTasksForOpportunity = db
	.select()
	.from(Task)
	.where(eq(Task.opportunity, sql.placeholder('id')))
	.prepare();

/**
 * Get a list of tasks associated with an opportunity.
 *
 * @param id - The `id` of the opportunity.
 * @returns A list of rows from the `Tasks` table where `opportunity` equals the given `id`.
 */
export function getTasksForOpportunity(id: OpportunityId): Promise<typeof Task.$inferSelect[]> {
	return selectTasksForOpportunity.all({ id });
}
