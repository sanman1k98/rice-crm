/**
 * @file Seed data into the local dev database with Faker.
 *
 * @see https://fakerjs.dev
 * @see https://docs.astro.build/en/guides/astro-db/
 * @see https://docs.astro.build/en/guides/integrations-guide/db/
 */
import type { CompanyId, CompanyInit } from '@/lib/companies';
import type { ContactId, ContactInit } from '@/lib/contacts';
import type { DealInit } from '@/lib/deals';
import type { LeadId, LeadInit } from '@/lib/leads';
import { createUser, OrgRoleValueEnum, type UserId } from '@/lib/users';
import { faker } from '@faker-js/faker';
import { Company, Contact, db, Deal, Lead } from 'astro:db';

function generateCompany() {
	return {
		name: faker.company.name(),
		note: faker.company.catchPhrase(),
	} satisfies CompanyInit;
}

function generateContact(opts?: { company?: CompanyId }) {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const email = faker.internet.email({ firstName, lastName });
	const phone = faker.phone.number();
	const companyId = opts?.company;
	return {
		firstName,
		lastName,
		emails: [{ label: companyId ? 'work' : 'personal', email }],
		phones: [{ label: 'mobile', phone }],
		company: companyId ?? null,
		jobTitle: companyId ? faker.person.jobTitle() : null,
		note: faker.person.bio(),
	} satisfies ContactInit;
}

function generateLead(opts: { author: UserId; contact: ContactId }) {
	return {
		contact: opts.contact,
		author: opts.author,
		status: faker.hacker.ingverb(),
		score: faker.number.int({ min: 1, max: 100 }),
	} satisfies LeadInit;
}

function generateDeal(opts: { lead: LeadId; company?: CompanyId }) {
	const dealInit = {
		company: opts.company ?? null,
		amount: faker.number.float({ min: 1000, max: 20000, multipleOf: 100 }),
		currency: 'USD',
	} satisfies DealInit;
	return { lead: opts.lead, ...dealInit };
}

export default async function () {
	const testUser = await createUser({
		fullname: 'Firstname Lastname',
		username: 'test',
		password: 'password',
		role: OrgRoleValueEnum.Owner,
	});

	// await seedDeprecatedTables(testUser);

	const companyIds = await db
		.insert(Company)
		.values(
			Array.from(
				{ length: 10 },
				() => generateCompany(),
			),
		)
		.returning({ id: Company.id })
		.all();

	const insertEmployees = companyIds.map(
		({ id }) => db
			.insert(Contact)
			.values(
				Array.from(
					{ length: 10 },
					() => generateContact({ company: id }),
				),
			),
	);

	const insertOtherContacts = db
		.insert(Contact)
		.values(
			Array.from(
				{ length: 20 },
				() => generateContact(),
			),
		);

	await db.batch([
		insertOtherContacts,
		...insertEmployees,
	]);

	const contactPerCompany = await db
		.select({ id: Contact.id })
		.from(Contact)
		.groupBy(Contact.company)
		.all();

	const leads = await db
		.insert(Lead)
		.values(
			contactPerCompany.map(
				({ id }) => generateLead({ contact: id, author: testUser.id }),
			),
		)
		.returning({ id: Lead.id })
		.all();

	await db
		.insert(Deal)
		.values(
			leads
				.filter((_lead, idx) => (idx & 1) === 1)
				.map((lead) => generateDeal({ lead: lead.id })),
		);
}
