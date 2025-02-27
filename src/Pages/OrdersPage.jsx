import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import '../styles/animations.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const highlightedOrderId = searchParams.get('highlight');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (highlightedOrderId) {
      const element = document.getElementById(`order-${highlightedOrderId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('animate-highlight');
      }
    }
  }, [highlightedOrderId, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.user.getOrders();
      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
        toast.error('Sipariş verileri geçersiz format');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
      toast.error(error.response?.data?.message || 'Siparişler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Siparişlerim</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Henüz hiç siparişiniz bulunmuyor.</p>
            <button
              onClick={() => history.push('/shop')}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                id={`order-${order.id}`}
                className={`bg-white rounded-lg shadow-md p-6 transition-all duration-500 ${
                  highlightedOrderId === order.id ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Sipariş No: #{order.id}</p>
                    <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center border-b pb-4 last:border-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.count} adet x {item.product.price} TL
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(item.count * item.product.price).toFixed(2)} TL</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Toplam Tutar</span>
                    <span className="text-xl font-bold text-orange-500">
                      {order.total_price.toFixed(2)} TL
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
