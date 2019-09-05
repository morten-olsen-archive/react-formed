import { createContext } from 'react';

const {
  Provider,
  Consumer,
} = createContext<{} | undefined>(undefined);

export {
  Provider,
  Consumer,
};
