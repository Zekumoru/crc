/**
 * Converts an array of degrees to a number with each bit corresponding to the degrees.
 * @param degrees An array of numbers specifying which degrees are 1.
 * @returns A number that if viewed in bits correspond to the degrees given on the array.
 */
const buildBitsFromDegrees = (degrees: number[]) => {
  let bits = 0;
  const set = new Set(degrees);
  for (const degree of set) {
    bits += 1 << degree;
  }
  return bits;
};

export default buildBitsFromDegrees;
