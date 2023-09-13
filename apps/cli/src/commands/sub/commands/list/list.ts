import { type Argv } from "yargs";

export function listCommand(program: Argv) {
  return program.command("list", "list subs", () => {
    console.log(["sub1", "sub2"]);
  });
}
