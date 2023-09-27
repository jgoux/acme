import { defineWorkspace } from "vitest/config";

export default defineWorkspace(["apps/{api,cli}", "packages/core"]);
