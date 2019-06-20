/** @format */

export const clear = (name: string) => ({
  type: '@@FORMS/SET_VALUES',
  payload: {
    form: name,
    values: {},
  },
});

export const setForm = (name: string, values: any) => ({
  type: '@@FORMS/SET_VALUES',
  payload: {
    form: name,
    values: values || {},
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
