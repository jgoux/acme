import type { Faker } from "@faker-js/faker";
import type { Prisma, PrismaClient } from "@prisma/client";

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

type UserCreateWithoutPredecessorInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutPredecessorInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutSuccessorInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutSuccessorInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutStudentsInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutStudentsInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutTeacherInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutTeacherInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutFollowingInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutFollowingInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
};

type UserCreateWithoutFollowedByInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutFollowedByInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutProfileInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutProfileInput>
> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type UserCreateWithoutPostsInput = Partial<
  RemoveRelationFields<Prisma.UserCreateWithoutPostsInput>
> & {
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
  students?: UserMap<"UserCreateWithoutTeacherInput">;
  followedBy?: UserMap<"UserCreateWithoutFollowingInput">;
  following?: UserMap<"UserCreateWithoutFollowedByInput">;
};

type ProfileCreateWithoutUserInput = Partial<
  RemoveRelationFields<Prisma.ProfileCreateWithoutUserInput>
>;

type PostCreateWithoutAuthorInput = Partial<
  RemoveRelationFields<Prisma.PostCreateWithoutAuthorInput>
> & { categories?: CategoryMap<"CategoryCreateWithoutPostsInput"> };

type PostCreateWithoutCategoriesInput = Partial<
  RemoveRelationFields<Prisma.PostCreateWithoutCategoriesInput>
> & { author?: UserCreateWithoutPostsInput };

type CategoryCreateWithoutPostsInput = Partial<
  RemoveRelationFields<Prisma.CategoryCreateWithoutPostsInput>
>;

type UserCreateInput = Partial<RemoveRelationFields<Prisma.UserCreateInput>> & {
  posts?: PostMap<"PostCreateWithoutAuthorInput">;
  profile?: ProfileCreateWithoutUserInput;
  successor?: UserCreateWithoutPredecessorInput;
  predecessor?: UserCreateWithoutSuccessorInput;
  teacher?: UserCreateWithoutStudentsInput;
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
> & { user?: UserCreateWithoutProfileInput };

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
  author?: UserCreateWithoutPostsInput;
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

interface SeedConfig {
  prisma: PrismaClient;
  faker?: Faker;
  factories?: (faker: Faker) => {
    User?: Partial<RemoveRelationFields<Prisma.UserCreateInput>>;
    Profile?: Partial<RemoveRelationFields<Prisma.ProfileCreateInput>>;
    Post?: Partial<RemoveRelationFields<Prisma.PostCreateInput>>;
    Category?: Partial<RemoveRelationFields<Prisma.CategoryCreateInput>>;
  };
}

type CreateSeed = (config: SeedConfig) => (seedMap: SeedMap) => Promise<void>;

type Entries<T> = {
  [K in keyof T]-?: [K, NonNullable<T[K]>];
}[keyof T][];

export const createSeed: CreateSeed =
  ({ prisma }) =>
  async (seedMap) => {
    const modelEntries = Object.entries(seedMap) as Entries<SeedMap>;
    const modelsSeedInputs = modelEntries.flatMap(([modelName, modelMap]) => {
      return [modelName, modelMap] as Entries<SeedMap>;
    });

    await prisma.$transaction(
      modelsSeedInputs.map(([modelName, modelMap]) =>
        // @ts-expect-error at this point we're too dynamic to care about the types
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        prisma[modelName.toLowerCase()].createMany(modelMap)
      )
    );
  };
