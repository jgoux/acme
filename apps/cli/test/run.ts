import { type Options, execaCommand } from "execa";
import { fileURLToPath } from "node:url";

export async function run(command: string, options?: Options) {
  const processedCommand = command.replace(
    "acme",
    process.env["CI"] ? "node dist/index.js" : "bun src/index.ts",
  );

  return execaCommand(processedCommand, {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    shell: true,
    preferLocal: true,
    ...options,
  });
}
