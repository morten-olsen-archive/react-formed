import React from 'react';
import withForm from '../with-form';

const Input = ({ setValue, value, ...props }) => (
  <input
    {...props}
    value={value || ''}
    onChange={({ target }) => setValue(target.value)}
  />
);

export default withForm(Input);
