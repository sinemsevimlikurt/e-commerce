import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

export default store;
