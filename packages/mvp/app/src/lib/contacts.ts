/**
 * @file CRUD operations for contacts.
 */
import type { AddressInfo, EmailInfo, LinkInfo, PhoneInfo } from './shared';
import { Contact, db, eq, sql } from 'astro:db';

export type ContactInfo = typeof Contact.$inferSelect;
export type ContactId = ContactInfo['id'];

export const ContactSortFields = ['lastName', 'firstName', 'company'] as const satisfies (keyof ContactInfo)[];

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

const defaultOrder = [Contact.lastName, Contact.firstName];

export const selectContacts = db
	.select()
	.from(Contact)
	.orderBy(...defaultOrder)
	.prepare();

const selectContact = db
	.select()
	.from(Contact)
	.where(eq(Contact.id, sql.placeholder('id')))
	.prepare();

export async function getContactInfo(id: ContactId) {
	return selectContact.get({ id });
}

const sortableFields = ['lastName', 'firstName', 'company'] as const satisfies (keyof ContactInfo)[];
type SortableField = typeof sortableFields[number];

export function isSortableField(f: string): f is SortableField {
	return (sortableFields as string[]).includes(f);
}
