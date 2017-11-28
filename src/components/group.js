import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';

class Group extends Component {
  constructor() {
    super();
    this.setValue = this.setValue.bind(this);
  }

  setValue(name, value) {
    const values = this.props.value;
    this.props.setValue({
      ...values,
      [name]: value,
    });
  }

  getChildContext() {
    return {
      form: {
        values: this.props.value,
        setValue: this.setValue,
      }
    };
  }

  render() {
    return this.props.children;
  }
}

Group.childContextTypes= {
  form: PropTypes.object,
}

Group.contextTypes = {
  form: PropTypes.object,
};

export default withForm(Group);
