import type { Context, Model } from "../types.js";

export function generateCreateSeedFunction(ctx: Context, models: Model[]) {
  const createSeedFactoriesFields = models.map(
    (model) =>
      `${model.name}?:  Partial<RemoveRelationFields<Prisma.${model.name}CreateInput>>;`
  );
  ctx.sourceFile.addStatements(`
    interface SeedConfig {
      prisma: PrismaClient;
      faker?: Faker;
      factories?: (faker: Faker) => {
        ${createSeedFactoriesFields.join("\n")}
      };
    }
  `);

  ctx.sourceFile.addStatements(`
    type CreateSeed = (config: SeedConfig) => (seedMap: SeedMap) => Promise<void>;
  `);

  ctx.sourceFile.addStatements(`
    export const createSeed: CreateSeed =
    ({ prisma }) =>
    async (seedMap) => {
      const modelEntries = Object.entries(seedMap) as Entries<SeedMap>;
      const modelsSeedInputs = modelEntries.flatMap(([modelName, modelMap]) => {
        return [modelName, modelMap] as Entries<SeedMap>;
      });

      await prisma.$transaction(
        modelsSeedInputs.map(([modelName, modelMap]) =>
          // @ts-${"expect"}-error at this point we're too dynamic to care about the types
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          prisma[modelName.toLowerCase()].createMany(modelMap)
        )
      );
    };
  `);
}
