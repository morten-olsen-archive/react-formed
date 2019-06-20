/** @format */
const getTargetState = (names, carbonState) =>
  names.reduce((output, currentName, index) => {
    const result = output;
    const nextName = names[index + 1];
    if (!result[currentName]) {
      result[currentName] = typeof nextName === 'number' ? [] : {};
    }
    return result[currentName];
  }, carbonState);

export const updateState = (name, value, state) => {
  const names = Array.isArray(name) ? [...name] : [name];
  const carbonState = { ...state };
  const target = names.pop();
  const stateTarget = getTargetState(names, carbonState);
  stateTarget[target] = value;
  return carbonState;
};
