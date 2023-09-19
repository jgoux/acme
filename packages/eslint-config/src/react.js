import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPluginJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactPluginRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import globals from "globals";
import { recommended } from "./recommended.js"

export const react = {
  ...reactPluginRecommended,
  files: recommended.files,
  ignores: recommended.ignores,
  languageOptions: {
    ...recommended.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
    parserOptions: {
      ...recommended.languageOptions.parserOptions,
      ecmaFeatures: {
        jsx: true,
      },
    }
  },
  settings: {
    ...recommended.settings,
    react: {
      version: "detect",
    },
  },
  plugins: {
    ...recommended.plugins,
    react: reactPluginRecommended.plugins.react,
    "jsx-runtime": reactPluginJsxRuntime,
    "jsx-a11y": jsxA11yPlugin,
    "react-hooks": reactHooksPlugin,
    "react-refresh": reactRefreshPlugin,
  },
  rules: {
    ...recommended.rules,
    ...reactPluginRecommended.rules,
    ...reactPluginJsxRuntime.rules,
    ...jsxA11yPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }],
  },
};