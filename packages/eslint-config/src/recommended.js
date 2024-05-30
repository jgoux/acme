// @ts-check
import eslint from '@eslint/js';
import importPlugin from "eslint-plugin-import-x";
import nodeImportPlugin from "eslint-plugin-node-import";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import tseslint from 'typescript-eslint';

export const recommended = tseslint.config(
  {
    ignores: ["**/{.cache,.dts,dist,node_modules,playwright,test-results}"],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  eslint.configs.recommended,
  {
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/return-await": "error",
      "no-restricted-syntax": ["error",
        {
          "selector": "TSEnumDeclaration",
          "message": "Use const object instead of enum."
        }
      ],
    }
  },
  {
    plugins: {
      "import-x": importPlugin,
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
      "import-x/parsers": {
        "@typescript-eslint/parser": [".js", ".cjs", ".mjs", ".jsx", ".cjsx", ".mjsx", ".ts", ".cts", ".mts", ".tsx", ".ctsx", ".mtsx"],
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      "import-x/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": ["error", { "prefer-inline": true }],
      "import-x/no-unresolved": "off",
    }
  },
  {
    plugins: {
      "node-import": nodeImportPlugin,
    },
    rules: {
      "node-import/prefer-node-protocol": "error",
    }
  },
  {
    plugins: {
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }],
    }
  },
  {
    ...perfectionistPlugin.configs['recommended-natural'],
    plugins: {
      "perfectionist": perfectionistPlugin,
    },
    rules: {
      ...perfectionistPlugin.configs['recommended-natural'].rules,
      "perfectionist/sort-imports": ["error", {
        ...perfectionistPlugin.configs["recommended-natural"].rules["perfectionist/sort-imports"][1],
        "newlines-between": "never",
        "internal-pattern": ["#*", "#*/**"],
      }],
      "perfectionist/sort-objects": "off",
    }
  },
  vitestPlugin.configs.recommended,
  prettierPluginRecommended,
);