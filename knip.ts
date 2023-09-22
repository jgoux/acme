import { type KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ["*.(js|ts)"],
    },
    "apps/*": {
      entry: ["*.(js|ts)", "src/index.(ts|tsx)"],
      playwright: {
        entry: ["playwright.config.{js,ts}", "playwright/index.tsx"],
      },
      storybook: {
        config: [".storybook/{main,manager,test-runner}.{js,ts}"],
      },
      typescript: {
        config: ["tsconfig.json", "tsconfig.*.json"],
      },
    },
    "packages/*": {
      entry: ["*.(js|ts)", "src/index.(ts|tsx)"],
      typescript: {
        config: ["tsconfig.json", "tsconfig.*.json"],
      },
    },
  },
};

export default config;
