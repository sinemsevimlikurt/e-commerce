import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { orderService } from '../services/orderService';
import { clearCart } from '../store/slices/cartSlice';

const CheckoutPaymentPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [ccv, setCcv] = useState('');

  const selectedAddress = useSelector((state) => state.checkout?.selectedAddress);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  useEffect(() => {
    if (!selectedAddress) {
      history.push('/checkout');
      return;
    }
    fetchCards();
  }, [selectedAddress, history]);

  const fetchCards = async () => {
    try {
      const response = await api.get('/user/card');
      setCards(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Kartlar yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setInstallmentOptions([
      { months: 1, amount: totalPrice },
      { months: 3, amount: totalPrice / 3 },
      { months: 6, amount: totalPrice / 6 },
      { months: 9, amount: totalPrice / 9 }
    ]);
  };

  const handlePayment = async () => {
    if (!selectedCard || !ccv || !selectedAddress) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    if (ccv.length !== 3) {
      toast.error('Geçersiz CCV');
      return;
    }

    setProcessing(true);
    try {
      await orderService.createOrder({
        addressId: selectedAddress.id,
        cardNo: selectedCard.card_no,
        cardName: selectedCard.name_on_card,
        expireMonth: selectedCard.expire_month,
        expireYear: selectedCard.expire_year,
        ccv: parseInt(ccv),
        totalPrice,
        products: cartItems
      });

      dispatch(clearCart());
      toast.success('Siparişiniz başarıyla oluşturuldu!');
      history.push('/order-success');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center text-gray-400 font-medium">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">✓</span>
            Adres Bilgileri
          </div>
          <div className="flex items-center text-orange-500 font-medium">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-2">2</span>
            Ödeme Seçenekleri
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Ödeme Yöntemi</h2>

              {loading ? (
                <div className="text-center py-8">Yükleniyor...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedCard?.id === card.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-500'
                        }`}
                        onClick={() => handleCardSelect(card)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{card.name_on_card}</span>
                        </div>
                        <div className="text-gray-600">
                          **** **** **** {card.card_no.slice(-4)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => history.push('/payment-methods')}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2 h-full min-h-[150px] hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                      <span className="text-2xl">+</span>
                      <span>Yeni Kart Ekle</span>
                    </button>
                  </div>

                  {selectedCard && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CCV
                      </label>
                      <input
                        type="text"
                        maxLength="3"
                        pattern="\d{3}"
                        value={ccv}
                        onChange={(e) => setCcv(e.target.value.replace(/\D/g, ''))}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                  )}

                  {selectedCard && installmentOptions.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Taksit Seçenekleri</h3>
                      <div className="space-y-3">
                        {installmentOptions.map((option) => (
                          <div
                            key={option.months}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              selectedInstallment === option.months
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-500'
                            }`}
                            onClick={() => setSelectedInstallment(option.months)}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">
                                {option.months} Taksit
                              </span>
                              <span className="text-orange-500 font-medium">
                                {option.amount.toFixed(2)} TL x {option.months}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ürünün Toplamı</span>
                  <span className="font-medium">{totalPrice.toFixed(2)} TL</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo Toplamı</span>
                  <span className="font-medium">29,99 TL</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>150 TL ve Üzeri Kargo Bedava</span>
                  <span>-29,99 TL</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Toplam</span>
                    <span className="text-xl font-bold text-orange-500">
                      {totalPrice.toFixed(2)} TL
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    KDV Dahil
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!selectedCard || !ccv || processing}
                  className={`w-full py-3 px-4 rounded-md transition-colors mt-4 ${
                    selectedCard && ccv && !processing
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {processing ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
