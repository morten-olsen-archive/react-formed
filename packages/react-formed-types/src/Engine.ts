interface Provider<DataType = any> {
  subscribe: (fn: () => void) => void;
  unsubscribe: (fn: () => void) => void;
  setValue: (value: any) => void;
  getValue: () => DataType;
}

export default Provider;