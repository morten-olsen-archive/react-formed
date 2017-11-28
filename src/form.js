import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: props.initValues || {} };
    this.setValue = this.setValue.bind(this);
  }

  componentWillMount() {
    if (this.context.reduxForm) {
      this.context.store.subscribe(this.subscribe.bind(this));
      this.context.store.dispatch({
        type: '@@FORMS/SET_VALUES',
        payload: {
          form: this.props.name,
          values: this.props.initValues || {},
        },
      });
    }
    if (this.props.onFormChange) {
      this.props.onFormChange(this.getValues());
    }
  }

  setValue(name, value) {
    if (this.context.reduxForm) {
      this._setReduxValue(name, value);
    } else {
      this._setStateValue(name, value);
    }
  }

  _setReduxValue(name, value) {
    this.context.store.dispatch({
      type: '@@FORMS/SET_VALUE',
      payload: {
        form: this.props.name,
        name,
        value,
      },
    });
    if (this.props.onFormChange) {
      this.props.onFormChange(this.getValues());
    }
  }

  _setStateValue(name, value) {
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    }, () => {
      if (this.props.onFormChange) {
        this.props.onFormChange(this.getValues());
      }
    });
  }

  subscribe() {
    const state = this.context.reduxForm.getState(this.context.store.getState());
    this.setState({
      values: state[this.props.name],
    });
  }

  getValues() {
    return this.state.values;
  }

  getChildContext() {
    return {
      form: {
        values: this.getValues(),
        setValue: this.setValue,
      }
    };
  }

  render() {
    return this.props.children;
  }
}

Form.childContextTypes= {
  form: PropTypes.object,
}

Form.contextTypes = {
  store: PropTypes.object,
  reduxForm: PropTypes.object,
};

export default Form;
