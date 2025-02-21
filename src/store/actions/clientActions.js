import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE
} from '../types';
import api from '../../services/api';

// Auth action creators
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  return { type: LOGOUT };
};

export const verifyTokenSuccess = (user) => ({
  type: VERIFY_TOKEN_SUCCESS,
  payload: user
});

export const verifyTokenFailure = (error) => ({
  type: VERIFY_TOKEN_FAILURE,
  payload: error
});

// Login thunk
export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    const { data } = await api.auth.login(credentials);
    const { token, user } = data;

    // Set token in axios headers
    api.defaults.headers.common['Authorization'] = token;

    // Store token if rememberMe is true
    if (rememberMe) {
      localStorage.setItem('token', token);
    }

    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

// Verify token thunk
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return dispatch(verifyTokenFailure('No token found'));
  }

  try {
    // Set token in axios headers
    api.defaults.headers.common['Authorization'] = token;

    const { data } = await api.auth.verify();
    dispatch(verifyTokenSuccess(data.user));
  } catch (error) {
    // Clear token if verification fails
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    dispatch(verifyTokenFailure(error.response?.data?.message || 'Token verification failed'));
  }
};

// Other action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

// Thunk action creator for getting roles
export const fetchRoles = () => async (dispatch) => {
  try {
    const { data } = await api.user.getRoles();
    dispatch(setRoles(data.roles));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};
