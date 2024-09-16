/**
 * @file CRUD operations for opportunities.
 */
import { db, eq, Opportunity, sql } from 'astro:db';

export const OpportunityStageEnum = {
	/** Default stage when creating a new opportunity. */
	Engage: 0,
	Qualify: 1,
	Design: 2,
	Propose: 3,
	Negotiate: 4,
	Closed: 5,
} as const;

const OpportunityStageNames = Object.keys(OpportunityStageEnum) as (keyof typeof OpportunityStageEnum)[];

export type OpportunityStage = typeof OpportunityStageEnum[keyof typeof OpportunityStageEnum];

export type OpportunityInfo = typeof Opportunity.$inferSelect;
export type OpportunityId = OpportunityInfo['id'];
export type OpportunityInit = Omit<typeof Opportunity.$inferInsert, 'id'> & {
	/** @see {@link OpportunityStage} */
	stage?: OpportunityStage;
};

export function getOpportunityStageName(stage: number | OpportunityStage) {
	const name = OpportunityStageNames[stage];
	if (!name)
		throw new TypeError('Invalid OpportunityStage value');
	return name;
}

/**
 * Create a new opportunity.
 *
 * @param opts - Properties describing the opportunity.
 * @returns The row inserted into the `Opportunity` table.
 */
export async function createOpportunity(opts: OpportunityInit): Promise<OpportunityInfo> {
	return db
		.insert(Opportunity)
		.values(opts)
		.returning()
		.get();
}

const selectOpportunity = db
	.select()
	.from(Opportunity)
	.where(eq(Opportunity.id, sql.placeholder('id')))
	.prepare();

/**
 * Get information about an opportunity.
 *
 * @param id - The `id` of the opportunity.
 * @returns The first matching row from the `Opportunity` table if found.
 */
export function getOpportunityInfo(id: OpportunityId): Promise<OpportunityInfo | undefined> {
	return selectOpportunity.get({ id });
}
