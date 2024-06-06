/**
 * Calculates the degree of the left-most bit.
 * @param x The number to get its left-most bit's degree.
 * @returns The degree of the left-most bit.
 * @throws Throws an Error if x is negative.
 */
const degree = (x: number) => {
  if (x < 0) throw new Error('Number cannot be negative to get its degree.');
  return Math.floor(Math.log2(x));
};

export default degree;
