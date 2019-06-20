import React from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';

interface Props {
  setValue: (value: any) => void;
  getValue: () => void;
  value: any;
}

const Input = ({ setValue, getValue, value, ...props }: Props) => (
  <input
    {...props}
    value={value || ''}
    onChange={({ target }) => setValue(target.value)}
  />
);

Input.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  value: '',
};

export default withForm(Input);
