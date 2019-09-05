const createSelector = (binding: (state: any) => any) => {
  const getForms = (state: any) => binding(state);

  const getForm = (state: any, name: string) => {
    const form = getForms(state)[name];
    if (!form) {
      return {};
    }
    return form.values || {};
  };

  return {
    getForms,
    getForm,
  };
};

export default createSelector;
