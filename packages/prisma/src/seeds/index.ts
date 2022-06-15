import type { Prisma } from "@prisma/client";

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
interface Quantity {
  amount?: number;
  min?: number;
  max?: number;
}

type ProfileTest = Prisma.ProfileCreateInput;
type ProfileMap<
  T extends Prisma.ProfileCreateManyInput = Prisma.ProfileCreateManyInput
> = Quantity & {
  factory?: (index: number) => T extends Prisma.ProfileCreateManyInput
    ? Partial<
        Prisma.ProfileCreateManyInput & {
          user?: Partial<
            Prisma.UserCreateWithoutProfileInput & {
              posts?: PostMap<Prisma.PostCreateWithoutAuthorInput>;
            }
          >;
        }
      >
    : never;
};

type UserMap<
  T extends
    | Prisma.UserCreateManyInput
    | Prisma.UserCreateWithoutPostsInput
    | Prisma.UserCreateWithoutProfileInput = Prisma.UserCreateManyInput
> = Quantity & {
  factory?: (index: number) => T extends Prisma.UserCreateManyInput
    ? Prisma.UserCreateManyInput & {
        profile?: Prisma.ProfileCreateWithoutUserInput;
        posts?: PostMap<Prisma.PostCreateWithoutAuthorInput>;
      }
    : T extends Prisma.UserCreateWithoutPostsInput
    ? Prisma.UserCreateWithoutPostsInput & {
        profile?: Prisma.ProfileCreateWithoutUserInput;
      }
    : T extends Prisma.UserCreateWithoutProfileInput
    ? Prisma.UserCreateWithoutProfileInput & {
        posts?: PostMap<Prisma.PostCreateWithoutAuthorInput>;
      }
    : never;
};
interface CategoryFactory {
  CategoryCreateInput: Prisma.CategoryCreateInput & {
    posts: PostMap<"PostCreateWithoutCategoriesInput">;
  };
  CategoryCreateWithoutPostsInput: Prisma.CategoryCreateWithoutPostsInput;
}

type CategoryFactoryType = keyof CategoryFactory;

type CategoryMap<T extends CategoryFactoryType = "CategoryCreateInput"> =
  Quantity & {
    factory?: (index: number) => CategoryFactory[T];
  };

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = T extends object
  ? U extends object
    ? (T & Without<U, T>) | (U & Without<T, U>)
    : U
  : T;

interface Connection {
  create?: XOR<Prisma.Enumerable<T>, any>;
  createMany?: any;
  connectOrCreate?: any;
  connect?: any;
}

type ExtractInputType<T> = T extends { create?: XOR<infer U, any> } ? U : T;

type Test = ExtractInputType<Prisma.PostCreateNestedManyWithoutAuthorInput>;

// type ExtractCreate<T> = T extends Prisma.CreateInput<infer U>

// TODO: replace all <Model>CreateNestedOneWithout<Relations>Input types
interface PostFactory {
  // recursively replace all <Model>CreateNested[One|Many]Without<Relations>Input types
  PostCreateInput: Omit<Prisma.PostCreateInput, "author"> & {
    author: Omit<Prisma.UserCreateWithoutPostsInput, "profile"> & {
      profile: Prisma.ProfileCreateWithoutUserInput;
    };
    categories: CategoryMap<"CategoryCreateWithoutPostsInput">;
  };
  PostCreateWithoutAuthorInput: Prisma.PostCreateWithoutAuthorInput & {
    categories: CategoryMap<"CategoryCreateWithoutPostsInput">;
  };
  PostCreateWithoutCategoriesInput: Prisma.PostCreateWithoutCategoriesInput;
}

type PostFactoryType = keyof PostFactory;

type PostMap<T extends PostFactoryType = "PostCreateInput"> = Quantity & {
  factory?: (index: number) => PostFactory[T];
};
interface SeedMap {
  Category?: CategoryMap;
  Post?: PostMap;
}

const seed = (seedMap: SeedMap) => Promise<void>;

seed({
  Post: {
    factory(index) {
      return {
        author: {
          name: "foo",
          profile: {
            bio: "gekki",
          },
        },
        categories: {
          min: 2,
          max: 10,
          factory(index) {
            return {
              name: "fff",
            };
          },
        },
      };
    },
  },
});
