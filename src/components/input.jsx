import React from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';

const Input = ({ setValue, value, ...props }) => (
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
