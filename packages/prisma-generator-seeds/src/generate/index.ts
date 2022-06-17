import type { DMMF, GeneratorOptions } from "@prisma/generator-helper";
import { parseEnvValue } from "@prisma/sdk";
import path from "node:path";
import { Project } from "ts-morph";

import type { Context } from "../types.js";
import { addImports } from "./add-imports.js";
import { generateCreateSeedFunction } from "./generate-create-seed-function.js";
import { generateTypes } from "./generate-types.js";

const addModelRelations = (ctx: Context) => (model: DMMF.Model) => {
  const relationFields = model.fields
    .filter((f) => Boolean(f.relationName))
    .map((modelField) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const relatedModel = ctx.dmmf.datamodel.models.find(
        (m) => m.name === modelField.type
      )!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const relatedModelField = relatedModel.fields.find(
        (f) =>
          f.relationName === modelField.relationName &&
          f.name !== modelField.name
      )!;

      return { field: modelField, relatedField: relatedModelField };
    });

  return {
    ...model,
    relationFields,
  };
};

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

    const sourceFile = project.createSourceFile(
      path.join(outputDir, "index.ts"),
      undefined,
      {
        overwrite: true,
      }
    );

    const ctx = {
      dmmf: options.dmmf,
      sourceFile,
      options: {
        client:
          prismaClientOutput === "@prisma/client"
            ? "@prisma/client"
            : path.resolve(outputDir, prismaClientOutput),
      },
    };
    const models = options.dmmf.datamodel.models.map(addModelRelations(ctx));

    addImports(ctx);
    generateTypes(ctx, models);
    generateCreateSeedFunction(ctx, models);

    sourceFile.formatText({
      indentSize: 2,
    });

    await project.save();
    // await project.emit();
  } catch (e) {
    console.error("Error: unable to write files for Prisma Factory");
    throw e;
  }
}
