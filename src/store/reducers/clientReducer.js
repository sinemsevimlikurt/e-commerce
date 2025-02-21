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

const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en',
  isAuthenticated: false,
  error: null
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
    case LOGIN_SUCCESS:
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
    case VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};

export default clientReducer;
