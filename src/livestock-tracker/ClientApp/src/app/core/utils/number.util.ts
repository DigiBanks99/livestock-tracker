/** A standard compare function for comparing numbers.
 *
 * @param a: the first number
 * @param b: the second number
 * @returns
 * - -1 if a < b
 * - 0 if a = b
 * - 1 if a > b
 */
export function compare(a: number, b: number): number {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }
}
