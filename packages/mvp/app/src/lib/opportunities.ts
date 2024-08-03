/**
 * @file CRUD operations for opportunities.
 */
import { Opportunity, db, eq, sql } from "astro:db";
import { z } from "astro/zod";

export const STAGES = [
  "Planning",
  "In progess",
  "Completed",
] as const;

const stagesSchema = z.enum(STAGES);

type OpportunityId = typeof Opportunity.$inferSelect["id"];
type OpportunityInfo = typeof Opportunity.$inferSelect;
type OpportunityInit = Omit<typeof Opportunity.$inferInsert, "id"> & {
  stage: typeof STAGES[number];
};

/**
 * Create a new opportunity.
 *
 * @param opts - Properties describing the opportunity.
 * @returns The row inserted into the `Opportunity` table.
 */
export async function createOpportunity(opts: OpportunityInit): Promise<OpportunityInfo> {
  const parsed = stagesSchema.safeParse(opts.stage);
  if (parsed.error) {
    throw new Error(
      `Invalid stage "${opts.stage}" when creating opportunity "${opts.name}"`,
      { cause: parsed.error }
    );
  }
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
