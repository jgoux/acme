import { recommended } from "@acme/eslint-config";

export default [
  {
    ignores: ["**/{.devenv,.direnv,apps,node_modules,packages}"],
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...recommended,
];
