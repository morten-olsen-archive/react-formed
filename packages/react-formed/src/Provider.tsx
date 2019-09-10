import React, { FunctionComponent, useState, useEffect, ReactChildren } from 'react';
import { Engine } from 'react-formed-types';
import context from './context';
import { ReactNodeLike } from 'prop-types';
import { setValue } from './helpers';

const Provider: FunctionComponent<{
  engine: Engine,
  children: ReactNodeLike
}> = ({
  engine,
  children,
}) => {
  const [values, setValues] = useState<any>(engine.getValue());
  const subscription = () => {
    setValues({...engine.getValue()});
  };
  useEffect(() => {
    engine.subscribe(subscription);
    return () => engine.unsubscribe(subscription);
  }, [engine]);

  const setEngineValues = (path: (string | number)[], value: any) => {
    const newValue = setValue(path, value, values);
    engine.setValue(newValue);
  }
  return (
    <context.Provider
      value={{
        values,
        setValue: setEngineValues,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default Provider;