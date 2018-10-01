/** @format */

import { updateState } from './helpers';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case '@@FORMS/SET_VALUES': {
      const { form, values } = action.payload;
      return {
        ...state,
        [form]: values,
      };
    }
    case '@@FORMS/SET_VALUE': {
      const { form, name, value } = action.payload;
      return {
        ...state,
        [form]: updateState(name, value, state[form]),
      };
    }
    default:
      return state;
  }
};

export default reducer;
