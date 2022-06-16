import type { GeneratorOptions } from "@prisma/generator-helper";
import { parseEnvValue } from "@prisma/sdk";
import path from "node:path";
import { Project } from "ts-morph";

import { generateSeed } from "./generate-seed.js";

export async function generate(options: GeneratorOptions) {
  const prismaClientOutput = options.otherGenerators.find(
    (gen) => gen.provider.value === "prisma-client-js"
  )?.output?.value;

  if (!prismaClientOutput) {
    throw new Error("prisma-client-js output not found");
  }

  if (!options.generator.output) {
    throw new Error("output not found");
  }

  const outputDir = parseEnvValue(options.generator.output);

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

    // await project.save();
    // await project.emit();
  } catch (e) {
    console.error("Error: unable to write files for Prisma Factory");
    throw e;
  }
}
