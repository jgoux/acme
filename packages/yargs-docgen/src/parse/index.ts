import { execaCommand } from "execa";
import { type Command } from "./types.js";
import { stripArgs } from "./utils.js";

const GLOBAL_OPTIONS = ["--help", "--version"];

function parseHint(hint: string) {
  if (hint.startsWith("choices: ")) {
    return {
      choices: hint.slice("choices: ".length).replaceAll('"', "").split(", "),
    };
  } else if (hint.startsWith("default: ")) {
    const rawValue = hint.slice("default: ".length);
    if (rawValue.startsWith("[")) {
      return { default: rawValue.slice(1).replaceAll('"', "").split(",") };
    } else {
      return { default: rawValue.replaceAll('"', "") };
    }
  } else if (hint === "required") {
    return { required: true };
  } else if (hint.startsWith("deprecated")) {
    return { deprecated: true };
  } else {
    return { type: hint };
  }
}

export async function parse(commandString: string) {
  const { stdout } = await execaCommand(`${commandString} --help`, {
    env: {
      YARGS_DISABLE_WRAP: "true",
    },
    preferLocal: true,
  });

  const [commandTemplate, ...groups] = stdout.split("\n\n");

  if (!commandTemplate) {
    throw new Error(`Could not parse command: ${commandString}`);
  }

  const name = stripArgs(commandTemplate);

  const command: Command = {
    aliases: [],
    commands: [],
    name,
    options: [],
    positionals: [],
    shortName: name,
    template: commandTemplate,
  };

  for (const group of groups) {
    if (group.startsWith("Commands:")) {
      const [, ...subCommandGroupRows] = group.split("\n");
      for (const subCommandGroupRow of subCommandGroupRows) {
        const [subCommandTemplate] = subCommandGroupRow.trim().split(/\s\s+/);
        if (!subCommandTemplate) {
          throw new Error(`Could not parse sub command: ${subCommandGroupRow}`);
        }
        const subCommandBase = stripArgs(subCommandTemplate);
        // short-circuit recursive command when defaulting to a subcommand
        if (subCommandBase === stripArgs(commandTemplate)) {
          continue;
        }
        let subCommandAliases: Array<string> = [];
        const matches = subCommandGroupRow.match(
          /\[aliases: (?<aliasesString>.+)\]/,
        );
        if (matches?.groups?.["aliasesString"]) {
          subCommandAliases = matches.groups["aliasesString"]
            .split(",")
            .filter(Boolean);
        }
        const subCommand = await parse(`${subCommandBase}`);

        subCommand.aliases = subCommandAliases;
        subCommand.shortName = subCommand.name.replace(command.name, "").trim();

        // special case for the completion command
        if (subCommandBase.endsWith(" completion")) {
          subCommand.template = subCommandBase;
          subCommand.description = "generate completion script";
          subCommand.name = subCommandBase;
          subCommand.shortName = "completion";
        }

        command.commands.push(subCommand);
      }
    } else if (group.startsWith("Positionals:")) {
      const positionalGroupRows = group.split("\n").slice(1);
      for (const positionalGroupRow of positionalGroupRows) {
        const [positionalName, ...positionalParts] = positionalGroupRow
          .trim()
          .split(/\s\s+/);
        if (!positionalName) {
          throw new Error(`Could not parse positional: ${positionalGroupRow}`);
        }
        const positionalHints = positionalParts.pop();
        if (!positionalHints) {
          throw new Error(`Could not parse positional: ${positionalGroupRow}`);
        }
        let positionalType = "";
        const positionalHintsMatches = positionalHints.matchAll(/\[(.+?)\]/g);
        for (const [, positionalHint] of positionalHintsMatches) {
          if (!positionalHint) {
            throw new Error(
              `Could not parse positional hints: ${JSON.stringify(
                positionalHintsMatches,
              )}`,
            );
          }
          positionalType = positionalHint;
        }

        const positionalDescription = positionalParts.at(0);

        command.positionals.push({
          description: positionalDescription,
          name: positionalName,
          type: positionalType,
        });
      }
    } else if (group.startsWith("Options:")) {
      const optionGroupRows = group.split("\n").slice(1);
      for (const optionGroupRow of optionGroupRows) {
        const [optionNameAndOptionAlias, ...optionParts] = optionGroupRow
          .trim()
          .split(/\s\s+/);
        if (!optionNameAndOptionAlias) {
          throw new Error(`Could not parse option: ${optionGroupRow}`);
        }
        const optionNameAndOptionAliasParts =
          optionNameAndOptionAlias.split(", ");
        let optionName: string;
        let optionAlias: string | undefined;
        if (optionNameAndOptionAliasParts.length === 1) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          optionName = optionNameAndOptionAliasParts.at(0)!;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          optionName = optionNameAndOptionAliasParts.at(1)!;
          optionAlias = optionNameAndOptionAliasParts.at(0);
        }

        if (GLOBAL_OPTIONS.includes(optionName)) {
          continue;
        }

        const optionDescription =
          optionParts.length === 2 ? optionParts.at(0) : undefined;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const rawOptionHints = optionParts.at(-1)!;

        const optionHints: Array<ReturnType<typeof parseHint>> = [];

        for (const [, rawOptionHint] of rawOptionHints.matchAll(/\[(.+?)\]/g)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          optionHints.push(parseHint(rawOptionHint!));
        }

        const optionHintsMap = optionHints.reduce<{
          choices?: Array<string>;
          default?: Array<string> | string;
          deprecated: boolean;
          required: boolean;
          type: string;
        }>((acc, hint) => ({ ...acc, ...hint }), {
          deprecated: false,
          required: false,
          type: "string",
        });

        command.options.push({
          alias: optionAlias,
          description: optionDescription,
          name: optionName,
          ...optionHintsMap,
        });
      }
    } else {
      command.description = group;
    }
  }

  return command;
}
