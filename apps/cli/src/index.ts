import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { helloCommand } from "./commands/hello/hello.js";
import { subCommand } from "./commands/sub/sub.js";

const program = yargs(hideBin(process.argv)).scriptName("acme");

helloCommand(program);
subCommand(program);

await program.parse();
