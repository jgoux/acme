import type { DMMF } from "@prisma/generator-helper";
import type { SourceFile } from "ts-morph";

export interface GenerateSeedOptions {
  client: string;
}

export interface Context {
  sourceFile: SourceFile;
  dmmf: DMMF.Document;
  options: GenerateSeedOptions;
}

export type Model = DMMF.Model & {
  relationFields: {
    field: DMMF.Field;
    relatedField: DMMF.Field;
  }[];
};
