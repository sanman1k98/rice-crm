/**
 * @file CRUD operations for leads.
 */
import { Contact, db, Deal, desc, eq, Lead, sql, User } from 'astro:db';

export type LeadInfo = typeof Lead.$inferSelect;
export type LeadId = LeadInfo['id'];
export type LeadInit = Omit<typeof Lead.$inferInsert, | 'id'>;

export async function createLead(opts: LeadInit) {
	return db
		.insert(Lead)
		.values(opts)
		.returning()
		.get();
}

const defaultOrder = [desc(Lead.score), Lead.updated, Lead.created];

export const selectLeads = db
	.select({
		id: Lead.id,
		updated: Lead.updated,
		created: Lead.created,
		status: Lead.status,
		score: Lead.score,
		author: User,
		contact: Contact,
		deal: Deal,
	})
	.from(Lead)
	.orderBy(...defaultOrder)
	.innerJoin(Contact, eq(Contact.id, Lead.contact))
	.innerJoin(User, eq(User.id, Lead.author))
	.leftJoin(Deal, eq(Deal.lead, Lead.id))
	.prepare();

const selectLead = db
	.select()
	.from(Lead)
	.where(eq(Lead.id, sql.placeholder('id')))
	.prepare();

export async function getLeadInfo(id: LeadId) {
	return selectLead.get({ id });
}
