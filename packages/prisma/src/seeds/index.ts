import { PrismaClient } from "@prisma/client";

import { createSeed } from "./__generated__/index.js";

const seed = createSeed({
  prisma: new PrismaClient(),
});

void seed({
  User: {
    amount: 100,
    create: () => ({
      posts: {
        amount: 10,
        create: () => ({
          categories: {
            min: 0,
            max: 5,
          },
        }),
      },
    }),
  },
});
