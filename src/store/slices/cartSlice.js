import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false
  },
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          count: 1,
          checked: true,
          product
        });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
    },
    updateItemCount: (state, action) => {
      const { productId, count } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      if (item) {
        item.count = Math.max(1, count); // Ensure count is at least 1
      }
    },
    toggleItemCheck: (state, action) => {
      const { productId } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      if (item) {
        item.checked = !item.checked;
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateItemCount, 
  toggleItemCheck, 
  toggleCart,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
