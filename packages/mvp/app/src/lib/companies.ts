/**
 * @file CRUD operations for companies.
 */
import type { AddressInfo, EmailInfo, LinkInfo, PhoneInfo } from './shared';
import { Company, Contact, db, eq, sql } from 'astro:db';

type CompanyInfo = typeof Company.$inferSelect;
export type CompanyId = CompanyInfo['id'];

export type CompanyInit = Omit<typeof Company.$inferInsert, | 'id'> & {
	emails?: EmailInfo[];
	phones?: PhoneInfo[];
	addresses?: AddressInfo[];
	links?: LinkInfo[];
};

export async function createCompany(opts: CompanyInit) {
	return db
		.insert(Company)
		.values(opts)
		.returning()
		.get();
}

const selectCompany = db
	.select()
	.from(Company)
	.where(eq(Company.id, sql.placeholder('id')))
	.prepare();

const selectCompanyContacts = db
	.select()
	.from(Contact)
	.where(eq(Contact.company, sql.placeholder('id')))
	.prepare();

export async function getCompanyInfo(id: CompanyId) {
	return selectCompany.get({ id });
}

export async function getCompanyContacts(id: CompanyId) {
	return selectCompanyContacts.all({ id });
}
