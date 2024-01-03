import React, { PropsWithChildren, Reducer, createContext, useReducer, useEffect } from 'react';

export const enum AuthActionType {
  LOGIN,
  LOGOUT,
};

interface Action {
  type: AuthActionType,
  payload: string | null,
};

export const AuthContext = createContext({
  loggedInAs: null as string | null,
  dispatch: ((_: Action) => {}) as React.Dispatch<Action>,
});

export const authReducer = ((state: string | null, action: Action): string | null => {
  switch (action.type) {
    case AuthActionType.LOGIN: {
      return action.payload as string;
    }
    
    case AuthActionType.LOGOUT: {
      return null;
    }
    
    default:
      return state;
  }
}) as Reducer<string | null, Action>;

/* Provides the current user as a context accessible to the entire app,
  and a function for modifying the current user.
  This function outsources its logic to a reducer. */
export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [loggedInAs, dispatch] = useReducer<Reducer<string | null, Action>>(authReducer, null);

  /* Upon visiting the site, if the JSON web token from the last visit
    is still valid, then log in the user.

    Workflow:
      1. When first loggin in/signing up, the server returns
        { username, token (JSON web token) }, which gets saved to localStorage
        with 'user' as the key.

      2. Upon all visits, if localStorage has the 'user' key, retrieve the
        { username, token }, and set it as the user context.
        
    This context is used for deciding whether to show a login page or the flashcards page.
    For communications with the server, http-common.ts uses localStorage separately to
    load the bearer token. */
  useEffect(() => {
    const userString: string | null = localStorage.getItem('user');
    if (userString === null) {
      return;
    }

    const user = JSON.parse(userString);

    dispatch({
      type: AuthActionType.LOGIN,
      payload: user.username,
    });
  }, []);

  console.log('AuthContext state: ', loggedInAs);

  return (
    <AuthContext.Provider value={{ loggedInAs, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
