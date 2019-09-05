import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {
  Input,
  List,
  Form,
} from '../src';


describe('with list', () => {
  let state: any;
  const wrapElement = (elm: any, initValues = {}) => mount((
    <Form onFormChange={(output: any) => { state = output; }} initValues={initValues}>
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

  it('should be able to render simple values', () => {
    const wrapper = wrapElement(
      <List
        name="wrapper"
        render={() => <Input name="_self" />}
      >
        {({ children }) => (
          <div>{children}</div>
        )}
      </List>,
      {
        wrapper: [
          'a',
          'b',
        ],
      },
    );
    const inputs = wrapper.find(Input);
    expect(inputs).to.have.length(2);
    const evt1 = { target: { name: 'pollName', value: 'c' } };
    inputs.first().simulate('change', evt1);
    const evt2 = { target: { name: 'pollName', value: 'd' } };
    inputs.last().simulate('change', evt2);
    expect(wrapper.html()).to.be.equal('<div><input value="c"><input value="d"></div>');
    expect(state).to.be.eql({
      wrapper: [
        'c',
        'd',
      ],
    });
  });
});
