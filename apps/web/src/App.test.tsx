import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";
import { App } from "./App";

test("renders correctly", () => {
  render(<App />);
  expect(screen.getByText("Vite + React")).toBeInTheDocument();
});

test("can interact", async () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "count is 0" });
  expect(button).toBeInTheDocument();
  await userEvent.click(button);
  expect(button).toHaveTextContent("count is 1");
});
