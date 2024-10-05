import { createAccount } from '@/lib/accounts';
import { type CompanyInit, createCompany } from '@/lib/companies';
import { type ContactInit, createContact } from '@/lib/contacts';
import { createLead } from '@/lib/leads';
import { createOpportunity, OpportunityStageEnum } from '@/lib/opportunities';
import { createTasks } from '@/lib/tasks';
import { createUser, OrgRoleValueEnum, type UserInfo } from '@/lib/users';
import { faker } from '@faker-js/faker';

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
	} satisfies CompanyInit;
}

function generateContact() {
	return {
		name: faker.person.fullName(),
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

	const companies = await Promise.all(
		Array
			.from({ length: 10 }, generateCompany)
			.map(createCompany),
	);

	const contacts = await Promise.all(
		Array
			.from({ length: 100 }, generateContact)
			.map(createContact),
	);

	const leads = await Promise.all(
		Array.from(contacts, (c) => createLead({ author: testUser.id, contact: c.id })),
	);
}
