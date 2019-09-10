import React, { useContext } from 'react';
import { ReactComponentLike } from 'prop-types';
import context from './context';
import { normalizeName, getValue } from './helpers';

export interface Props {
  name: string | (string | number)[];
  [name: string]: any;
}

const withForm = (WrappedComponent: ReactComponentLike) => ({
  name,
  ...others
}: Props) => {
  const { values, setValue } = useContext(context);
  const normalizedName = normalizeName(name);
  const value = getValue(normalizedName, values);
  const setElementValue = (value: any) => {
    setValue(normalizedName, value);
  }
  return (
    <WrappedComponent
      {...others}
      value={value}
      setValue={setElementValue}
    />
  )
}

export default withForm;