import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  cart: cartReducer,
  auth: authReducer
});

export default rootReducer;
