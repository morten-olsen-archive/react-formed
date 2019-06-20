/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { updateState } from './helpers';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: props.initValues || {} };
    this.setValue = this.setValue.bind(this);
  }

  getChildContext() {
    return {
      form: {
        values: this.getValues(),
        setValue: this.setValue,
      },
    };
  }

  componentWillMount() {
    if (this.context.reduxForm) {
      this.context.store.subscribe(this.subscribe.bind(this));
      if (this.props.initValues) {
        this.context.store.dispatch({
          type: '@@FORMS/SET_VALUES',
          payload: {
            form: this.props.name,
            values: this.props.initValues,
          },
        });
      } else {
        this.subscribe();
      }
    }
    if (this.props.onFormChange) {
      this.props.onFormChange(this.getValues());
    }
  }

  getValues() {
    return this.state.values;
  }

  setValue(name, value) {
    if (this.context.reduxForm) {
      this.setReduxValue(name, value);
    } else {
      this.setStateValue(name, value);
    }
  }

  setReduxValue(name, value) {
    this.context.store.dispatch({
      type: '@@FORMS/SET_VALUE',
      payload: {
        form: this.props.name,
        name,
        value,
      },
    });
  }

  setStateValue(name, value) {
    const stateClone = { ...this.state.values };
    this.setState(
      {
        values: updateState(name, value, stateClone),
      },
      () => {
        if (this.props.onFormChange) {
          this.props.onFormChange(this.getValues());
        }
      },
    );
  }

  subscribe() {
    const state = this.context.reduxForm.getState(
      this.context.store.getState(),
    );

    this.setState({
      values: state[this.props.name],
    });
  }

  render() {
    return this.props.children;
  }
}

Form.propTypes = {
  initValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  onFormChange: PropTypes.func,
  name: PropTypes.string,
};

Form.defaultProps = {
  initValues: undefined,
  children: null,
  onFormChange: undefined,
  name: undefined,
};

Form.childContextTypes = {
  form: PropTypes.object, // eslint-disable-line
};

Form.contextTypes = {
  store: PropTypes.object, // eslint-disable-line
  reduxForm: PropTypes.object, // eslint-disable-line
};

export default Form;
