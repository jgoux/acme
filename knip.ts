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
  },
};

export default config;
