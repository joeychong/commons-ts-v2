export function is(value: number, comp: number) {
  return (value & comp) === comp;
}
