import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';
import ListItem from './list-item';

class List extends Component {
  constructor() {
    super();
    this.setValue = this.setValue.bind(this);
    this.add = this.add.bind(this);
  }

  add(value) {
    const values = [...(this.props.value || [])];
    values.push(value);
    this.props.setValue(values);
  }

  setValue(index, value) {
    const values = [...(this.props.value || [])];
    values[index] = value;
    this.props.setValue(values);
  }

  remove(index) {
    const values = this.props.value.filter((a, i) => i !== index);
    this.props.setValue(values);
  }

  render() {

    const values = this.props.value || [];
    const children = values.map((value, i) => (
      <ListItem key={i} ownSetValue={(value) => this.setValue(i, value)} ownValue={value}>
        {this.props.render({
          value,
          remove: this.remove.bind(this, i)
        })}
      </ListItem>
    ));
    const output = this.props.children({
      children,
      add: this.add,
    });
    return output;
  }
}

List.contextTypes = {
  form: PropTypes.object,
};

export default withForm(List);
