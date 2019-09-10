import React from 'react';
import { Provider, Form } from 'react-formed';
import { mount } from 'enzyme';
import { itWithEngines, TestEngine } from './utils/engine';
import { FormTextInput, TextInput } from './utils/input';

describe.only('Form', () => {
  /*itWithEngines('should be able to add provider', (engine) => () => {
    const root = mount(
      <Provider engine={engine}>
        <Form name="test">
          <FormTextInput name="hello" />
        </Form>
      </Provider>
    );
    expect(root.html()).toBe('<input value="world">');
    const input = root.find(TextInput);
    expect(input.length).toBe(1);
    expect(input.props().value).toBe('world');
    
  }, [
    new TestEngine({
      test: {
        hello: 'world',
      },
    }),
  ]);*/

  itWithEngines('should be able to change values', (engine) => () => {
    const root = mount(
      <Provider engine={engine}>
        <Form name="test">
          <FormTextInput name="hello" />
        </Form>
      </Provider>
    );
    const input = root.find(TextInput);
    const evt = { target: { name: 'pollName', value: 'earth' } };
    input.simulate('change', evt);
    expect(root.find(TextInput).props().value).toBe('earth');
    expect(engine.getValue()).toEqual({
      test: {
        hello: 'earth',
      },
    });
  }, [
    new TestEngine({
      test: {
        hello: 'world',
      },
    }),
  ]);
});