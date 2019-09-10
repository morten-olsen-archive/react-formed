import React from 'react';
import { Provider, context } from 'react-formed';
import { mount } from 'enzyme';
import { itWithEngines, TestEngine } from './utils/engine';

xdescribe('Form', () => {
  itWithEngines('should be able to add provider', (engine) => () => {
    const root = mount(
      <Provider engine={engine}>
        <div>Test</div>
      </Provider>
    );
    expect(root.html()).toBe('<div>Test</div>');
    const provider = root.find(context.Provider);
    expect(provider.length).toBe(1);
    
  }, [
    new TestEngine({
      hello: 'world',
    }),
  ]);
});