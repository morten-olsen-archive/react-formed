import { Engine } from 'react-formed-types';
import TestEngine from './TestEngine';

const itWithEngines = (name: string, fn: (engine: Engine) => any, engines?: Engine[]) => {
  if (!engines) {
    engines = [
      new TestEngine(),
    ];
  }
  engines.forEach((engine, i) => {
    it(`${name} [${i + 1}/${(engines as any).length}]`, fn(engine))
  });
}

export {
  itWithEngines,
  TestEngine,
};
