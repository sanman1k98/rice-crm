/**
 * @file CRUD operations for contacts.
 */
import type { Address, Email, Link, Phone } from './shared';
import { Contact, db, eq, sql } from 'astro:db';

type ContactInfo = typeof Contact.$inferSelect;
type ContactId = ContactInfo['id'];

export type ContactInit = Omit<typeof Contact.$inferInsert, | 'id'> & {
	emails?: Email[];
	phones?: Phone[];
	addresses?: Address[];
	links?: Link[];
};

export async function createContact(opts: ContactInit) {
	return db
		.insert(Contact)
		.values(opts)
		.returning()
		.get();
}

const selectContact = db
	.select()
	.from(Contact)
	.where(eq(Contact.id, sql.placeholder('id')))
	.prepare();

export async function getContactInfo(id: ContactId) {
	return selectContact.get({ id });
}
