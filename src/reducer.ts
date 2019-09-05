import { updateState } from './helpers';
import { Reducer } from 'redux';

const reducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case '@@FORMS/SET_VALUES': {
      const { form, values, dirty } = action.payload;
      return {
        ...state,
        [form]: {
          values,
          dirty,
        }
      };
    }
    case '@@FORMS/SET_VALUE': {
      const { form, name, value } = action.payload;
      return {
        ...state,
        [form]: {
          values: updateState(name, value, state[form]),
          dirty: true,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
