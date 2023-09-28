import { markdownTable } from "markdown-table";
import { type Command } from "#parse/types.js";

function serializeTitle(command: Command, level: number) {
  return `${Array(level).fill("#").join("")} **${command.shortName}**`;
}

function serializeDescription(command: Command) {
  if (!command.description) {
    return null;
  }

  let [verb, ...rest] = command.description.split(" ");
  if (verb?.endsWith("s")) {
    verb = verb.slice(0, -1);
  }

  const description = [verb, ...rest].join(" ");

  return `The \`${command.name}\` command is used to ${description}.`;
}

function serializeUsage(command: Command) {
  const title = "**Usage**";

  const code = `\`\`\`bash >_&nbsp;terminal
${command.template}
\`\`\``;

  return [title, code].join("\n\n");
}

function serializePositionals(command: Command) {
  if (command.positionals.length === 0) {
    return null;
  }

  const columns = ["Name", "Description", "Type"];

  const rows = command.positionals.map((positional) => [
    positional.name,
    positional.description,
    positional.type,
  ]);

  return ["**Command Args**", markdownTable([columns, ...rows])].join("\n\n");
}

function serializeOptions(command: Command) {
  if (command.options.length === 0) {
    return null;
  }

  let columns = [
    "Name",
    "Alias",
    "Description",
    "Type",
    "Required",
    "Deprecated",
    "Choices",
    "Default",
    "Usage",
  ];

  let rows = command.options.map((option) => [
    option.name,
    option.alias,
    option.description,
    option.type,
    option.required ? "✔" : undefined,
    option.deprecated ? "✔" : undefined,
    option.choices ? option.choices.toString() : undefined,
    option.default ? option.default.toString() : undefined,
    option.usage,
  ]);

  // remove empty columns
  const emptyColumns = rows.reduce((acc, row) => {
    row.forEach((cell, index) => {
      acc[index] = acc[index] ?? cell;
    });
    return acc;
  }, []);
  columns = columns.filter((_, index) => emptyColumns[index]);
  rows = rows.map((row) => row.filter((_, index) => emptyColumns[index]));

  // center columns containing emoji
  const deprecatedIndex = columns.indexOf("Deprecated");
  const requiredIndex = columns.indexOf("Required");
  const align = Array(columns.length).fill(undefined);
  if (deprecatedIndex !== -1) {
    align[deprecatedIndex] = "c";
  }
  if (requiredIndex !== -1) {
    align[requiredIndex] = "c";
  }

  return [
    "**Command Flags**",
    markdownTable([columns, ...rows], {
      align,
    }),
  ].join("\n\n");
}

function serializeCommand(command: Command, level = 1): string {
  let title,
    description,
    usage,
    commandArgs,
    commandFlags = null;

  // skip top command
  if (level > 1) {
    title = serializeTitle(command, level);
    description = serializeDescription(command);
    usage = serializeUsage(command);
    commandArgs = serializePositionals(command);
    commandFlags = serializeOptions(command);
  }

  const subCommands = command.commands.length
    ? command.commands
        .map((subCommand) => serializeCommand(subCommand, level + 1))
        .join("\n\n")
    : null;

  return [title, description, usage, commandArgs, commandFlags, subCommands]
    .filter(Boolean)
    .join("\n\n");
}

export function serialize(command: Command) {
  const title = "# CLI Commands";

  const description =
    "You can use the Command-Line Interface (CLI) provided by Snaplet to manage your data from a terminal window.";

  return [title, description, serializeCommand(command)].join("\n\n");
}
