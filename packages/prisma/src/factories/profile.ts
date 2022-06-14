import { faker } from "@faker-js/faker";

import { createProfileFactory } from "./__generated__/index.cjs";

export const ProfileFactory = createProfileFactory({
  bio: () => faker.lorem.sentence(),
});
