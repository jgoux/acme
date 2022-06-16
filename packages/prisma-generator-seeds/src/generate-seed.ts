import type { DMMF } from "@prisma/generator-helper";
import type { SourceFile } from "ts-morph";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface GenerateSeedOptions {
  client: string;
}

interface Context {
  sourceFile: SourceFile;
  dmmf: DMMF.Document;
  options: GenerateSeedOptions;
}

function addImports(ctx: Context) {
  const { sourceFile, options } = ctx;
  const prismaImports = ["Prisma"];

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: options.client,
      namedImports: prismaImports,
    },
  ]);
}

const getModelRelations = (ctx: Context) => (model: DMMF.Model) => {
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

type Model = DMMF.Model & {
  relationFields: {
    field: DMMF.Field;
    relatedField: DMMF.Field;
  }[];
};

//TODO: generate those types from a single relation field
/**
type ProfileCreateWithoutUserInput = Prisma.ProfileCreateWithoutUserInput;

type ProfileUncheckedCreateWithoutUserInput =
  Prisma.ProfileUncheckedCreateWithoutUserInput;

interface ProfileCreateOrConnectWithoutUserInput {
  where: Prisma.ProfileWhereUniqueInput;
  create: XOR<
    ProfileCreateWithoutUserInput,
    ProfileUncheckedCreateWithoutUserInput
  >;
}

interface ProfileCreateNestedOneWithoutUserInput {
  create?: XOR<
    ProfileCreateWithoutUserInput,
    ProfileUncheckedCreateWithoutUserInput
  >;
  connectOrCreate?: ProfileCreateOrConnectWithoutUserInput;
  connect?: Prisma.ProfileWhereUniqueInput;
}

type UserCreateInput = Partial<RemoveRelationFields<Prisma.UserCreateInput>> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: Prisma.UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: Prisma.UserCreateNestedOneWithoutSuccessorInput;
  teacher?: Prisma.UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};
 */
const getModelCreateInputFieldType = ({
  relationFields: r,
}: // typesRegistry,
{
  typesRegistry: Map<string, string>;
  relationFields: Model["relationFields"][number];
}) => {
  // <FieldType>CreateNestedOneWithout<RelatedFielName>Input
  const relatedFieldName = capitalize(r.relatedField.name);

  return `${r.field.type}CreateWithout${relatedFieldName}Input`;

  // TODO: "connect" the relation instead of creating it
  //   const basetypeName = `${r.field.type}CreateNestedOneWithout${relatedFieldName}Input`;
  //   typesRegistry.set(
  //     `${r.field.type}CreateNestedOneWithout${relatedFieldName}Input`,
  //     `
  //   interface ${basetypeName} {
  //     create?: XOR<
  //     ${r.field.type}CreateWithout${relatedFieldName}Input,
  //     Prisma.${r.field.type}UncheckedCreateWithout${relatedFieldName}Input
  //     >;
  //     connectOrCreate?: ${r.field.type}CreateOrConnectWithout${relatedFieldName}Input;
  //     connect?: Prisma.${r.field.type}WhereUniqueInput;
  //   };
  // `
  //   );
  //   typesRegistry.set(
  //     `${r.field.type}CreateOrConnectWithout${relatedFieldName}Input`,
  //     `
  //       interface ${r.field.type}CreateOrConnectWithout${relatedFieldName}Input {
  //         where: Prisma.${r.field.type}WhereUniqueInput;
  //         create: XOR<
  //         ${r.field.type}CreateWithout${relatedFieldName}Input,
  //         Prisma.${r.field.type}UncheckedCreateWithout${relatedFieldName}Input
  //         >;
  //       }
  //     `
  //   );

  //   return basetypeName;
};

const getModelCreateInputType =
  (typesRegistry: Map<string, string>) => (model: Model) => {
    const baseType = `type ${model.name}CreateInput = Partial<RemoveRelationFields<Prisma.${model.name}CreateInput>>`;

    const fields = model.relationFields
      .map((r) => {
        const mapParam = `${r.field.type}CreateWithout${capitalize(
          r.relatedField.name
        )}Input`;
        const value = r.field.isList
          ? `${r.field.type}Map<"${mapParam}">`
          : getModelCreateInputFieldType({
              typesRegistry,
              relationFields: r,
            });

        return `${r.field.name}?: ${value};`;
      })
      .join("\n");

    return `${baseType} & { ${fields} };`;
  };

const getModelCreateInputWithoutType =
  (typesRegistry: Map<string, string>) =>
  ({ model, relatedField }: { model: Model; relatedField: DMMF.Field }) => {
    const typeName = `${model.name}CreateWithout${capitalize(
      relatedField.name
    )}Input`;
    const baseType = `type ${typeName} = Partial<RemoveRelationFields<Prisma.${typeName}>>`;

    const filteredFields = model.relationFields.filter(
      (r) => r.field.name !== relatedField.name
    );

    if (filteredFields.length === 0) {
      typesRegistry.set(typeName, `${baseType};`);
      return;
    }

    const fields = filteredFields
      .map((r) => {
        const mapParam = `${r.field.type}CreateWithout${capitalize(
          r.relatedField.name
        )}Input`;
        const value = r.field.isList
          ? `${r.field.type}Map<"${mapParam}">`
          : getModelCreateInputFieldType({
              typesRegistry,
              relationFields: r,
            });

        return `${r.field.name}?: ${value};`;
      })
      .join("\n");

    typesRegistry.set(typeName, `${baseType} & { ${fields} };`);
  };

const getFactoryFields =
  (models: Model[], typesRegistry: Map<string, string>) => (model: Model) => {
    const typeName = `${model.name}CreateInput`;
    const baseType = `${typeName}: ${typeName};`;
    const relationKeys = models
      .flatMap((model) => model.relationFields)
      .filter((r) => r.field.type === model.name)
      .map((r) => {
        const typeName = `${capitalize(model.name)}CreateWithout${capitalize(
          r.relatedField.name
        )}Input`;
        const baseType = `${typeName}?: ${typeName};`;
        getModelCreateInputWithoutType(typesRegistry)({
          model,
          relatedField: r.relatedField,
        });
        return baseType;
      });

    return [baseType, ...relationKeys].join("\n");
  };

const generateModelsTypes = (ctx: Context) => {
  const { dmmf } = ctx;
  const utilityTypes = `
    type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

    type XOR<T, U> = T extends object
      ? U extends object
        ? (T & Without<U, T>) | (U & Without<T, U>)
        : U
      : T;

    type RemoveRelationFields<T> = {
      [P in keyof T as NonNullable<T[P]> extends {
        create?: any;
        connectOrCreate?: any;
        connect?: any;
      }
        ? never
        : P]: T[P];
    };
  `;
  const quantityType = `
    interface Quantity {
      amount?: number;
      min?: number;
      max?: number;
    }
  `;
  const models = dmmf.datamodel.models.map(getModelRelations(ctx));
  const typesRegistry = new Map<string, string>();
  const seedTypes = models.map((model) => {
    const factoryFields = getFactoryFields(models, typesRegistry)(model);
    const modelCreateInputType = getModelCreateInputType(typesRegistry)(model);
    const factory = `type ${model.name}Factory = { ${factoryFields} }`;
    const factoryType = `type ${model.name}FactoryType = keyof ${model.name}Factory;`;
    const modelMap = `
      type ${model.name}Map<T extends ${model.name}FactoryType = "${model.name}CreateInput"> = Quantity & {
        create?: (index: number) => ${model.name}Factory[T];
      };`;
    return [modelCreateInputType, factory, factoryType, modelMap].join("\n\n");
  });

  console.log(
    [utilityTypes, quantityType, ...typesRegistry.values(), ...seedTypes].join(
      "\n\n"
    )
  );

  const seedMapFields = models
    .map((model) => `${model.name}?: ${model.name}Map;`)
    .join("\n");
  const seedMap = `type SeedMap = { ${seedMapFields} }`;

  console.log(seedMap);
};

export function generateSeed(
  sourceFile: SourceFile,
  dmmf: DMMF.Document,
  options: GenerateSeedOptions
) {
  addImports({ sourceFile, dmmf, options });
  generateModelsTypes({ sourceFile, dmmf, options });
}
