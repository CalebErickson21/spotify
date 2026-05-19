// Removes all whitespace so inputs cannot have whitespaces
export function stripWhitespace(value: string): string {
  return value.replace(/\s/g, '');
}
