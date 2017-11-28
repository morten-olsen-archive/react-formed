import React from 'react';
import PropTypes from 'prop-types';

class ReduxForm extends React.Component {
  getChildContext() {
    return {
      reduxForm: {
        getState: this.props.getState,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

ReduxForm.propTypes = {
  children: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired,
};

ReduxForm.childContextTypes = {
  reduxForm: PropTypes.shape({
    getState: PropTypes.func,
  }),
};

export default ReduxForm;
