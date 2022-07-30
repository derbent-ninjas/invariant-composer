export const lowercaseFirstChar = (str: string): string => {
  const [first, ...rest] = str;
  return first === undefined ? '' : first.toLowerCase() + rest.join('');
}
