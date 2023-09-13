import { expect, test } from "vitest";
import { run } from "#test";

test("should pass", async () => {
  const { stdout } = await run("acme hello Bob");
  expect(stdout).toBe("Hello Bob!");
});
