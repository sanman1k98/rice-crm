/**
 * @file CRUD operations for contacts.
 */
import { Contact, db, eq, sql } from 'astro:db';

type ContactInfo = typeof Contact.$inferSelect;
type ContactId = ContactInfo['id'];

type ContactEmails = Record<string, string>;
type ContactPhones = Record<string, string>;
type ContactAddresses = Record<string, string>;
type ContactLinks = Record<string, string>;

type ContactInit = Omit<typeof Contact.$inferInsert, | 'id'> & {
	emails?: ContactEmails;
	phones?: ContactPhones;
	addresses?: ContactAddresses;
	links?: ContactLinks;
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
