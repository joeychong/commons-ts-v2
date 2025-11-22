/**
 * Checks if the given value has the given bits set.
 * @param value the value to check
 * @param comp the bits to check against
 * @returns true if the given value has the given bits set, false otherwise
 */
export function is(value: number, comp: number) {
  return (value & comp) === comp;
}
