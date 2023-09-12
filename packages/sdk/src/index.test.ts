import { expect, test } from "vitest";
import { hello } from "./index.js";

test("it works", () => {
  expect(hello("world")).toBe("Hello world!");
});
