import degree from './degree';
import lead from './lead';

/**
 * Long divides binary numbers.
 * @param n The dividend.
 * @param d The divisor.
 * @returns Returns a tuple of the quotient and the remainder.
 */
const longDivBits = (n: number, d: number) => {
  if (d === 0) throw new Error('Divisor cannot be 0.');

  let q = 0; // quotient
  let r = n; // remainder

  for (
    let degreeR = degree(r), degreeD = degree(d);
    r !== 0 && degreeR >= degreeD;
    degreeR--
  ) {
    const t = Math.round(lead(r, degreeR) / lead(d, degreeD));
    q = (q << 1) + t;
    r = r ^ ((t * d) << (degreeR - degreeD));
  }

  return [q, r] as const;
};

export default longDivBits;
