import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';

class List extends Component {
  constructor() {
    super();
    this.setValue = this.setValue.bind(this);
  }

  setValue(name, value) {
    const values = this.props.value;
    this.props.ownSetValue({
      ...values,
      [name]: value,
    });
  }

  getChildContext() {
    return {
      form: {
        values: this.props.ownValue,
        setValue: this.setValue,
      }
    };
  }

  render() {
    return this.props.children;
  }
}

List.childContextTypes= {
  form: PropTypes.object,
}

export default withForm(List);
