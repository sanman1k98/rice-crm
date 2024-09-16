import { createOpportunity as _createOpportunity, type OpportunityInit } from '@/lib/opportunities';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

/**
 * Create an opportunity using the authenticated user's `id` as the value for the opportunity's
 * `author`.
 */
export const create = defineAction({
	accept: 'form',
	input: z.strictObject({
		account: z.number(),
		name: z.string(),
		amount: z.number(),
	}) satisfies z.ZodType<Omit<OpportunityInit, 'author' | 'org'>>,
	handler: async (input, ctx) => {
		const user = ctx.locals.user;
		if (!user)
			throw new ActionError({ code: 'UNAUTHORIZED' });
		const created = await _createOpportunity({
			org: user.primary_org,
			author: user.id,
			...input,
		});
		return { id: created.id };
	},
});
