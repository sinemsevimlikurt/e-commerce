import { SET_CART, SET_PAYMENT, SET_ADDRESS } from '../types';

const initialState = {
  cart: [],
  payment: {},
  address: {}
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
