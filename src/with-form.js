import React from 'react';
import PropTypes from 'prop-types';

const withForm = (WrappedComponent) => {
  const WithForm = (props, context) => {
    const { name, ...remainingProps } = props;
    const form = context.form || props.form;
    const { values = {}, setValue } = form;
    return (
      <WrappedComponent
        {...remainingProps}
        setValue={(value) => setValue(name, value)}
        value={values[name]}
      />
    );
  }

  WithForm.contextTypes = {
    form: PropTypes.shape({
      values: PropTypes.object,
      setValue: PropTypes.func,
    }),
  };

  return WithForm;
}

export default withForm;
