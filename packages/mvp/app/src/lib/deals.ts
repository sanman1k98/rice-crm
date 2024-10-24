/**
 * @file CRUD operations for deals.
 */
import type { LeadId } from './leads';
import { Company, Contact, db, Deal, eq, Lead, sql, User } from 'astro:db';

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

export const selectDeals = db
	.select({
		id: Deal.id,
		amount: Deal.amount,
		currency: Deal.currency,
		status: Lead.status,
		company: Company.name,
	})
	.from(Deal)
	.leftJoin(Lead, eq(Lead.id, Deal.lead))
	.leftJoin(Contact, eq(Contact.id, Lead.contact))
	.leftJoin(Company, eq(Company.id, Contact.company))
	.leftJoin(User, eq(User.id, Lead.author))
	.prepare();

const selectDeal = db
	.select()
	.from(Deal)
	.where(eq(Deal.id, sql.placeholder('id')))
	.prepare();

export async function getDealInfo(id: DealId): Promise<DealInfo | undefined> {
	return selectDeal.get({ id });
}
