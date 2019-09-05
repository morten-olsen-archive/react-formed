import React, { createContext } from 'react';
import { connect } from 'react-redux';

interface Props {
  getState: (state: any) => any;
  children: any;
}

interface InnerProps {
  children: any;
  forms: any;
  dispatch: (action: any) => void;
}

const {
  Provider: ReactProvider,
  Consumer,
} = createContext<any>(undefined);

const InnerProvider = ({
  forms,
  children,
  dispatch,
}: InnerProps) => (
  <ReactProvider value={{ forms, redux: true, dispatch }}>
    {children}
  </ReactProvider>
);

const Provider = ({ getState, ...props }: Props) => {
  const Comp = connect((state) => ({
    forms: getState(state),
  }))(InnerProvider);
  return <Comp {...props} />
};

export {
  Consumer,
  Provider,
};

