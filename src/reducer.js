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
        [form]: {
          ...state[form],
          [name]: value,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
