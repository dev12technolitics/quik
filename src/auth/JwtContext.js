import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback } from 'react';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
      // const { user } = action.payload;
      // console.log("Console JWT action",action.payload.user);
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(
 {
   ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
}
);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  
  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      const userId = typeof window !== 'undefined' ? localStorage.getItem('id') : '';
     
      
        const headers = {
          accessToken: "x-access-token"
        }

      if (accessToken && isValidToken(accessToken) && userId) {
        setSession(accessToken, userId);

        const response = await axios.get('/adminuser/one/' + userId, {
          headers: headers
        });

        const user  = response.data.adminuser;
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  // LOGIN
  const login = async (username, password) => {
    const response = await axios.post('/adminuser/login', {
      username,
      password,
    });

    const { accessToken, user, id } = response.data;

    setSession(accessToken, id);
    initialize();

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  // REGISTER
  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  // LOGOUT
  const logout = async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
