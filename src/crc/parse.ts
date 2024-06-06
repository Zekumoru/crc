import buildBitsFromDegrees from './buildBitsFromDegrees';
import { CRCExpressionParseError, CRCExpressionTooBigError } from './errors';

const parse = (data: string) => {
  if (data.trim() === '') return 0;

  // x\^[^x+\s] matches x^EXPR where EXPR can be of any characters
  // [^x]* matches anything except with x
  const matches = data.match(/(x\^[^x+\s]+|[^x]*)/g)!;
  const degrees: number[] = [];

  // validate expression
  let valid = true;
  // matches.length - 1 because there's an extra space after the string
  // and it doesn't count for validating
  for (let i = 0; i < matches.length - 1 && valid; i++) {
    const match = matches[i];

    // odd: must be a plus
    if (i % 2) {
      valid = match.trim() === '+';
      continue;
    }

    // even: must be x^EXPR
    const degree = Number(match.slice(2));
    if (!isNaN(degree)) degrees.push(degree);
    valid = match[0] === 'x' && match[1] === '^' && !isNaN(degree);
  }

  if (!valid) {
    throw new CRCExpressionParseError(
      'Invalid expression (e.g. x^4 + x^2 + x^0)'
    );
  }

  if (degrees.some((degree) => degree > 30)) {
    throw new CRCExpressionTooBigError('Expression too big');
  }

  return buildBitsFromDegrees(degrees);
};

export default parse;
