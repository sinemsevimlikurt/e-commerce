import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, itemsPerPage = 8, filter = '', sort = '' }) => {
    try {
      const limit = page * itemsPerPage;
      const offset = (page - 1) * itemsPerPage;
      
      let url = `${BASE_URL}/products?limit=${limit}&offset=${offset}`;
      if (filter) url += `&filter=${filter}`;
      if (sort) url += `&sort=${sort}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
    totalProducts: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
