import { ProfileFactory, UserFactory } from "@acme/prisma/factories";
import { UserSchema } from "@acme/prisma/zod";

it("should create a random user inputs", () => {
  const user = UserFactory.build({
    profile: {
      create: ProfileFactory.build(),
    },
  });
  console.log(user);
});

it("should parse a user input", () => {
  UserSchema.parse({
    id: 1,
    email: "foo@bar.com",
    role: "ADMIN",
  });
});
