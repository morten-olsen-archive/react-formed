import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { createStore } from 'redux';

import {
  Input,
  ReduxForm,
  Form,
  formReducer,
  createSelector,
  actions,
} from '../src';

const wrapElement = (elm, store, initValues, resetOnMount = false) => mount((
  <Provider store={store}>
    <ReduxForm getState={state => state}>
      <Form name="foo" initValues={initValues} resetOnMount={resetOnMount}>
        {elm}
      </Form>
    </ReduxForm>
  </Provider>
));

describe('with redux', () => {
  let store;
  let selector;

  beforeEach(() => {
    store = createStore(formReducer);
    selector = createSelector(state => state);
  });

  it('should render without value', () => {
    const wrapper = wrapElement(<Input name="test" />, store);
    expect(wrapper.html()).to.be.equal('<input value="">');
    expect(store.getState()).to.be.eql({
      foo: {
      },
    });
  });

  it('should render the value', () => {
    const wrapper = wrapElement(<Input name="test" />, store, { test: 'hello' });
    expect(wrapper.html()).to.be.equal('<input value="hello">');
    expect(store.getState()).to.be.eql({
      foo: {
        test: 'hello',
      },
    });
  });

  it('should change value on change', () => {
    const wrapper = wrapElement(<Input name="test" />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(store.getState()).to.be.eql({
      foo: {
        test: 'world',
      },
    });
    expect(wrapper.html()).to.be.equal('<input value="world">');
  });

  it('should reset value on clear', () => {
    const wrapper = wrapElement(<Input name="test" />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    store.dispatch(actions.clear('foo'));
    expect(store.getState()).to.be.eql({
      foo: {
      },
    });
    expect(wrapper.html()).to.be.equal('<input value="">');
  });

  it('should be able to select', () => {
    const wrapper = wrapElement(<Input name="test" />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      test: 'world',
    });
    expect(wrapper.html()).to.be.equal('<input value="world">');
  });

  it('should be able to set form', () => {
    store.dispatch(actions.setForm('foo', {
      testA: 'valueA',
      testB: [
        'valueB',
        'valueC',
      ],
    }));
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      testA: 'valueA',
      testB: [
        'valueB',
        'valueC',
      ],
    });
  });

  it('should be able to set form to empty', () => {
    store.dispatch(actions.setForm('foo'));
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({});
  });

  it('should reuse old form values', () => {
    const wrapper = wrapElement(<Input name="test" />, store);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      test: 'world',
    });
    const wrapper2 = wrapElement(<Input name="test" />, store);
    expect(wrapper2.html()).to.be.equal('<input value="world">');
  });

  it('should reuse form state', () => {
    const wrapper = wrapElement(<Input name="test" />, store, {});
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      test: 'world',
    });
    const wrapper2 = wrapElement(<Input name="test" />, store, {});
    expect(wrapper2.html()).to.be.equal('<input value="world">');
  });

  it('should reset old form values with init state on resetOnMount', () => {
    const wrapper = wrapElement(<Input name="test" />, store, undefined, true);
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      test: 'world',
    });
    const wrapper2 = wrapElement(<Input name="test" />, store, undefined, true);
    expect(wrapper2.html()).to.be.equal('<input value="">');
  });

  it('should reset old form values with init state on resetOnMount', () => {
    const wrapper = wrapElement(<Input name="test" />, store, { test: 'world' }, true);
    const form = selector.getForm(store.getState(), 'foo');
    expect(form).to.be.eql({
      test: 'world',
    });
    const wrapper2 = wrapElement(<Input name="test" />, store, { test: 'world' }, true);
    expect(wrapper2.html()).to.be.equal('<input value="world">');
  });
});
