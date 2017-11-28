import { Component } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with-form';

class Group extends Component {
  constructor() {
    super();
    this.setValue = this.setValue.bind(this);
  }

  getChildContext() {
    return {
      form: {
        values: this.props.value,
        setValue: this.setValue,
      },
    };
  }

  setValue(name, value) {
    const values = this.props.value;
    this.props.setValue({
      ...values,
      [name]: value,
    });
  }

  render() {
    return this.props.children;
  }
}

Group.propTypes = {
  value: PropTypes.object, // eslint-disable-line
  children: PropTypes.node,
  setValue: PropTypes.func.isRequired,
};

Group.defaultProps = {
  children: null,
};

Group.childContextTypes = {
  form: PropTypes.object,
};

Group.contextTypes = {
  form: PropTypes.object,
};

export default withForm(Group);
