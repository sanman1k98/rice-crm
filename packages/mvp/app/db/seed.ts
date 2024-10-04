import { createAccount } from '@/lib/accounts';
import { createOpportunity, OpportunityStageEnum } from '@/lib/opportunities';
import { createTasks } from '@/lib/tasks';
import { createUser, OrgRoleValueEnum } from '@/lib/users';

export default async function () {
	const testUser = await createUser({
		fullname: 'Firstname Lastname',
		username: 'test',
		password: 'password',
		role: OrgRoleValueEnum.Owner,
	});

	const testCustomer = await createAccount({
		name: 'Test Customer',
		description: 'This Account was created for development.',
		email: 'test.customer@example.com',
		address: 'Earth',
	});

	const exampleOpportunity = await createOpportunity({
		author: testUser.id,
		account: testCustomer.id,
		name: 'Example opportunity',
		stage: OpportunityStageEnum.Engage,
		amount: 1_000_000,
	});

	await createTasks(testUser, [
		{
			title: 'Create backend',
			opportunity: exampleOpportunity.id,
			body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`,
		},
		{
			title: 'Create frontend',
			opportunity: exampleOpportunity.id,
			body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`,
		},
		{
			title: 'Profit',
			opportunity: exampleOpportunity.id,
			body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`,
		},
		{
			title: 'Spend money',
			opportunity: exampleOpportunity.id,
			body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`,
		},
	]);
}
