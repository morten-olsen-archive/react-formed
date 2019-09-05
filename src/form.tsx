import React, { ReactNode, FunctionComponent } from 'react';
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
  values: any,
  dirty: boolean,
  initValues: any;
}

interface OuterProps {
  name: string;
  children?: ReactNode;
  initValues: any;
};

const getReduxValues = (forms: any, name: string) => {
  const form = forms[name];
  if (!form) {
    return {};
  }
  return form.values || {};
}

const getReduxDirty = (forms: any, name: string) => {
  const form = forms[name];
  if (!form) {
    return false;
  }
  return form.dirty;
}

class Form extends React.Component<OuterProps & any, State> {
  constructor(props: any) {
    super(props);
    const type = props.redux ? StoreType.redux : StoreType.state;
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.state = {
      type,
      values: this.props.initValues || {},
      initValues: this.props.initValues,
      dirty: false,
    };
  }

  componentWillMount() {
    this.update();
  }

  get isDirty() {
    const dirty = this.state.type === StoreType.redux
      ? getReduxDirty(this.props.forms, this.props.name)
      : this.state.dirty;
    return dirty;
  }

  update() {
    if (this.state.type === StoreType.redux && (!this.isDirty || this.props.resetOnMount)) {
      this.props.dispatch(actions.setForm(this.props.name, this.props.initValues, false));
    }
    if (this.props.onFormChange) {
      this.props.onFormChange(this.getForm());
    }
  }

  getForm() {
    const form = this.state.type === StoreType.redux
      ? getReduxValues(this.props.forms, this.props.name)
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
    if (this.state.initValues !== this.props.initValues) {
      this.setState({
        initValues: this.props.initValues
      }, () => {
        this.update();
      });
    }
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

const Outer: FunctionComponent<OuterProps> = ({ name, ...props }) => (
  <Consumer>
    {({ forms, redux, dispatch } = {}) => (
      <Form {...props} redux={redux} forms={forms} name={name} dispatch={dispatch} />
    )}
  </Consumer>
)

export default Outer;
