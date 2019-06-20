import { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  constructor() {
    super();
    this.setValue = this.setValue.bind(this);
  }

  getChildContext() {
    return {
      form: {
        values: this.props.ownValue,
        setValue: this.setValue,
      },
    };
  }

  setValue(name, value) {
    const values = this.props.value;
    this.props.ownSetValue({
      ...values,
      [name]: value,
    });
  }

  render() {
    return this.props.children;
  }
}

List.childContextTypes = {
  form: PropTypes.object, // eslint-disable-line
};

List.propTypes = {
  ownSetValue: PropTypes.func.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  ownValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

List.defaultProps = {
  value: undefined,
  ownValue: undefined,
};

export default List;
