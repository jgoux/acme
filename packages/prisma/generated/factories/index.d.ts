import type { CreateFactoryOptions, CreateFactoryHooks, CreateFactoryReturn } from "prisma-factory";
import type { ObjectWithMaybeCallbacks } from "prisma-factory";
import { Prisma, User, Profile, Post, Category } from "/Users/jgoux/Documents/code/acme/node_modules/@prisma/client";
export declare function createUserFactory(requiredAttrs?: ObjectWithMaybeCallbacks<Partial<Prisma.UserCreateInput>>, options?: CreateFactoryOptions, hooks?: CreateFactoryHooks<Prisma.UserCreateInput, User>): CreateFactoryReturn<Prisma.UserCreateInput, User>;
export declare function createProfileFactory(requiredAttrs?: ObjectWithMaybeCallbacks<Partial<Prisma.ProfileCreateInput>>, options?: CreateFactoryOptions, hooks?: CreateFactoryHooks<Prisma.ProfileCreateInput, Profile>): CreateFactoryReturn<Prisma.ProfileCreateInput, Profile>;
export declare function createPostFactory(requiredAttrs?: ObjectWithMaybeCallbacks<Partial<Prisma.PostCreateInput>>, options?: CreateFactoryOptions, hooks?: CreateFactoryHooks<Prisma.PostCreateInput, Post>): CreateFactoryReturn<Prisma.PostCreateInput, Post>;
export declare function createCategoryFactory(requiredAttrs?: ObjectWithMaybeCallbacks<Partial<Prisma.CategoryCreateInput>>, options?: CreateFactoryOptions, hooks?: CreateFactoryHooks<Prisma.CategoryCreateInput, Category>): CreateFactoryReturn<Prisma.CategoryCreateInput, Category>;
