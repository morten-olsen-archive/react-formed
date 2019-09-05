/** @format */
const getTargetState = (names: string[], carbonState: any) =>
  names.reduce((output, currentName, index) => {
    const result = output;
    const nextName = names[index + 1];
    if (!result[currentName]) {
      result[currentName] = typeof nextName === 'number' ? [] : {};
    }
    return result[currentName];
  }, carbonState);

export const updateState = (name: string | [string, ...string[]], value: any, state: any) => {
  const names = (Array.isArray(name) ? [...name] : [name]) as [string, ...string[]];
  const carbonState = { ...(state ? state.form : {}) };
  const target = names.pop() as string;
  const stateTarget = getTargetState(names, carbonState);
  stateTarget[target] = value;
  return carbonState;
};
