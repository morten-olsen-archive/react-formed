import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Provider } from './contexts/form';
import { Consumer } from './contexts/redux';
import * as actions from './actions';
import { updateState } from './helpers';

enum StoreType {
  state = 'STATE',
  redux = 'REDUX',
}

interface State {
  type: StoreType,
  values: any
}

interface OuterProps {
  name: string;
};

class Form extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    const type = props.redux ? StoreType.redux : StoreType.state;
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.state = {
      type,
      values: this.props.initValues || {},
    };
    if (this.props.onFormChange) {
      this.props.onFormChange(this.getForm());
    }
  }

  componentWillMount() {
    const hasValues = Object.keys(this.getForm()).length > 0;
    if (this.state.type === StoreType.redux && (!hasValues || this.props.resetOnMount)) {
      this.props.dispatch(actions.setForm(this.props.name, this.props.initValues));
    }
  }

  getForm() {
    const form = this.state.type === StoreType.redux
      ? this.props.forms[this.props.name]
      : this.state.values;
    return form || {};
  }

  getValue(name: string | string[]) {
    const form = this.getForm();
    const names = Array.isArray(name) ? name : [name];
    const value = names.reduce((output, key) => output === undefined ? undefined : output[key], form);
    return value;
  }

  setValue(name: string, value: string) {
    if (this.state.type === StoreType.state) {
      const values = 
      this.setState({
        values: updateState(name, value, this.state.values),
      }, () => {
        if (this.props.onFormChange) {
          this.props.onFormChange(this.getForm());
        }
      });
    } else {
      this.props.dispatch(actions.setValue(
        this.props.name,
        name,
        value,
      ))
    }
  }

  render() {
    const api = {
      getValue: this.getValue,
      setValue: this.setValue,
      formValues: this.state.values,
    };
    return (
      <Provider value={api}>
        {this.props.children}
      </Provider>
    );
  }
}

const Outer = ({ name, ...props }: OuterProps) => (
  <Consumer>
    {({ forms, redux, dispatch } = {}) => (
      <Form {...props} redux={redux} forms={forms} name={name} dispatch={dispatch} />
    )}
  </Consumer>
)

export default Outer;
