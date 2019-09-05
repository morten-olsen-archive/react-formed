/** @format */

export const clear = (name: string) => ({
  type: '@@FORMS/SET_VALUES',
  payload: {
    form: name,
    values: {},
    dirty: false,
  },
});

export const setForm = (name: string, values: any, dirty: boolean = true) => ({
  type: '@@FORMS/SET_VALUES',
  payload: {
    form: name,
    values: values || {},
    dirty,
  },
});

export const setValue = (form: string, name: string, value: string) => ({
  type: '@@FORMS/SET_VALUE',
  payload: {
    form,
    name,
    value,
  },
});
