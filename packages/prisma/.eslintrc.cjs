/**
 * @type { import("eslint").Linter.Config }
 */
module.exports = {
  extends: ["@acme/eslint-config/recommended"],
  ignorePatterns: ["**/__generated__/*"],
};
