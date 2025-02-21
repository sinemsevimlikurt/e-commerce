import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../types';
import api from '../../services/api';

// Synchronous action creators
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
export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState();
  
  // Only fetch roles if they haven't been fetched yet
  if (!client.roles || client.roles.length === 0) {
    try {
      const roles = await api.getRoles(); // You'll need to implement this API call
      dispatch(setRoles(roles));
    } catch (error) {
      console.error('Error fetching roles:', error);
      // You might want to dispatch an error action here
    }
  }
};
