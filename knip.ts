import { type KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    "apps/*": {
      entry: ["src/index.(ts|tsx)", "global.d.ts"],
    },
    "packages/*": {
      entry: ["src/index.(ts|tsx)", "global.d.ts"],
    },
  },
};

export default config;
