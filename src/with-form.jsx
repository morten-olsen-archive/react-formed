import React from 'react';
import PropTypes from 'prop-types';

const getFinalValue = (name, values) => {
  const names = Array.isArray(name) ? [...name] : [name];
  let targetValues = values;
  const target = names.pop();
  for (let i = 0; i < names.length; i += 1) {
    if (targetValues[names[i]]) {
      targetValues = targetValues[names[i]];
    }
  }
  return targetValues[target];
};

const contextTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    setValue: PropTypes.func,
  }),
};

const propTypes = {
  name: PropTypes.string.isRequired,
};

const withForm = (WrappedComponent) => {
  const WithForm = (props, context) => {
    const { name, ...remainingProps } = props;
    const { form } = context;
    const { values = {}, setValue } = form;
    const finalValue = getFinalValue(name, values);

    return (
      <WrappedComponent
        {...remainingProps}
        setValue={value => setValue(name, value)}
        value={finalValue}
      />
    );
  };

  WithForm.propTypes = propTypes;
  WithForm.contextTypes = contextTypes;

  return WithForm;
};

export default withForm;
