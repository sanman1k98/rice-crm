import { createOrg } from "@/lib/orgs";
import { createUser, OrgRoleNameEnum } from "@/lib/users";
import { createAccount } from "@/lib/accounts";
import { createOpportunity, OpportunityStageEnum } from "@/lib/opportunities";
import { createTasks } from "@/lib/tasks";

export default async function() {
  const testOrg = await createOrg({
    name: "Test Company Incorporated",
    description: "This organization is created for development purposes."
  });

  const testUser = await createUser({
    fullname: "Firstname Lastname",
    username: "test",
    password: "password",
    primary_org: testOrg.id,
    role: OrgRoleNameEnum.Owner,
  });

  const testCustomer = await createAccount({
    org: testOrg.id,
    name: "Test Customer",
    description: "This Account was created for development.",
    email: "test.customer@example.com",
    address: "Earth",
  });

  await createOpportunity({
    org: testOrg.id,
    author: testUser.id,
    account: testCustomer.id,
    name: "Example opportunity",
    stage: OpportunityStageEnum.InProgress,
    amount: 1_000_000,
  });

  await createTasks(testUser, [
    {
      title: "Create backend",
      body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`
    },
    {
      title: "Create frontend",
      body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`
    },
    {
      title: "Profit",
      body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`
    },
    {
      title: "Spend money",
      body: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
odio ipsa. Reiciendis dolorum ipsa itaque error, eius facilis excepturi cumque
sit ut mollitia, vitae iure ullam voluptates tempore blanditiis libero!`
    },
  ]);
}
