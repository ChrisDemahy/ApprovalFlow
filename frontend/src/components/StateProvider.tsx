import React, { createContext, useReducer } from 'react';
import type User from '../types/user';
type Visibility = 'all' | 'completed' | 'active';
interface State {
  user: User;
}

type Action =
  | { type: 'set_user'; user: object }
  | { type: 'del_user'; user: object };

const initialState: State = {
  user: {
    id: 0,
    email: '',
    password: '',
    token: '',
  },
};

// Reducer

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set_user':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case 'del_user':
      return initialState;
  }
};

// State Store
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Provider value={[state, dispatch]}> {children} </Provider>
    </div>
  );
};
//

export default StateProvider;
