import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Siparişiniz Başarıyla Oluşturuldu!
        </h1>
        <p className="text-gray-600 mb-2">
          Siparişiniz için teşekkür ederiz. Siparişinizin durumunu "Siparişlerim" sayfasından takip edebilirsiniz.
        </p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            Sipariş Numarası: #{orderId}
          </p>
        )}
        <div className="space-y-4">
          <Link
            to={`/orders${orderId ? `?highlight=${orderId}` : ''}`}
            className="block w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Siparişlerimi Görüntüle
          </Link>
          <Link
            to="/"
            className="block w-full bg-white text-orange-500 border border-orange-500 py-3 px-4 rounded-md hover:bg-orange-50 transition-colors"
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
