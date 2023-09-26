import { type KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    "apps/*": {
      entry: ["src/index.(ts|tsx)"],
    },
    "packages/*": {
      entry: ["src/index.(ts|tsx)"],
    },
  },
};

export default config;
