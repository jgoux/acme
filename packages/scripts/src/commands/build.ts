import { command } from "cleye";
import { execa } from "execa";

// if the build script fails for this package, replace it with:
// tsup src/index.ts --tsconfig tsconfig.build.json --format esm,cjs --target node16 --clean --onSuccess 'tsc --project tsconfig.build.json --emitDeclarationOnly --declaration --declarationMap'

export let tsupBuildOptions = [
  "src/index.ts",
  "--tsconfig",
  "tsconfig.build.json",
  "--format",
  "esm,cjs",
  "--target",
  "node16",
  "--clean",
];

export const tscBuildOptions = [
  "--project",
  "tsconfig.build.json",
  "--emitDeclarationOnly",
  "--declaration",
  "--declarationMap",
];

export const buildCommand = command(
  {
    name: "build",
    parameters: ["[file]"],
    flags: {
      types: Boolean,
      project: String,
      outDir: String,
    },
  },
  (argv) => {
    if (argv._.file) {
      tsupBuildOptions[0] = argv._.file;
    }
    if (argv.flags.project) {
      tsupBuildOptions[2] = argv.flags.project;
      tscBuildOptions[1] = argv.flags.project;
    }
    if (argv.flags.outDir) {
      tsupBuildOptions = [...tsupBuildOptions, "--outDir", argv.flags.outDir];
    }
    if (argv.flags.types) {
      void execa("tsc", tscBuildOptions, { stdio: "inherit" });
    } else {
      void execa(
        "tsup",
        [
          ...tsupBuildOptions,
          "--onSuccess",
          `tsc ${tscBuildOptions.join(" ")}`,
        ],
        { stdio: "inherit" }
      );
    }
  }
);
