import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedAddress } from '../store/slices/checkoutSlice';

const CheckoutAddressPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Ev',
      name: 'Ev Adresim',
      fullAddress: '06000 - Ankara, Etimesgut',
      phone: '(530) *** ** 12',
      selected: true
    },
    {
      id: 2,
      type: 'İş',
      name: 'İş Adresim',
      fullAddress: 'Ankara, Çankaya',
      phone: '(530) *** ** 99',
      selected: false
    }
  ]);

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Ev',
    name: '',
    fullAddress: '',
    phone: ''
  });

  const handleAddressSelect = (id) => {
    const selectedAddr = addresses.find(addr => addr.id === id);
    setAddresses(addresses.map(addr => ({
      ...addr,
      selected: addr.id === id
    })));
    dispatch(setSelectedAddress(selectedAddr));
  };

  const handleNewAddressSubmit = (e) => {
    e.preventDefault();
    const id = Math.max(...addresses.map(a => a.id)) + 1;
    setAddresses([
      ...addresses.map(a => ({ ...a, selected: false })),
      { ...newAddress, id, selected: true }
    ]);
    setShowNewAddressForm(false);
    setNewAddress({ type: 'Ev', name: '', fullAddress: '', phone: '' });
  };

  const handleContinue = () => {
    const selectedAddr = addresses.find(addr => addr.selected);
    if (!selectedAddr) {
      // toast.error('Lütfen bir teslimat adresi seçin');
      return;
    }
    dispatch(setSelectedAddress(selectedAddr));
    history.push('/checkout/payment');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center text-orange-500 font-medium">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-2">1</span>
            Adres Bilgileri
          </div>
          <div className="flex items-center text-gray-400 font-medium">
            <span className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center mr-2">2</span>
            Ödeme Seçenekleri
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Teslimat Adresi</h2>

              {/* Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      address.selected
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-500'
                    }`}
                    onClick={() => handleAddressSelect(address.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-sm font-medium rounded">
                        {address.type}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">Düzenle</button>
                    </div>
                    <h3 className="font-medium mb-2">{address.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{address.fullAddress}</p>
                    <p className="text-gray-600 text-sm">{address.phone}</p>
                  </div>
                ))}

                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2 h-full min-h-[150px] hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                  <span className="text-2xl">+</span>
                  <span>Yeni Adres Ekle</span>
                </button>
              </div>

              {showNewAddressForm && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Yeni Adres Ekle</h3>
                  <form onSubmit={handleNewAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Adres Başlığı</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Adres Tipi</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                        >
                          <option value="Ev">Ev</option>
                          <option value="İş">İş</option>
                          <option value="Diğer">Diğer</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Adres</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                        value={newAddress.fullAddress}
                        onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                      <input
                        type="tel"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => setShowNewAddressForm(false)}
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                      >
                        Kaydet
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="mt-6 border-t pt-6">
                <div className="flex items-center">
                  <input type="checkbox" id="fatura" className="mr-2" />
                  <label htmlFor="fatura" className="text-sm">
                    Faturamı Aynı Adrese Gönder
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
                </p>
              </div>
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
                  onClick={handleContinue}
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors mt-4"
                >
                  Kaydet ve Devam Et
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddressPage;
