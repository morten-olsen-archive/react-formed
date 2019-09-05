import React, { ReactNode, createContext, useState } from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { createStore } from 'redux';

import {
  Input,
  Form,
  formReducer,
  ReduxForm,
} from '../src';

const wrapElement = (elm: ReactNode, store: ReturnType<typeof createStore>, initValues?: any, initValues2?: any) => {
  const Update = ({ action }) => (
    <button onClick={action}>Button</button>
  );

  const Comp = () => {
    const [value, setValue] = useState(initValues);
    console.log('val', value);
    return (
      <Provider store={store}>
        <ReduxForm getState={state => state}>
          <Form name="foo" initValues={value}>
            {elm}
            <Update action={() => setValue(initValues2)} />
          </Form>
        </ReduxForm>
      </Provider>
    );
  }
  const component = mount((
    <Comp />
  ));
  const update = () => {
    component.find(Update).simulate('click');
  }
  return [component, update];
};

describe('with redux', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore(formReducer);
  });

  it('should be emptry without init values', () => {
    const [wrapper] = wrapElement(<Input name="test" />, store);
    expect(wrapper.html()).to.be.equal('<input value=""><button>Button</button>');
    expect(store.getState()).to.be.eql({
      foo: {
        values: {},
        dirty: false,
      },
    });
  });

  it('should set init values', () => {
    const [wrapper] = wrapElement(<Input name="test" />, store, { test: 'hello' });
    expect(wrapper.html()).to.be.equal('<input value="hello"><button>Button</button>');
    expect(store.getState()).to.be.eql({
      foo: {
        values: {
          test: 'hello',
        },
        dirty: false,
      },
    });
  });

  it('should update init values if not dirty', () => {
    const [wrapper, update] = wrapElement(<Input name="test" />, store, { test: 'hello' }, { test: 'foo' });
    update();
    expect(wrapper.html()).to.be.equal('<input value="foo"><button>Button</button>');
    expect(store.getState()).to.be.eql({
      foo: {
        values: {
          test: 'foo',
        },
        dirty: false,
      },
    });
  });

  it('should not update init values if dirty', () => {
    const [wrapper, update] = wrapElement(<Input name="test" />, store, { test: 'hello' }, { test: 'foo' });
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    update();
    expect(wrapper.html()).to.be.equal('<input value="world"><button>Button</button>');
    expect(store.getState()).to.be.eql({
      foo: {
        values: {
          test: 'world',
        },
        dirty: true,
      },
    });
  });
});
