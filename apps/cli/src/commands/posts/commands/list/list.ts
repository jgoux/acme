import { type Argv } from "yargs";

export function listCommand(program: Argv) {
  return program.command("list", "list posts", async () => {
    const { trpc } = await import("#config/trpc.js");

    const posts = await trpc.posts.list.query();

    console.log(posts);
  });
}
