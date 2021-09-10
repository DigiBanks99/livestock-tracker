/**
 * Generates a random number between two integers, exclusive of the max.
 *
 * @param min The minimum value that can be generated.
 * @param max The maximum value excluded that can be generated.
 * @returns a random number in the range.
 */
export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
