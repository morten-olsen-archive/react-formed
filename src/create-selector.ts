/** @format */

const createSelector = binding => {
  const getForms = state => binding(state);

  const getForm = (state, name) => getForms(state)[name];

  return {
    getForms,
    getForm,
  };
};

export default createSelector;
