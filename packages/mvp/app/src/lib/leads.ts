/**
 * @file CRUD operations for leads.
 */
import { db, eq, Lead, sql } from 'astro:db';

type LeadInfo = typeof Lead.$inferSelect;
export type LeadId = LeadInfo['id'];
type LeadInit = Omit<typeof Lead.$inferInsert, | 'id'>;

export async function createLead(opts: LeadInit) {
	return db
		.insert(Lead)
		.values(opts)
		.returning()
		.get();
}

const selectLead = db
	.select()
	.from(Lead)
	.where(eq(Lead.id, sql.placeholder('id')))
	.prepare();

export async function getLeadInfo(id: LeadId) {
	return selectLead.get({ id });
}
