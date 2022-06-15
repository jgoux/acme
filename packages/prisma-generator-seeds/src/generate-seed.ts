import type { DMMF } from "@prisma/generator-helper";
import type { SourceFile } from "ts-morph";

interface GenerateSeedOptions {
  client: string;
}

function addImports(
  sourceFile: SourceFile,
  dmmf: DMMF.Document,
  options: GenerateSeedOptions
) {
  const modelNames = dmmf.datamodel.models.map((m) => m.name);
  const prismaImports = ["Prisma"].concat(modelNames);

  sourceFile.addImportDeclarations([
    // {
    //   moduleSpecifier: "prisma-factory",
    //   namedImports: [
    //     "CreateFactoryOptions",
    //     "CreateFactoryHooks",
    //     "CreateFactoryReturn",
    //   ],
    //   isTypeOnly: true,
    // },
    // {
    //   moduleSpecifier: "prisma-factory",
    //   namedImports: ["ObjectWithMaybeCallbacks"],
    //   isTypeOnly: true,
    // },
    // {
    //   moduleSpecifier: "prisma-factory",
    //   namedImports: ["createFactory"],
    // },
    {
      moduleSpecifier: options.client,
      namedImports: prismaImports,
    },
  ]);
}

export function generateSeed(
  sourceFile: SourceFile,
  dmmf: DMMF.Document,
  options: GenerateSeedOptions
) {
  addImports(sourceFile, dmmf, options);
}
