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

interface ProfileCreateNestedOneWithoutUserInput {
  create?: XOR<
    ProfileCreateWithoutUserInput,
    Prisma.ProfileUncheckedCreateWithoutUserInput
  >;
  connectOrCreate?: ProfileCreateOrConnectWithoutUserInput;
  connect?: Prisma.ProfileWhereUniqueInput;
}

interface ProfileCreateOrConnectWithoutUserInput {
  where: Prisma.ProfileWhereUniqueInput;
  create: XOR<
    ProfileCreateWithoutUserInput,
    Prisma.ProfileUncheckedCreateWithoutUserInput
  >;
}

interface UserCreateNestedOneWithoutPredecessorInput {
  create?: XOR<
    UserCreateWithoutPredecessorInput,
    Prisma.UserUncheckedCreateWithoutPredecessorInput
  >;
  connectOrCreate?: UserCreateOrConnectWithoutPredecessorInput;
  connect?: Prisma.UserWhereUniqueInput;
}

interface UserCreateOrConnectWithoutPredecessorInput {
  where: Prisma.UserWhereUniqueInput;
  create: XOR<
    UserCreateWithoutPredecessorInput,
    Prisma.UserUncheckedCreateWithoutPredecessorInput
  >;
}

interface UserCreateNestedOneWithoutStudentsInput {
  create?: XOR<
    UserCreateWithoutStudentsInput,
    Prisma.UserUncheckedCreateWithoutStudentsInput
  >;
  connectOrCreate?: UserCreateOrConnectWithoutStudentsInput;
  connect?: Prisma.UserWhereUniqueInput;
}

interface UserCreateOrConnectWithoutStudentsInput {
  where: Prisma.UserWhereUniqueInput;
  create: XOR<
    UserCreateWithoutStudentsInput,
    Prisma.UserUncheckedCreateWithoutStudentsInput
  >;
}

type UserCreateWithoutPredecessorInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutPredecessorInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

interface UserCreateNestedOneWithoutSuccessorInput {
  create?: XOR<
    UserCreateWithoutSuccessorInput,
    Prisma.UserUncheckedCreateWithoutSuccessorInput
  >;
  connectOrCreate?: UserCreateOrConnectWithoutSuccessorInput;
  connect?: Prisma.UserWhereUniqueInput;
}

interface UserCreateOrConnectWithoutSuccessorInput {
  where: Prisma.UserWhereUniqueInput;
  create: XOR<
    UserCreateWithoutSuccessorInput,
    Prisma.UserUncheckedCreateWithoutSuccessorInput
  >;
}

type UserCreateWithoutSuccessorInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutSuccessorInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutStudentsInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutStudentsInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutTeacherInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutTeacherInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutFollowingInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutFollowingInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
};

type UserCreateWithoutFollowedByInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutFollowedByInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutProfileInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutProfileInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutPostsInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutPostsInput>
> & {
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type ProfileCreateWithoutUserInput = Partial<
  RemoveRelationFields<Prisma.ProfileCreateWithoutUserInput>
>;

interface UserCreateNestedOneWithoutProfileInput {
  create?: XOR<
    UserCreateWithoutProfileInput,
    Prisma.UserUncheckedCreateWithoutProfileInput
  >;
  connectOrCreate?: UserCreateOrConnectWithoutProfileInput;
  connect?: Prisma.UserWhereUniqueInput;
}

interface UserCreateOrConnectWithoutProfileInput {
  where: Prisma.UserWhereUniqueInput;
  create: XOR<
    UserCreateWithoutProfileInput,
    Prisma.UserUncheckedCreateWithoutProfileInput
  >;
}

type PostCreateWithoutAuthorInput = Partial<
  RemoveRelationFields<Prisma.PostCreateWithoutAuthorInput>
> & { categories?: CategoryMap<"CategoryCreateWithoutPostsInput"> };

interface UserCreateNestedOneWithoutPostsInput {
  create?: XOR<
    UserCreateWithoutPostsInput,
    Prisma.UserUncheckedCreateWithoutPostsInput
  >;
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput;
  connect?: Prisma.UserWhereUniqueInput;
}

interface UserCreateOrConnectWithoutPostsInput {
  where: Prisma.UserWhereUniqueInput;
  create: XOR<
    UserCreateWithoutPostsInput,
    Prisma.UserUncheckedCreateWithoutPostsInput
  >;
}

type PostCreateWithoutCategoriesInput = Partial<
  RemoveRelationFields<Prisma.PostCreateWithoutCategoriesInput>
> & { author?: UserCreateNestedOneWithoutPostsInput };

type CategoryCreateWithoutPostsInput = Partial<
  RemoveRelationFields<Prisma.CategoryCreateWithoutPostsInput>
>;

type UserCreateInput = Partial<RemoveRelationFields<Prisma.UserCreateInput>> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateNestedOneWithoutUserInput;
  successor?: UserCreateNestedOneWithoutPredecessorInput;
  predecessor?: UserCreateNestedOneWithoutSuccessorInput;
  teacher?: UserCreateNestedOneWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

interface UserFactory {
  UserCreateInput: UserCreateInput;
  UserCreateWithoutPredecessorInput?: UserCreateWithoutPredecessorInput;
  UserCreateWithoutSuccessorInput?: UserCreateWithoutSuccessorInput;
  UserCreateWithoutStudentsInput?: UserCreateWithoutStudentsInput;
  UserCreateWithoutTeacherInput?: UserCreateWithoutTeacherInput;
  UserCreateWithoutFollowingInput?: UserCreateWithoutFollowingInput;
  UserCreateWithoutFollowedByInput?: UserCreateWithoutFollowedByInput;
  UserCreateWithoutProfileInput?: UserCreateWithoutProfileInput;
  UserCreateWithoutPostsInput?: UserCreateWithoutPostsInput;
}

type UserFactoryType = keyof UserFactory;

type UserMap<T extends UserFactoryType = "UserCreateInput"> = Quantity & {
  create?: (index: number) => UserFactory[T];
};

type ProfileCreateInput = Partial<
  RemoveRelationFields<Prisma.ProfileCreateInput>
> & { user?: UserCreateNestedOneWithoutProfileInput };

interface ProfileFactory {
  ProfileCreateInput: ProfileCreateInput;
  ProfileCreateWithoutUserInput?: ProfileCreateWithoutUserInput;
}

type ProfileFactoryType = keyof ProfileFactory;

type ProfileMap<T extends ProfileFactoryType = "ProfileCreateInput"> =
  Quantity & {
    create?: (index: number) => ProfileFactory[T];
  };

type PostCreateInput = Partial<RemoveRelationFields<Prisma.PostCreateInput>> & {
  author?: UserCreateNestedOneWithoutPostsInput;
  categories?: CategoryMap<"CategoryCreateWithoutPostsInput">;
};

interface PostFactory {
  PostCreateInput: PostCreateInput;
  PostCreateWithoutAuthorInput?: PostCreateWithoutAuthorInput;
  PostCreateWithoutCategoriesInput?: PostCreateWithoutCategoriesInput;
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
  CategoryCreateWithoutPostsInput?: CategoryCreateWithoutPostsInput;
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
      followedBy: {
        create: () => ({
          amount: 3,
          posts: {
            create: (i) => ({
              ...(i === 0 && { title: "First post" }),
              categories: {
                min: 3,
                max: 10,
              },
            }),
          },
        }),
      },
      posts: {
        max: 10,
        min: 2,
        create: () => ({
          title: "post title",
          categories: {
            amount: 9,
            create: () => ({
              name: "yolo",
            }),
          },
        }),
      },
    }),
  },
});
