import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const PaymentMethodsPage = () => {
  const [cards, setCards] = useState([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
  });

  const history = useHistory();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await api.get('/user/card');
      setCards(response.data);
    } catch (error) {
      toast.error('Kartlar yüklenirken bir hata oluştu');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCard) {
        await api.put('/user/card', {
          id: editingCard.id,
          ...formData,
        });
        toast.success('Kart başarıyla güncellendi');
      } else {
        await api.post('/user/card', formData);
        toast.success('Kart başarıyla eklendi');
      }
      setIsAddingCard(false);
      setEditingCard(null);
      setFormData({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: '',
      });
      fetchCards();
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const handleDelete = async (cardId) => {
    if (window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      try {
        await api.delete(`/user/card/${cardId}`);
        toast.success('Kart başarıyla silindi');
        fetchCards();
      } catch (error) {
        toast.error('Kart silinirken bir hata oluştu');
      }
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
      name_on_card: card.name_on_card,
    });
    setIsAddingCard(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Kayıtlı Kartlarım</h1>
          {!isAddingCard && (
            <button
              onClick={() => setIsAddingCard(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Yeni Kart Ekle
            </button>
          )}
        </div>

        {isAddingCard && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCard ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Numarası
                </label>
                <input
                  type="text"
                  name="card_no"
                  value={formData.card_no}
                  onChange={handleInputChange}
                  pattern="\d{16}"
                  maxLength="16"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Son Kullanma Ay
                  </label>
                  <select
                    name="expire_month"
                    value={formData.expire_month}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  >
                    <option value="">Ay Seçin</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Son Kullanma Yıl
                  </label>
                  <select
                    name="expire_year"
                    value={formData.expire_year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  >
                    <option value="">Yıl Seçin</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Üzerindeki İsim
                </label>
                <input
                  type="text"
                  name="name_on_card"
                  value={formData.name_on_card}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCard(false);
                    setEditingCard(null);
                    setFormData({
                      card_no: '',
                      expire_month: '',
                      expire_year: '',
                      name_on_card: '',
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  {editingCard ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{card.name_on_card}</span>
                  <span className="text-gray-500">
                    •••• •••• •••• {card.card_no.slice(-4)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
