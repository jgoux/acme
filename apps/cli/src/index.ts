import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { helloCommand } from "./commands/hello/hello.js";
import { postsCommand } from "./commands/posts/posts.js";

const program = yargs(hideBin(process.argv)).scriptName("acme");

helloCommand(program);
postsCommand(program);

await program.parse();
