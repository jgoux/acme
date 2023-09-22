import { type TestRunnerConfig, getStoryContext } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

/*
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const a11yConfig: TestRunnerConfig = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not run a11y tests on disabled stories.
    if (
      (storyContext.parameters as { a11y?: { disable?: boolean } }).a11y
        ?.disable
    ) {
      return;
    }

    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default a11yConfig;
