import { faker } from "@faker-js/faker";

import { createUserFactory } from "./__generated__/index.js";

export const UserFactory = createUserFactory({
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
});
