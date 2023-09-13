import { type Options, execaCommand } from "execa";

export async function run(command: string, options?: Options) {
  const processedCommand = command.replace(
    "acme",
    process.env["CI"]
      ? "node dist/index.js"
      : "tsx --conditions development src/index.ts",
  );

  return execaCommand(processedCommand, options);
}
