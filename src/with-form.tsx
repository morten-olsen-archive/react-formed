import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './contexts/form';

const withForm = (WrappedComponent) => {
  const WithForm = (props) => {
    const { name, ...remainingProps } = props;

    return (
      <Consumer>
        {({ getValue, setValue }) => (
          <WrappedComponent
            {...remainingProps}
            setValue={value => setValue(name, value)}
            value={getValue(name)}
          />
        )}
      </Consumer>
    );
  };

  return WithForm;
};

export default withForm;
