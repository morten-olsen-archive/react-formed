# React Formed

[![Coverage Status](https://coveralls.io/repos/github/morten-olsen/react-formed/badge.svg?branch=master)](https://coveralls.io/github/morten-olsen/react-formed?branch=master) [![Build Status](https://travis-ci.org/morten-olsen/react-formed.svg?branch=master)](https://travis-ci.org/morten-olsen/react-formed) [![Maintainability](https://api.codeclimate.com/v1/badges/5ea237e554397d6a8d35/maintainability)](https://codeclimate.com/github/morten-olsen/react-formed/maintainability) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript) [![npm](https://img.shields.io/npm/v/react-formed.svg)](https://www.npmjs.com/package/react-formed) [![Known Vulnerabilities](https://snyk.io/test/github/morten-olsen/react-formed/badge.svg)](https://snyk.io/test/github/morten-olsen/react-formed) [![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)

This is a project which aims to create a really easy way to build complex forms, both using component state with events or using redux

## Install

```bash
npm install react-formed
```

## Creating a form

The root element of a for is the `Form` element. Inside this the form elements are placed. Currently only one element comes pre-packed, which is `Input`, but more is on the way. `Input` acts almost exacly as a `input` element would with the same API, with the one exception that a `name` attribute is required, and will be the key in the resulting object

```javascript
import { Form, Input } from 'react-formed';

export default () => (
  <Form onFormChange={values => console.log(values)}>
    <Input name="field1" />
    <Input name="field2" />
  </Form>
)
```

The above example will log an object to the console, each time a value is changed. The value will have the form of `{ field1: ..., field2: ... }`

### Createing groups

Values can also be grouped, which will cause them to create a namespace inside the form values, for instance

```javascript
import { Form, Input, Group } from 'react-formed';

export default () => (
  <Form onFormChange={values => console.log(values)}>
    <Group name="group1">
      <Input name="field1" />
      <Input name="field2" />
    </Group>
    <Input name="field3" />
  </Form>
)
```

would result in an object `{ group1: { field1: ..., field2: ... }, field3 }`

### Creating lists

## Using with Redux

When using with redux, a `ReduxForm` element should be added after redux's `Provider`, which should have a `getState` function, which tells where in the store the `formReducer` can be found. Also when using Redux form elements should have a name attribute, which should be unique for each form

```javascript
import { formReducer, Form, ReduxForm } from 'react-formed';
import { combineReducers, createStore, Provider } from 'redux';

const store = createStore(
  combineReducers({
    form: formReducer,
  }),
);

export default () => (
  <Provider store={store}>
    <ReduxForm getState={state => state.form}>
      <Form>
        ...
      </Form>
    </ReduxForm>
  </Provider>
)
```

## Creating custom elements

It is easy to create custom elements, using the `withForm` decorator, which supplies the function with a `value` object and a `setValue` function

This is for instance how `Input` works

```javascript
import { withForm } from 'react-formed';
const Input = ({ setValue, value, ...props }) => (
  <input
    {...props}
    value={value || ''}
    onChange={({ target }) => setValue(target.value)}
  />
);

export default withForm(Input);
```
