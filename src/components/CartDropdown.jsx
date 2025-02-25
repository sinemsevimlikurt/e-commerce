import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { removeFromCart, updateItemCount, toggleCart } from '../store/slices/cartSlice';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector(state => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  const handleIncrement = (productId) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      dispatch(updateItemCount({ productId, count: item.count + 1 }));
    }
  };

  const handleDecrement = (productId) => {
    const item = items.find(item => item.product.id === productId);
    if (item && item.count > 1) {
      dispatch(updateItemCount({ productId, count: item.count - 1 }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => dispatch(toggleCart())}
        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
      >
        <ShoppingBag size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-auto">
                  {items.map(({ product, count }) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <img
                        src={product.images[0]?.url || 'https://via.placeholder.com/100'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <Link 
                          to={`/product/${product.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                          onClick={() => dispatch(toggleCart())}
                        >
                          {product.name}
                        </Link>
                        <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() => handleDecrement(product.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                            disabled={count <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm">{count}</span>
                          <button
                            onClick={() => handleIncrement(product.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="p-1 hover:bg-gray-100 rounded text-red-500 ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
                    onClick={() => dispatch(toggleCart())}
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
