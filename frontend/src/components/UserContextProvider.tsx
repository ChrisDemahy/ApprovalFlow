import React, { createContext, useReducer } from 'react';
import type User from '../types/user';

// useReduce

interface userState {
  user: User;
}

export const userStateDefaultValue: userState = {
  user: {
    id: 0,
    email: '',
    password: '',
    token: '',
  },
};

type Action =
  | { type: 'set_user'; user: User }
  | { type: 'del_user'; user: User };

const reducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case 'set_user':
      return {
        ...state,
        user: { ...action.user },
      };
    case 'del_user':
      return { ...state, user: { ...userStateDefaultValue.user } };
  }
};

const [state, dispatch] = useReducer(reducer, userStateDefaultValue);

// Context API

type userContextData = {
  state: userState;
  dispatch: React.Dispatch<Action>;
};

const userContextDefaultValue: userContextData = {
  state: state,
  dispatch: dispatch,
};

export const UserContext = createContext<userContextData>(
  userContextDefaultValue,
);

const UserContextProvider = ({ children }: any) => {
  return (
    <div>
      <UserContext.Provider value={userContextDefaultValue}>
        {children}
      </UserContext.Provider>
    </div>
  );
};
