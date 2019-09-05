import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';
import { Provider } from '../contexts/form';

interface Props {
  value: any;
  setValue: (value: any) => void;
}

class Group extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  setValue(name: string, value: any) {
    const values = this.props.value;
    this.props.setValue({
      ...values,
      [name]: value,
    });
  }

  getValue(name: string, value: any) {
    const values = this.props.value || {};
    return values[name];
  }

  render() {
    const api = {
      getValue: this.getValue,
      setValue: this.setValue,
    };
    return (
      <Provider value={api}>
        {this.props.children}
      </Provider>
    );
  }
}

export default withForm(Group);
