import type { DMMF } from "@prisma/generator-helper";

import type { Context, Model } from "../types.js";
import { capitalize } from "../utils.js";

function generateUtilityTypes(ctx: Context) {
  ctx.sourceFile.addStatements(`
    type RemoveRelationFields<T> = {
      [
        P in keyof T as NonNullable<T[P]> extends {
          create?: any;
          connectOrCreate?: any;
          connect?: any;
        }
          ? never
          : P
      ]: T[P];
    };

    type Entries<T> = {
      [K in keyof T]-?: [K, NonNullable<T[K]>];
    }[keyof T][];
  `);
}

function generateCommonTypes(ctx: Context) {
  ctx.sourceFile.addStatements(`
    interface Quantity {
      amount?: number;
      min?: number;
      max?: number;
    }
  `);
}

function generateCreateInputWithoutType(
  ctx: Context,
  model: Model,
  relatedField: DMMF.Field
) {
  const createWithoutInput = `${model.name}CreateWithout${capitalize(
    relatedField.name
  )}Input`;

  const baseType = `type ${createWithoutInput} = Partial<RemoveRelationFields<Prisma.${createWithoutInput}>>`;

  const filteredFields = model.relationFields.filter(
    (r) => r.field.name !== relatedField.name
  );

  if (filteredFields.length === 0) {
    ctx.sourceFile.addStatements(`
      ${baseType};
    `);
    return;
  }

  const fields = filteredFields.map((relation) => {
    const mapParam = `${relation.field.type}CreateWithout${capitalize(
      relation.relatedField.name
    )}Input`;
    const value = relation.field.isList
      ? `${relation.field.type}Map<"${mapParam}">`
      : getModelCreateInputFieldType(relation);

    return `${relation.field.name}?: ${value};`;
  });

  ctx.sourceFile.addStatements(`
    ${baseType} & {
      ${fields.join("\n")}
    };
  `);
}

function generateModelCreateInputType(ctx: Context, model: Model) {
  const createInput = `${model.name}CreateInput`;
  const baseType = `type ${createInput} = Partial<RemoveRelationFields<Prisma.${createInput}>>`;

  const relationFields = model.relationFields.map(getRelationField);

  ctx.sourceFile.addStatements(`
    ${baseType} & {
      ${relationFields.join("\n")}
    };
  `);
}

function getFactoryFields(ctx: Context, models: Model[], model: Model) {
  generateModelCreateInputType(ctx, model);
  const createInput = `${model.name}CreateInput`;
  const baseField = `${createInput}: ${createInput};`;

  const relationFields = models
    .flatMap((model) => model.relationFields)
    .filter((relation) => relation.field.type === model.name)
    .map((relation) => {
      const createWithoutInput = `${capitalize(
        model.name
      )}CreateWithout${capitalize(relation.relatedField.name)}Input`;
      if (!ctx.sourceFile.getTypeAlias(createWithoutInput)) {
        generateCreateInputWithoutType(ctx, model, relation.relatedField);
      }
      return `${createWithoutInput}?: ${createWithoutInput};`;
    });

  return [baseField, ...relationFields];
}

function generateModelFactory(ctx: Context, models: Model[], model: Model) {
  const factory = `${model.name}Factory`;
  const factoryFields = getFactoryFields(ctx, models, model);

  ctx.sourceFile.addStatements(`
    type ${factory} = {
      ${factoryFields.join("\n")}
    };
  `);

  ctx.sourceFile.addStatements(`
    type ${factory}Type = keyof ${factory};
  `);
}

function generateModelMap(ctx: Context, model: Model) {
  const map = `${model.name}Map`;
  const factoryType = `${model.name}FactoryType`;
  const createInput = `${model.name}CreateInput`;
  const factory = `${model.name}Factory`;

  ctx.sourceFile.addStatements(`
    type ${map}<T extends ${factoryType} = "${createInput}"> = Quantity & {
      create?: (index: number) => ${factory}[T];
    };
  `);
}

function getModelCreateInputFieldType(
  relation: Model["relationFields"][number]
) {
  const relatedFieldName = capitalize(relation.relatedField.name);

  return `${relation.field.type}CreateWithout${relatedFieldName}Input`;
}

function getRelationField(relation: Model["relationFields"][number]) {
  let relationFieldType: string;

  if (relation.field.isList) {
    const mapParam = `${relation.field.type}CreateWithout${capitalize(
      relation.relatedField.name
    )}Input`;

    relationFieldType = `${relation.field.type}Map<"${mapParam}">`;
  } else {
    relationFieldType = getModelCreateInputFieldType(relation);
  }

  return `${relation.field.name}?: ${relationFieldType};`;
}

const generateModelTypes =
  (ctx: Context, models: Model[]) => (model: Model) => {
    generateModelFactory(ctx, models, model);
    generateModelMap(ctx, model);
  };

function generateSeedMap(ctx: Context, models: Model[]) {
  const seedMapFields = models.map(
    (model) => `${model.name}?: ${model.name}Map;`
  );
  ctx.sourceFile.addStatements(`
    type SeedMap = {
      ${seedMapFields.join("\n")}
    };
  `);
  ctx.sourceFile.addStatements(`
    type ModelName = keyof SeedMap;
  `);
}

export function generateTypes(ctx: Context, models: Model[]) {
  generateUtilityTypes(ctx);
  generateCommonTypes(ctx);
  models.forEach(generateModelTypes(ctx, models));
  generateSeedMap(ctx, models);
}
