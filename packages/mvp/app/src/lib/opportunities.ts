/**
 * @file CRUD operations for opportunities.
 */
import { Opportunity, db, eq, sql } from "astro:db";

export const OpportunityStageEnum = {
  /** Default stage when creating a new opportunity. */
  Planning: 0,
  InProgress: 1,
  Completed: 2,
} as const;

export type OpportunityStage = typeof OpportunityStageEnum[keyof typeof OpportunityStageEnum];

export type OpportunityInfo = typeof Opportunity.$inferSelect;
export type OpportunityId = OpportunityInfo["id"];
export type OpportunityInit = Omit<typeof Opportunity.$inferInsert, "id"> & {
  /** @see {@link OpportunityStage} */
  stage?: OpportunityStage;
};

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
  .where(eq(Opportunity.id, sql.placeholder("id")))
  .prepare();

/**
 * Get information about an opportunity.
 *
 * @param id - The `id` of the opportunity.
 * @returns The first matching row from the `Opportunity` table if found.
 */
export const getOpportunityInfo = (id: OpportunityId): Promise<OpportunityInfo | undefined> =>
  selectOpportunity.get({ id });
