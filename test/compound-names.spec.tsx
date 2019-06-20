import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {
  Input,
  Form,
} from '../src';

describe('compound names', () => {
  let state;
  const wrapElement = (elm, initValues) => mount((
    <Form onFormChange={(output) => { state = output; }} initValues={initValues}>
      {elm}
    </Form>
  ));

  beforeEach(() => {
    state = null;
  });

  it('should be able to set a value', () => {
    const wrapper = wrapElement((
      <Input name={['testA']} />
    ));
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    expect(state).to.be.eql({
      testA: 'world',
    });
  });

  it('should be able to set object value', () => {
    const wrapper = wrapElement((
      <Input name={['testA', 'testB']} />
    ));
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    expect(state).to.be.eql({
      testA: {
        testB: 'world',
      },
    });
  });

  it('should be able to set array value', () => {
    const wrapper = wrapElement((
      <Input name={['testA', 2, 'testB']} />
    ));
    const evt = { target: { name: 'pollName', value: 'world' } };
    wrapper.find(Input).simulate('change', evt);
    expect(wrapper.html()).to.be.equal('<input value="world">');
    expect(state).to.be.eql({
      testA: [
        undefined,
        undefined,
        { testB: 'world' },
      ],
    });
  });
});
