import { type KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ["*.(js|ts)"],
    },
    "apps/*": {
      entry: ["*.(js|ts)", "src/index.ts"],
    },
    "packages/*": {
      entry: ["*.(js|ts)", "src/index.ts"],
    },
  },
};

export default config;
