/** @format */

export const updateState = (name, value, state) => {
  const names = Array.isArray(name) ? [...name] : [name];
  const carbonState = { ...state };
  let stateTarget = carbonState;
  const target = names.pop();
  for (let i = 0; i < names.length; i += 1) {
    const cName = names[i];
    if (!stateTarget[cName]) {
      const nName = names[i + 1];
      if (typeof nName === 'number') {
        stateTarget[cName] = [];
      } else {
        stateTarget[cName] = {};
      }
    }
    stateTarget = stateTarget[cName];
  }
  stateTarget[target] = value;
  return carbonState;
};
