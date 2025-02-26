import api from './api';

export const paymentService = {
  getSavedCards: () => api.get('/user/card'),
  
  addCard: (cardData) => api.post('/user/card', cardData),
  
  updateCard: (cardData) => api.put('/user/card', cardData),
  
  deleteCard: (cardId) => api.delete(`/user/card/${cardId}`),
  
  processPayment: (paymentData) => api.post('/payment/process', paymentData),
  
  getInstallmentOptions: (cardNumber) => 
    api.get(`/payment/installment-options?card_number=${cardNumber}`),
};

export default paymentService;
