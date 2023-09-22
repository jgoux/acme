import { describe, expect, test } from "vitest";
import { run } from "#test";

describe("acme hello", () => {
  test("it works", async () => {
    const { stdout } = await run("acme hello Bob");

    expect(stdout).toBe("Hello Bob!");
  });
});
