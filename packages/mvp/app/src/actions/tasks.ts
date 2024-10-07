import { createTask, type TaskInit } from '@/lib/tasks';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const create = defineAction({
	accept: 'form',
	input: z.strictObject({
		title: z.string(),
		description: z.string(),
	}) satisfies z.ZodType<Omit<TaskInit, 'org' | 'author'>>,
	handler: async (input, ctx) => {

	},
});
