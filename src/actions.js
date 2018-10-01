/** @format */

export const clear = name => ({
  type: '@@FORMS/SET_VALUES',
  payload: {
    form: name,
    values: {},
  },
});

export const setForm = (name, values) => ({
  type: '@@FORMS/SET_VALUES',
  payload: {
    form: name,
    values: values || {},
  },
});

export const setValue = (form, name, value) => ({
  type: '@@FORMS/SET_VALUE',
  payload: {
    form,
    name,
    value,
  },
});
