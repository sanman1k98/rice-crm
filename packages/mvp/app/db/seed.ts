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
    name: "Test Account",
    org: testOrg.id,
  });

  await createTasks(testUser, [
    { title: "Create backend" },
    { title: "Create frontend" },
    { title: "Profit" },
    { title: "Spend money" },
  ]);
}
