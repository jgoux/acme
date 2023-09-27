export function stripArgs(commandString: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return commandString.split(/\[|</).at(0)!.trim();
}
