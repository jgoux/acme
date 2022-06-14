import { faker } from "@faker-js/faker";

import { createProfileFactory } from "./__generated__/index.js";

export const ProfileFactory = createProfileFactory({
  bio: () => faker.lorem.sentence(),
});
