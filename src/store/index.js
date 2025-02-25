import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
