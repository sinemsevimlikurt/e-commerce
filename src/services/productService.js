import axios from 'axios';

const BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

export const getProducts = async (page = 1, itemsPerPage = 8) => {
  try {
    // Calculate limit and offset based on the page number
    const limit = page * itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    
    const response = await axios.get(`${BASE_URL}/products?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products: ' + error.message);
  }
};
