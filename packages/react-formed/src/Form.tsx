import React, { FunctionComponent, useContext, useEffect } from 'react';
import context from './context';
import { ReactNodeLike } from 'prop-types';
import { normalizeName } from './helpers';

export interface Props {
  name: string;
  initValues?: any;
  resetOnMount?: boolean;
  children: ReactNodeLike;
}

const Form: FunctionComponent<Props> = ({
  name,
  initValues,
  resetOnMount,
  children
}) => {
  const {
    values,
    setValue,
  } = useContext(context);
  useEffect(() => {
    if (resetOnMount /* || !dirty */) {
      setValue([name], initValues);
    }
  }, [initValues]);

  const formValues = values[name] || {};
  const formSetValue = (names: any, value: any) => {
    const normalizedNames = normalizeName(names);
    setValue([
      name,
      ...normalizedNames,
    ], value);
  };

  return (
    <context.Provider
      value={{
        setValue: formSetValue,
        values: {...formValues},
      }}
    >
      {children}
    </context.Provider>
  );
}

export default Form;