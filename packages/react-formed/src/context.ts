import { createContext } from 'react';

const context = createContext<{
  values: any;
  setValue: (path: (string | number)[], value: any) => void;
}>({
  values: {},
  setValue: () => {},
});

export default context;