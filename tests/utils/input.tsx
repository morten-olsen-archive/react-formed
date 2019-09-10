import React, { FunctionComponent } from "react";
import { withForm } from "react-formed";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const TextInput: FunctionComponent<Props> = ({
  value,
  setValue
}) => (
  <input
    value={value}
    onChange={evt => setValue(evt.target.value)}
  />
);

const FormTextInput = withForm(TextInput);

export {
  TextInput,
  FormTextInput
};