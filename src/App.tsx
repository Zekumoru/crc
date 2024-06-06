import { useEffect, useLayoutEffect, useState } from 'react';
import parse from './crc/parse';
import crcGenerate from './crc/generate';
import crcCheck from './crc/check';

function App() {
  const [dataExpr, setDataExpr] = useState('');
  const [dataErrorMsg, setDataErrorMsg] = useState('');
  const [data, setData] = useState(0);
  const [generatorExpr, setGeneratorExpr] = useState('');
  const [generatorErrorMsg, setGeneratorErrorMsg] = useState('');
  const [generator, setGenerator] = useState(0);
  const [generatedErrorMsg, setGeneratedErrorMsg] = useState('');
  const [generated, setGenerated] = useState(0);
  const [checkExpr, setCheckExpr] = useState('');
  const [checkErrorMsg, setCheckErrorMsg] = useState('');
  const [check, setCheck] = useState(0);
  const [valid, setValid] = useState(true);

  const parseData = (dataExpr: string) => {
    try {
      setDataExpr(dataExpr);
      setData(parse(dataExpr));
      setDataErrorMsg('');
    } catch (error) {
      setDataErrorMsg((error as { message: string }).message);
    }
  };

  const parseGenerator = (generatorExpr: string) => {
    try {
      setGeneratorExpr(generatorExpr);
      setGenerator(parse(generatorExpr));
      setGeneratorErrorMsg('');
    } catch (error) {
      setGeneratorErrorMsg((error as { message: string }).message);
    }
  };

  const parseCheck = (checkExpr: string) => {
    try {
      setCheckExpr(checkExpr);
      setCheck(parse(checkExpr));
      setCheckErrorMsg('');
    } catch (error) {
      setCheckErrorMsg((error as { message: string }).message);
    }
  };

  useLayoutEffect(() => {
    parseData('x^7 + x^5 + x^4 + x^2');
    parseGenerator('x^4 + x^2 + x^0');
    parseCheck('x^4 + x^2 + x^0');
  }, []);

  useEffect(() => {
    if (generator === 0) return;
    if (generator >= data)
      return setGeneratedErrorMsg('Data must be bigger than generator!');

    const generated = crcGenerate(data, generator);
    setGenerated(generated);
    setGeneratedErrorMsg('');
  }, [data, generator]);

  useEffect(() => {
    if (check === 0 && generated === 0) return setValid(true);
    if (check === 0) return setValid(false);
    if (check >= generated) return setValid(false);

    setValid(crcCheck(generated, check));
  }, [generated, check]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 min-h-screen">
        <h1 className="text-4xl mb-4">CRC Calculator</h1>

        <main className="flex flex-col gap-4">
          <div className="form-control">
            <label htmlFor="data">Data Expression</label>
            <input
              className="btn"
              id="data"
              type="text"
              value={dataExpr}
              onChange={(e) => parseData(e.target.value)}
            />
            <div>
              Binary:{' '}
              <span className="font-bold">
                {dataErrorMsg || data.toString(2)}
              </span>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="generator">Generator Expression</label>
            <input
              className="btn"
              id="generator"
              type="text"
              value={generatorExpr}
              onChange={(e) => parseGenerator(e.target.value)}
            />
            <div>
              Binary:{' '}
              <span className="font-bold">
                {generatorErrorMsg || generator.toString(2)}
              </span>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="generated">Generated Message</label>
            <input
              className="btn font-bold"
              id="generated"
              type="text"
              value={generated.toString(2)}
              disabled
            />
            <div className="font-bold">{generatedErrorMsg}</div>
          </div>

          <div className="form-control">
            <label htmlFor="check">Check Expression</label>
            <input
              className="btn"
              id="check"
              type="text"
              value={checkExpr}
              onChange={(e) => parseCheck(e.target.value)}
            />
            <div>
              Binary:{' '}
              <span className="font-bold">
                {checkErrorMsg || check.toString(2)}
              </span>
            </div>
          </div>

          <div className="text-lg">
            Is message valid?{' '}
            {valid ? (
              <span className="font-bold text-green-600">Yes!</span>
            ) : (
              <span className="font-bold text-red-600">No!</span>
            )}
          </div>
        </main>

        <footer className="mt-4 text-black">
          <div className="font-bold">Credits</div>
          <div>
            <a
              href="https://github.com/Zekumoru/crc"
              rel="noopener noreferrer"
              target="_blank"
            >
              © Zekumoru 2024
            </a>{' '}
            |{' '}
            <a
              href="https://www.flaticon.com/free-icons/message"
              title="message icons"
              rel="noopener noreferrer"
              target="_blank"
            >
              Favicon from Flaticon
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
