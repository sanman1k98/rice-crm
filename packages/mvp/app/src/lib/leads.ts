/**
 * @file CRUD operations for leads.
 */
import { Contact, db, eq, Lead, sql, User } from 'astro:db';

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

const defaultOrder = [Lead.updated, Lead.created];

export const selectLeads = db
	.select({
		id: Lead.id,
		updated: Lead.updated,
		created: Lead.created,
		status: Lead.status,
		authorId: User.id,
		authorName: User.fullname,
		contactId: Contact.id,
		contactFirstName: Contact.firstName,
		contactLastName: Contact.lastName,
	})
	.from(Lead)
	.orderBy(...defaultOrder)
	.leftJoin(Contact, eq(Contact.id, Lead.contact))
	.leftJoin(User, eq(User.id, Lead.author))
	.prepare();

const selectLead = db
	.select()
	.from(Lead)
	.where(eq(Lead.id, sql.placeholder('id')))
	.prepare();

export async function getLeadInfo(id: LeadId) {
	return selectLead.get({ id });
}
