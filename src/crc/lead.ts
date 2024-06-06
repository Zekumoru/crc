/**
 * Calculates the leading bit.
 * @param x The number to get its leading bit.
 * @param p The placement of the leading bit.
 * @returns A binary number of the leading bit.
 */
const lead = (x: number, p: number) => {
  const t = 1 << p;
  return (x & t) >> p;
};

export default lead;
