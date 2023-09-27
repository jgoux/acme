import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineProject } from "vitest/config";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")) as {
  name: string;
};

const root = dirname(fileURLToPath(import.meta.url));

export default defineProject({
  test: {
    name: pkg.name,
    root,
    env: config({ path: resolve(root, ".env") }).parsed,
  },
});
