/**
 * @type { import("eslint").Linter.Config }
 */
module.exports = {
  env: {
    // https://kangax.github.io/compat-table/es2016plus/#node16_11
    es2022: true,
    node: true,
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    extraFileExtensions: [".cjs", ".json"],
    project: [
      "./tsconfig.json"
    ],
  },
  plugins: [
    "unused-imports",
    "simple-import-sort",
    "import",
    "unicorn",
  ],
  rules: {
    // TODO: @typescript-eslint/consistent-type-imports will be autofixable soon! (https://github.com/typescript-eslint/typescript-eslint/issues/4338)
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    // TODO: Unfortunatly no autofix for now: https://github.com/import-js/eslint-plugin-import/issues/1749
    "import/extensions": ["error", "ignorePackages"],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-extraneous-dependencies": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unicorn/prefer-module": "error",
    "unicorn/prefer-node-protocol": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  }
};
