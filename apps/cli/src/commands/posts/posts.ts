import { type Argv } from "yargs";
import { listCommand } from "./commands/list/list.js";

export function postsCommand(program: Argv) {
  return program.command("posts <command>", "manage posts", (y) => {
    listCommand(y);
    return y;
  });
}
