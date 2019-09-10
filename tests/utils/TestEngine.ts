import { Engine } from 'react-formed-types';

class TestEngine implements Engine {
  subscriptions: ((values: any) => void)[] = [];
  value: any;

  constructor(value?: any) {
    this.value = value || {};
  }

  subscribe = (fn: () => void) => {
    this.subscriptions.push(fn);
  }

  unsubscribe = (fn: () => void) => {
    this.subscriptions = this.subscriptions.filter(f => f !== fn);
  }

  setValue = (value: any) => {
    this.value = value;
    this.subscriptions.forEach(f => f(this.value));
  }

  getValue = () => {
    return this.value;
  }
}

export default TestEngine;
