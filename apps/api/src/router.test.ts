import { ProfileFactory, UserFactory } from "@acme/prisma/factories";

it("should create a random user inputs", () => {
  const user = UserFactory.build({
    profile: {
      create: ProfileFactory.build(),
    },
  });
  console.log(user);
});
