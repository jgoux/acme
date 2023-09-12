import { hello } from "@snaplet/sdk";
import { parseArgs } from "node:util";

const { positionals } = parseArgs({
  allowPositionals: true,
});

const [name] = positionals;

console.log(hello(name ?? "world"));
