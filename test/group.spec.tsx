import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {
  Input,
  Group,
  Form,
} from '../src';

describe('with group', () => {
  let state: any;
  const wrapElement = (elm: any, initValues = {}) => mount((
    <Form onFormChange={(output: any) => { state = output; }} initValues={initValues}>
      {elm}
    </Form>
  ));

  beforeEach(() => {
    state = null;
  });

  it('should render without value', () => {
    const wrapper = wrapElement((
      <Group name="wrapper">
        <Input name="test" />
      </Group>
    ));
    expect(wrapper.html()).to.be.equal('<input value="">');
    expect(state).to.be.eql({});
  });

  it('should render the value', () => {
    const wrapper = wrapElement(
      <Group name="wrapper">
        <Input name="test" />
      </Group>,
      { wrapper: { test: 'hello' } },
    );
    expect(wrapper.html()).to.be.equal('<input value="hello">');
    expect(state).to.be.eql({
      wrapper: {
        test: 'hello',
      },
    });
  });

  it('should change value on change', () => {
    const wrapper = wrapElement((
      <Group name="wrapper">
        <Input name="test" />
      </Group>
    ));
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    expect(state).to.be.eql({
      wrapper: {
        test: 'world',
      },
    });
  });
});
