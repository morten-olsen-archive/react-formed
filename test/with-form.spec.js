import React from 'react';
import {
  Input,
  Form,
} from '../src';
import { expect } from 'chai';
import { mount } from 'enzyme';


describe('with state', () => {
  let state;
  const wrapElement = (elm, initValues) => mount(
    <Form onFormChange={output => state = output} initValues={initValues}>
      {elm}
    </Form>
  );

  beforeEach(() => {
    state = null;
  });

  it('should render without value', () => {
    const wrapper = wrapElement(<Input name="test" />);
    expect(wrapper.html()).to.be.equal('<input value="">');
    expect(state).to.be.eql({})
  });

  it('should render the value', () => {
    const wrapper = wrapElement(<Input name="test" />, { test: 'hello' });
    expect(wrapper.html()).to.be.equal('<input value="hello">');
    expect(state).to.be.eql({
      test: 'hello',
    });
  });

  it('should change value on change', () => {
    const wrapper = wrapElement(<Input name="test" />, { test: 'hello' });
    const evt = {target: {name: "pollName", value: "world"}};
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    expect(state).to.be.eql({
      test: 'world',
    });
  });
});
