import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const payload = {
      address_id: orderData.addressId,
      order_date: new Date().toISOString(),
      card_no: orderData.cardNo,
      card_name: orderData.cardName,
      card_expire_month: orderData.expireMonth,
      card_expire_year: orderData.expireYear,
      card_ccv: orderData.ccv,
      price: orderData.totalPrice,
      products: orderData.products.map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.detail || `${item.product.color} - ${item.product.size}`
      }))
    };

    const response = await api.post('/order', payload);
    return response.data;
  }
};

export default orderService;
