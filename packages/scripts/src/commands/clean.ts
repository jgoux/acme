import { command } from "cleye";
import { execa } from "execa";

export const cleanCommand = command(
  {
    name: "clean",
  },
  () => {
    void execa("rimraf", ["dist", "node_modules", "src/**/__generated__"], {
      stdio: "inherit",
    });
  }
);
