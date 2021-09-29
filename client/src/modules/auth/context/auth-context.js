import * as React from 'react';
import axios from 'axios';
import { setAuthToken } from '../utils/set-auth-token';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refreshAuthLogic } from '../utils/refresh-auth-logic';
import PropTypes from 'prop-types';

const defaultState = { user: null, isAuthenticated: false, isLoading: true };

export const AuthContext = React.createContext(defaultState);

export const AuthReducer = (initialState, action) => {
  console.log(initialState);
  switch (action.type) {
    case 'login':
      return {
        ...initialState,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'auth-error':
      return {
        ...initialState,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'update':
      console.log({
        ...initialState,
        user: { ...initialState.user, username: action.payload },
        isAuthenticated: true,
        isLoading: false,
      });
      return {
        ...initialState,
        user: { ...initialState.user, username: action.payload },
        isAuthenticated: true,
        isLoading: false,
      };
    case 'logout':
      return {
        ...initialState,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, defaultState);

  React.useEffect(async () => {
    try {
      // createAuthRefreshInterceptor(axios, refreshAuthLogic);
      setAuthToken(localStorage.getItem('access-token'));
      const res = await axios.get(`${BASE_API_URL}/api/auth/current-user/`);
      dispatch({ type: 'login', payload: res.data });
    } catch (error) {
      dispatch({ type: 'auth-error' });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={React.useMemo(() => ({ state, dispatch }), [state, dispatch])}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
