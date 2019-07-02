const createSelector = (binding: (state: any) => any) => {
  const getForms = (state: any) => binding(state);

  const getForm = (state: any, name: string) => getForms(state)[name];

  return {
    getForms,
    getForm,
  };
};

export default createSelector;
