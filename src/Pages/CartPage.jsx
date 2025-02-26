import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { removeFromCart, updateItemCount, toggleItemCheck } from '../store/slices/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const history = useHistory();

  const handleUpdateCount = (productId, newCount) => {
    dispatch(updateItemCount({ productId, count: Math.max(1, newCount) }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleItemCheck({ productId }));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0);
  };

  const handleCheckout = () => {
    const hasCheckedItems = cartItems.some(item => item.checked);
    if (!hasCheckedItems) {
      alert('Lütfen en az bir ürün seçin');
      return;
    }
    history.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Sepetiniz boş</h2>
          <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünleri keşfedin.</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2"
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Sepetim ({cartItems.length} Ürün)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin.
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">
                        <input
                          type="checkbox"
                          checked={cartItems.every(item => item.checked)}
                          onChange={() => cartItems.forEach(item => handleToggleCheck(item.product.id))}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-4 px-4">Ürün</th>
                      <th className="text-center py-4 px-4">Adet</th>
                      <th className="text-right py-4 px-4">Fiyat</th>
                      <th className="text-right py-4 px-4">Toplam</th>
                      <th className="text-right py-4 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.product.id} className="border-b">
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleToggleCheck(item.product.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={item.product.images[0] || 'https://via.placeholder.com/80'}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="ml-4">
                              <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                              <div className="text-sm text-gray-500 mt-1">
                                Satıcı: {item.product.seller || 'Mağaza'}
                              </div>
                              {item.product.stock < 50 && (
                                <div className="text-sm text-red-500 mt-1">
                                  Son {item.product.stock} ürün!
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                              disabled={item.count <= 1}
                            >
                              <Minus size={16} className={item.count <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                            <span className="w-8 text-center">{item.count}</span>
                            <button
                              onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                              disabled={item.count >= item.product.stock}
                            >
                              <Plus size={16} className={item.count >= item.product.stock ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {item.product.price.toFixed(2)} TL
                        </td>
                        <td className="py-4 px-4 text-right font-medium">
                          {(item.product.price * item.count).toFixed(2)} TL
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center border-t pt-6">
                <div>
                  <span className="text-gray-600">Seçilen Ürünler ({cartItems.filter(item => item.checked).length})</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    Toplam: {calculateTotal().toFixed(2)} TL
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    KDV Dahil
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Ürünün Toplamı</span>
                <span className="font-medium">{calculateTotal().toFixed(2)} TL</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Kargo Toplamı</span>
                <span className="font-medium">29,99 TL</span>
              </div>

              {calculateTotal() >= 150 && (
                <div className="flex justify-between text-green-600">
                  <span>150 TL ve Üzeri Kargo Bedava (Satıcı Kargolar)</span>
                  <span>-29,99 TL</span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Toplam</span>
                  <span className="text-xl font-bold text-[#F84B0E]">
                    {(calculateTotal() >= 150 
                      ? calculateTotal() 
                      : calculateTotal() + 29.99
                    ).toFixed(2)} TL
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1 text-right">
                  KDV Dahil
                </div>
              </div>

              <button
                className="w-full bg-[#F84B0E] text-white py-3 px-4 rounded-md hover:bg-[#E03A00] transition-colors mt-4"
                onClick={handleCheckout}
                disabled={!cartItems.some(item => item.checked)}
              >
                Sepeti Onayla
              </button>

              <div className="mt-4">
                <button className="w-full text-[#F84B0E] text-center font-medium">
                  + İNDİRİM KODU GİR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
