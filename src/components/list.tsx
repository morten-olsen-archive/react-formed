import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';
import ListItem from './list-item';

interface Props {
  value: any;
  setValue: (value: any) => void;
  render: (props: any) => any;
  children: (props: any) => any;
}

const getValue = (value: any) => (typeof value === 'object' ? value : { _self: value });

class List extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.add = this.add.bind(this);
  }

  propTypes = {
    children: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.any),
  };

  defaultProps = {
    value: [],
  };

  setValue(index: number, value: any) {
    const values = [...this.props.value];
    values[index] = value._self ? value._self : value; // eslint-disable-line no-underscore-dangle
    this.props.setValue(values);
  }

  add(value: any) {
    const values = [...(this.props.value || [])];
    values.push(value);
    this.props.setValue(values);
  }

  remove(index: number) {
    const values = this.props.value.filter((a: any, i: number) => i !== index);
    this.props.setValue(values);
  }

  renderChildren = (value: any, i: number) => {
    const ownValue = getValue(value);
    return (
      <ListItem key={`key${+i}`}
        ownSetValue={newValue => this.setValue(i, newValue)}
        ownValue={ownValue}
      >
        {this.props.render({
          value: ownValue,
          remove: this.remove.bind(this, i),
        })}
      </ListItem>
    );
  }

  render() {
    const values = this.props.value;
    const children = values.map(this.renderChildren);
    const output = this.props.children({
      children,
      add: this.add,
    });
    return output;
  }
}

export default withForm(List);
