import React from 'react';
import { withRouter } from 'react-router-dom';

const CartPage = ({ history }) => {
  const handleStartShopping = () => {
    history.push('/shop');
  };

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Sepetiniz boş</h2>
          <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünleri keşfedin.</p>
          <button
            onClick={handleStartShopping}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2"
          >
            Alışverişe Başla
          </button>
        </div>
      </div>
    </main>
  );
};

export default withRouter(CartPage);
