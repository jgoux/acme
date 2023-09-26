import { t } from "#config/trpc.js";
import { listPostsProcedure } from "./listPosts.js";

export const postsRouter = t.router({
  list: listPostsProcedure,
});
