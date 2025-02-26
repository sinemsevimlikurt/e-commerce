import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const CheckoutPaymentPage = () => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(1);

  useEffect(() => {
    fetchCards();
  }, []);

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
    // In a real application, you would fetch installment options here
    setInstallmentOptions([
      { months: 1, amount: 8448.99 },
      { months: 3, amount: 2816.33 },
      { months: 6, amount: 1408.17 },
      { months: 9, amount: 938.78 }
    ]);
  };

  const handlePayment = async () => {
    if (!selectedCard) {
      toast.error('Lütfen bir kart seçin');
      return;
    }

    try {
      // In a real application, you would send payment details to your API
      await api.post('/payment/process', {
        cardId: selectedCard.id,
        installments: selectedInstallment,
        amount: 8448.99
      });
      
      toast.success('Ödeme başarıyla tamamlandı');
      history.push('/order-confirmation');
    } catch (error) {
      toast.error('Ödeme işlemi sırasında bir hata oluştu');
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
                  <span className="font-medium">8.448,99 TL</span>
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
                      8.448,99 TL
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    KDV Dahil
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!selectedCard}
                  className={`w-full py-3 px-4 rounded-md transition-colors mt-4 ${
                    selectedCard
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Ödemeyi Tamamla
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
