import degree from './degree';
import longDivBits from './longDivBits';

/**
 * Generates the remainder bits to append to data before sending.
 * @param data The data to generate remainder from.
 * @param generator The generator bits.
 * @returns The new data bits.
 */
const crcGenerate = (data: number, generator: number) => {
  const genDegree = degree(generator);
  const remainder = longDivBits(data << genDegree, generator)[1];

  return (data << genDegree) | remainder;
};

export default crcGenerate;
