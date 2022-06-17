import { generatorHandler } from "@prisma/generator-helper";

import { version } from "../package.json";
import { generate } from "./generate/index.js";

generatorHandler({
  onManifest() {
    return {
      version,
      defaultOutput: "__generated__",
      prettyName: "Prisma Seeds",
    };
  },
  onGenerate(options) {
    return generate(options);
  },
});
