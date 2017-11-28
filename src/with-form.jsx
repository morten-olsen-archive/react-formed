import React from 'react';
import PropTypes from 'prop-types';

const withForm = (WrappedComponent) => {
  const WithForm = (props, context) => {
    const { name, ...remainingProps } = props;
    const { form } = context;
    const { values = {}, setValue } = form;
    return (
      <WrappedComponent
        {...remainingProps}
        setValue={value => setValue(name, value)}
        value={values[name]}
      />
    );
  };

  WithForm.propTypes = {
    name: PropTypes.string.isRequired,
  };

  WithForm.contextTypes = {
    form: PropTypes.shape({
      values: PropTypes.object,
      setValue: PropTypes.func,
    }),
  };

  return WithForm;
};

export default withForm;
