import { defineConfig, recommended } from "@acme/eslint-config";

export default defineConfig([
  {
    ignores: ["**/{.devenv,.direnv,apps,node_modules,packages}"],
  },
  ...recommended,
]);
