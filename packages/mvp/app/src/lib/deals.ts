/**
 * @file CRUD operations for deals.
 */
import type { LeadId } from './leads';
import { db, Deal, eq, sql } from 'astro:db';

export type DealInfo = typeof Deal.$inferSelect;
export type DealId = DealInfo['id'];
export type DealInit = Omit<typeof Deal.$inferInsert, | 'id' | 'lead'>;

/**
 * Create a deal from a fully qualified lead.
 *
 * @param leadId The ID of the fully qualified lead.
 * @param opts Information about the deal.
 */
export async function createDeal(leadId: LeadId, opts: DealInit): Promise<DealInfo> {
	return db
		.insert(Deal)
		.values({ lead: leadId, ...opts })
		.returning()
		.get();
}

const selectDeal = db
	.select()
	.from(Deal)
	.where(eq(Deal.id, sql.placeholder('id')))
	.prepare();

export async function getDealInfo(id: DealId): Promise<DealInfo | undefined> {
	return selectDeal.get({ id });
}
