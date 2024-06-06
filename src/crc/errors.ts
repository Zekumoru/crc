class CRCError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CRCExpressionParseError extends CRCError {}
export class CRCExpressionTooBigError extends CRCError {}

export default CRCError;
