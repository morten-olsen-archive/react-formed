import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from '../contexts/form';

interface Props {
  ownSetValue: (values: any) => void;
  ownValue: {[name: string]: any}
  value: any;
}

class List extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  setValue(name: string, value: any) {
    const values = this.props.value;
    this.props.ownSetValue({
      ...values,
      [name]: value,
    });
  }

  getValue(name: string) {
    const names: string[] = Array.isArray(name) ? name : [name];
    const value = names.reduce(
      (output, key) => output === undefined ? undefined : output[key],
      this.props.ownValue,
    );
    return value;
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

export default List;
