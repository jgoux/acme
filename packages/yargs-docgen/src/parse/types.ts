export interface Positional {
  description?: string;
  name: string;
  type: string;
}

export interface Option {
  alias?: string;
  choices?: Array<string>;
  default?: Array<string> | string;
  deprecated: boolean;
  description?: string;
  name: string;
  required: boolean;
  type: string;
  usage?: string;
}

export interface Command {
  aliases: Array<string>;
  commands: Array<Command>;
  description?: string;
  name: string;
  options: Array<Option>;
  positionals: Array<Positional>;
  shortName: string;
  template: string;
}
