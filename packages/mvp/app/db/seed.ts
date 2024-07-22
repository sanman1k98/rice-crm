import { createOrg } from "@/lib/orgs";
import { createUser } from "@/lib/users";
import { createAccount } from "@/lib/accounts";
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
    role: "owner",
  });

  await createAccount({
    org: testOrg.id,
    name: "Test Customer",
    description: "This Account was created for development.",
    email: "test.customer@example.com",
    address: "Earth",
  });

  await createTasks(testUser, [
    { title: "Create backend" },
    { title: "Create frontend" },
    { title: "Profit" },
    { title: "Spend money" },
  ]);
}
