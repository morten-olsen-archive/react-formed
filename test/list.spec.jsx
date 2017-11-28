import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {
  Input,
  List,
  Form,
} from '../src';


describe('with list', () => {
  let state;
  const wrapElement = (elm, initValues) => mount((
    <Form onFormChange={(output) => { state = output; }} initValues={initValues}>
      {elm}
    </Form>
  ));

  beforeEach(() => {
    state = null;
  });

  it('should render the value', () => {
    const wrapper = wrapElement(
      <List
        name="wrapper"
        render={() => <Input name="test" />}
      >
        {({ children }) => (
          <div>{children}</div>
        )}
      </List>,
      {
        wrapper: [
          { test: '1' },
          { test: '2' },
        ],
      },
    );
    expect(wrapper.html()).to.be.equal('<div><input value="1"><input value="2"></div>');
    expect(state).to.be.eql({
      wrapper: [
        { test: '1' },
        { test: '2' },
      ],
    });
  });

  it('should render the value', () => {
    const wrapper = wrapElement(
      <List
        name="wrapper"
        render={() => <Input name="test" />}
      >
        {({ children }) => (
          <div>{children}</div>
        )}
      </List>,
      {
        wrapper: [
          { test: '1' },
          { test: '2' },
        ],
      },
    );
    const inputs = wrapper.find(Input);
    expect(inputs).to.have.length(2);
    const evt1 = { target: { name: 'pollName', value: 'world' } };
    inputs.first().simulate('change', evt1);
    const evt2 = { target: { name: 'pollName', value: 'hello' } };
    inputs.last().simulate('change', evt2);
    expect(wrapper.html()).to.be.equal('<div><input value="world"><input value="hello"></div>');
    expect(state).to.be.eql({
      wrapper: [
        { test: 'world' },
        { test: 'hello' },
      ],
    });
  });
});
