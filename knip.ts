import { type KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ["*.(js|ts)"],
    },
    "apps/*": {
      entry: ["*.(js|ts)", "src/index.(ts|tsx)"],
    },
    "packages/*": {
      entry: ["*.(js|ts)", "src/index.(ts|tsx)"],
    },
    // knip requires "react" to be a dependency when using `"jsx": "react-jsx"` in tsconfig.json
    "packages/tsconfig": {
      ignoreDependencies: ["react"],
    },
  },
};

export default config;
