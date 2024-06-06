import longDivBits from './longDivBits';

/**
 * Checks if the message is valid.
 * @param message The message to check.
 * @param generator The generator bits.
 * @returns True if message's remainder is 0, otherwise false.
 */
const crcCheck = (message: number, generator: number) => {
  const remainder = longDivBits(message, generator)[1];
  return remainder === 0;
};

export default crcCheck;
