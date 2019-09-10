const normalizeName = (names: number | string | (string | number)[]) => {
  if (Array.isArray(names)) {
    return names;
  }
  return [names];
}

const getValue = (names: (string | number)[], value: any) => {
  const carbonNames = [...names];
  const top = carbonNames.pop();
  const target = carbonNames.reduce((output, key) => output ? output[key] : undefined, value);
  return target ? target[top as any] : undefined;
}

const setValue = (names: (string | number)[], value: any, original: any) => {
  const carbonNames = [...names];
  const top = carbonNames.pop();
  const target = carbonNames.reduce((output, key, index) => {
    const next = names[index + 1];
    if (!output[key]) {
      if (typeof next === 'string') {
        output[key] = {}
      } else if  (typeof next === 'number') {
        output[key] = []
      } else {
        throw new Error(`key ${key} of type ${typeof next} not supported`);
      }
    } else {
      if (typeof next === 'string') {
        output[key] = {... output[key]}
      } else if  (typeof next === 'number') {
        output[key] = [... output[key]]
      }
    }
    return output[key];
  }, original);
  target[top as any] = value;
  return original;
}

export {
  normalizeName,
  getValue,
  setValue,
};
