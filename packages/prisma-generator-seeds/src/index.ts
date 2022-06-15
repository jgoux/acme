import { generatorHandler } from "@prisma/generator-helper";

import { version } from "../package.json";
import { generateSeed } from "./generate-seed.js";

generatorHandler({
  onManifest() {
    return {
      version,
      defaultOutput: "__generated__",
      prettyName: "Prisma Seeds",
    };
  },
  onGenerate(options) {
    return generateSeed(options);
  },
});
