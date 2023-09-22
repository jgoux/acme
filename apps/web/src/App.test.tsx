import { expect, test } from "@playwright/experimental-ct-react";
import { App } from "./App";

test("renders correctly", async ({ mount }) => {
  const screen = await mount(<App />);
  await expect(screen.getByText("Vite + React")).toBeVisible();
});

test("can interact", async ({ mount }) => {
  const screen = await mount(<App />);
  const button = screen.getByRole("button", { name: "count is 0" });
  await expect(button).toBeVisible();
  await button.click();
  await expect(
    screen.getByRole("button", { name: "count is 1" }),
  ).toBeVisible();
});
