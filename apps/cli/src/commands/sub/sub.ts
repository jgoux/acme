import { type Argv } from "yargs";
import { listCommand } from "./commands/list/list.js";

export function subCommand(program: Argv) {
  return program.command("sub <command>", "manage subs", (y) => {
    listCommand(y);
    return y;
  });
}
