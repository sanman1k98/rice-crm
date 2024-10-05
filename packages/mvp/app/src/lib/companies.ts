/**
 * @file CRUD operations for companies.
 */
import { Company, db, eq, sql } from 'astro:db';

type CompanyInfo = typeof Company.$inferSelect;
export type CompanyId = CompanyInfo['id'];

type CompanyEmails = Record<string, string>;
type CompanyPhones = Record<string, string>;
type CompanyAddresses = Record<string, string>;
type CompanyLinks = Record<string, string>;

export type CompanyInit = Omit<typeof Company.$inferInsert, | 'id'> & {
	emails?: CompanyEmails;
	phones?: CompanyPhones;
	addresses?: CompanyAddresses;
	links?: CompanyLinks;
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

export async function getCompanyInfo(id: CompanyId) {
	return selectCompany.get({ id });
}
