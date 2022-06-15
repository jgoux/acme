import type { GeneratorOptions } from "@prisma/generator-helper";
import { parseEnvValue } from "@prisma/sdk";
import path from "node:path";
import { Project } from "ts-morph";

import { generateSeed } from "./generate-seed.js";

export async function generate(options: GeneratorOptions) {
  const prismaClientOutput = options.otherGenerators.find(
    (gen) => gen.provider.value === "prisma-client-js"
  )!.output!.value;

  const outputDir = parseEnvValue(options.generator.output!);

  try {
    const project = new Project({
      compilerOptions: { outDir: outputDir, declaration: true },
    });

    const seedFile = project.createSourceFile("test.ts", undefined, {
      overwrite: true,
    });

    generateSeed(seedFile, options.dmmf, {
      client:
        prismaClientOutput === "@prisma/client"
          ? "@prisma/client"
          : path.resolve(outputDir, prismaClientOutput),
    });

    await project.save();
    await project.emit();
  } catch (e) {
    console.error("Error: unable to write files for Prisma Factory");
    throw e;
  }
}
// seed({
//   project: {
//     amount: 3,
//     factory: ({ faker, index }) => ({
//       name: `Project ${index}`,
//       description: faker.lorem.paragraph(10),
//       members: {
//         max: 15,
//         statics: [
//           ...(index === 3
//             ? [
//                 {
//                   role: "admin",
//                   user: {
//                     auth0Id: "auth0|5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
//                   },
//                 },
//               ]
//             : []),
//         ],
//       },
//     }),
//   },
// });

// type FactoryMap = {
//   [ModelName]
// }

// const createSeed = (factoryMap) => {
//   const seed = (seedMap) => {
//     // iterate over each table and generate an input we can give to Prisma
//   };
// };
