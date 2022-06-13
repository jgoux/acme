import { cli } from "cleye";

import { buildCommand } from "./commands/build.js";
import { cleanCommand } from "./commands/clean.js";
import { devCommand } from "./commands/dev.js";
import { lintCommand } from "./commands/lint.js";
import { startCommand } from "./commands/start.js";
import { testCommand } from "./commands/test.js";

cli({
  name: "acme-scripts",
  commands: [
    buildCommand,
    cleanCommand,
    devCommand,
    lintCommand,
    startCommand,
    testCommand,
  ],
});
