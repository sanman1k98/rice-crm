import { db, Opportunity } from "astro:db";
import { z } from "astro/zod";

export const STAGES = [
  "Planning",
  "In progess",
  "Completed",
] as const;

const stagesSchema = z.enum(STAGES);

export async function createOpportunity(
  opportunity: typeof Opportunity.$inferInsert & { stage: typeof STAGES[number] },
) {
  const parsed = stagesSchema.safeParse(opportunity.stage);
  if (!parsed.success && parsed.error) {
    throw new Error(
      `Invalid stage "${opportunity.stage}" when creating opportunity "${opportunity.name}"`,
      { cause: parsed.error }
    );
  }
  return db
    .insert(Opportunity)
    .values(opportunity)
    .returning()
    .get();
}
