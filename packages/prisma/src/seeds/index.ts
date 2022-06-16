import type { Prisma } from "@prisma/client";

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

interface Quantity {
  amount?: number;
  min?: number;
  max?: number;
}

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

interface UserFactory {
  UserCreateInput: UserCreateInput;
  UserCreateWithoutPredecessorInput?: RemoveRelationFields<Prisma.UserCreateWithoutPredecessorInput>;
  UserCreateWithoutSuccessorInput?: RemoveRelationFields<Prisma.UserCreateWithoutSuccessorInput>;
  UserCreateWithoutStudentsInput?: RemoveRelationFields<Prisma.UserCreateWithoutStudentsInput>;
  UserCreateWithoutTeacherInput?: RemoveRelationFields<Prisma.UserCreateWithoutTeacherInput>;
  UserCreateWithoutFollowingInput?: RemoveRelationFields<Prisma.UserCreateWithoutFollowingInput>;
  UserCreateWithoutFollowedByInput?: RemoveRelationFields<Prisma.UserCreateWithoutFollowedByInput>;
  UserCreateWithoutProfileInput?: RemoveRelationFields<Prisma.UserCreateWithoutProfileInput>;
  UserCreateWithoutPostsInput?: RemoveRelationFields<Prisma.UserCreateWithoutPostsInput>;
}

type UserFactoryType = keyof UserFactory;

type UserMap<T extends UserFactoryType = "UserCreateInput"> = Quantity & {
  create?: (index: number) => UserFactory[T];
};

type ProfileCreateInput = Partial<
  RemoveRelationFields<Prisma.ProfileCreateInput>
> & { user?: Prisma.UserCreateNestedOneWithoutProfileInput };

interface ProfileFactory {
  ProfileCreateInput: ProfileCreateInput;
  ProfileCreateWithoutUserInput?: RemoveRelationFields<Prisma.ProfileCreateWithoutUserInput>;
}

type ProfileFactoryType = keyof ProfileFactory;

type ProfileMap<T extends ProfileFactoryType = "ProfileCreateInput"> =
  Quantity & {
    create?: (index: number) => ProfileFactory[T];
  };

type PostCreateInput = Partial<RemoveRelationFields<Prisma.PostCreateInput>> & {
  author?: Prisma.UserCreateNestedOneWithoutPostsInput;
  categories?: CategoryMap<"CategoryCreateWithoutPostsInput">;
};

interface PostFactory {
  PostCreateInput: PostCreateInput;
  PostCreateWithoutAuthorInput?: RemoveRelationFields<Prisma.PostCreateWithoutAuthorInput>;
  PostCreateWithoutCategoriesInput?: RemoveRelationFields<Prisma.PostCreateWithoutCategoriesInput>;
}

type PostFactoryType = keyof PostFactory;

type PostMap<T extends PostFactoryType = "PostCreateInput"> = Quantity & {
  create?: (index: number) => PostFactory[T];
};

type CategoryCreateInput = Partial<
  RemoveRelationFields<Prisma.CategoryCreateInput>
> & { posts?: PostMap<"PostCreateWithoutCategoriesInput"> };

interface CategoryFactory {
  CategoryCreateInput: CategoryCreateInput;
  CategoryCreateWithoutPostsInput?: RemoveRelationFields<Prisma.CategoryCreateWithoutPostsInput>;
}

type CategoryFactoryType = keyof CategoryFactory;

type CategoryMap<T extends CategoryFactoryType = "CategoryCreateInput"> =
  Quantity & {
    create?: (index: number) => CategoryFactory[T];
  };
interface SeedMap {
  User?: UserMap;
  Profile?: ProfileMap;
  Post?: PostMap;
  Category?: CategoryMap;
}

const seed = (seedMap: SeedMap) => Promise<void>;

seed({
  User: {
    amount: 10,
    create: () => ({
      email: "hey@foo.com",
      profile: {
        bio: "biobiobio",
      },
      posts: {
        max: 10,
        min: 2,
        create: () => ({
          title: "post title",
        }),
      },
    }),
  },
});
