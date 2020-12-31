import React, { createContext, useReducer } from 'react';

export interface Action {
  type: string,
  payload: any
}

export default (reducer: any, actions: any, initialState: any) => {
  const Context = createContext({} as any);

  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {} as any;
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={ { state, ...boundActions } }>
        { children }
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
