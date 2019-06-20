
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  Input,
  ReduxForm,
  Form,
  formReducer,
  createSelector,
  actions,
} from '../src';

describe('compound names', () => {
  const wrapElement = (elm, store, initValues) => mount((
    <Provider store={store}>
      <ReduxForm getState={state => state}>
        <Form name="foo" initValues={initValues}>
          {elm}
        </Form>
      </ReduxForm>
    </Provider>
  ));

  let store;
  let selector;

  beforeEach(() => {
    store = createStore(formReducer);
    selector = createSelector(state => state);
  });

  it('should be able to set a value', () => {
    const wrapper = wrapElement(<Input name={['testA']} />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      testA: 'world',
    });
  });

  it('should be able to set object value', () => {
    const wrapper = wrapElement(<Input name={['testA', 'testB']} />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      testA: {
        testB: 'world',
      },
    });
  });

  it('should be able to set array value', () => {
    const wrapper = wrapElement(<Input name={['testA', 2, 'testB']} />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      testA: [
        undefined,
        undefined,
        { testB: 'world' },
      ],
    });
  });

  it('should be able to set values by calling actions', () => {
    store.dispatch(actions.setValue('foo', ['fieldC', 1, 'title'], 'valueD'));
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      fieldC: [
        undefined,
        {
          title: 'valueD',
        },
      ],
    });
  });
});
