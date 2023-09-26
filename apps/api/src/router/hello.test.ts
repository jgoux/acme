import { expect, test } from "vitest";
import { appRouter } from "#router/index.js";

test("it works", async () => {
  const t = appRouter.createCaller({});
  const result = await t.hello({ name: "Bob" });
  expect(result).toBe("Hello Bob!");
});
