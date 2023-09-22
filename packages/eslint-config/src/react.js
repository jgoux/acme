import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPluginJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactPluginRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import playwrightPlugin from "eslint-plugin-playwright";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";

export const react = [
  {
    files: ["**/*.?([cm])[jt]s?(x)"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      }
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: reactPluginRecommended.plugins.react,
      "jsx-runtime": reactPluginJsxRuntime,
      "jsx-a11y": jsxA11yPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    rules: {
      ...reactPluginRecommended.rules,
      ...reactPluginJsxRuntime.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }],
    },
  },
  {
    files: storybookPlugin.configs.recommended.overrides[0].files,
    plugins: {
      "storybook": storybookPlugin,
    },
    rules: storybookPlugin.configs.recommended.overrides[0].rules
  },
  {
    files: ["**/?(*.)+(e2e|test).?([cm])[jt]s?(x)"],
    languageOptions: {
      globals: {
        ...globals["shared-node-browser"],
      },
    },
    plugins: {
      "playwright": playwrightPlugin,
    },
    rules: playwrightPlugin.configs.recommended.rules,
  }
];