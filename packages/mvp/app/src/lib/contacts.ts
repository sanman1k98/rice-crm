/**
 * @file CRUD operations for contacts.
 */
import type { AddressInfo, EmailInfo, LinkInfo, PhoneInfo } from './shared';
import { Contact, db, eq, sql } from 'astro:db';

type ContactInfo = typeof Contact.$inferSelect;
type ContactId = ContactInfo['id'];

export type ContactInit = Omit<typeof Contact.$inferInsert, | 'id'> & {
	emails?: EmailInfo[];
	phones?: PhoneInfo[];
	addresses?: AddressInfo[];
	links?: LinkInfo[];
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
