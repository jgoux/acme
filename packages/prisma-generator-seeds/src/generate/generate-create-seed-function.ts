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
    export const createSeed: CreateSeed = ({ prisma }) => async (seedMap) => {
      const dmmf = Prisma.dmmf;
      const queries = dmmf.datamodel.models.map(model => {
        const modelName = model.name as ModelName;
        const modelMap = seedMap[modelName];
        if (!modelMap) {
          return;
        }
        const { create } = modelMap;
        if (!create) {
          return;
        }
      });

      await prisma.$transaction(
        queries
      );
    };
  `);
}
