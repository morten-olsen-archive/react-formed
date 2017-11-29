import withForm from '../with-form';

const WithForm = ({ setValue, value, children }) => {
  const elm = children(value, setValue);
  return elm;
};

export default withForm(WithForm);
