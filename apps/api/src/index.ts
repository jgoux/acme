import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./router.js";

createHTTPServer({
  router: appRouter,
}).listen(1337);
