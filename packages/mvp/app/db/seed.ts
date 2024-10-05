/**
 * @file Seed data into the local dev database with Faker.
 *
 * @see https://fakerjs.dev
 * @see https://docs.astro.build/en/guides/astro-db/
 * @see https://docs.astro.build/en/guides/integrations-guide/db/
 */
import type { CompanyId, CompanyInit } from '@/lib/companies';
import type { ContactInit } from '@/lib/contacts';
import { createAccount } from '@/lib/accounts';
import { createOpportunity, OpportunityStageEnum } from '@/lib/opportunities';
import { createTasks } from '@/lib/tasks';
import { createUser, OrgRoleValueEnum, type UserInfo } from '@/lib/users';
import { faker } from '@faker-js/faker';
import { Company, Contact, db } from 'astro:db';

async function seedDeprecatedTables(user: UserInfo) {
	const testCustomer = await createAccount({
		name: 'Test Customer',
		description: 'This Account was created for development.',
		email: 'test.customer@example.com',
		address: 'Earth',
	});

	const exampleOpportunity = await createOpportunity({
		author: user.id,
		account: testCustomer.id,
		name: 'Example opportunity',
		stage: OpportunityStageEnum.Engage,
		amount: 1_000_000,
	});

	await createTasks(user, [
		{
			title: 'Create backend',
			opportunity: exampleOpportunity.id,
			body: faker.lorem.paragraph(),
		},
		{
			title: 'Create frontend',
			opportunity: exampleOpportunity.id,
			body: faker.lorem.paragraph(),
		},
		{
			title: 'Profit',
			opportunity: exampleOpportunity.id,
			body: faker.lorem.paragraph(),
		},
		{
			title: 'Spend money',
			opportunity: exampleOpportunity.id,
			body: faker.lorem.paragraph(),
		},
	]);
}

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
	const companyId = opts?.company;
	return {
		firstName,
		lastName,
		emails: [{ label: companyId ? 'work' : 'personal', email }],
		company: companyId ?? null,
		note: faker.person.bio(),
	} satisfies ContactInit;
}

export default async function () {
	const testUser = await createUser({
		fullname: 'Firstname Lastname',
		username: 'test',
		password: 'password',
		role: OrgRoleValueEnum.Owner,
	});

	await seedDeprecatedTables(testUser);

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
}
