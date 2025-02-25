import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import Spinner from '../components/common/Spinner';

const ProductDetailPage = ({ match, history }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct) {
      console.log('Adding to cart:', currentProduct);
      dispatch(addToCart({ 
        product: {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          images: currentProduct.images || [],
          description: currentProduct.description,
          stock: currentProduct.stock
        } 
      }));
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={20} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={20} />);
      }
    }
    return stars;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-center p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
        <p>{error}</p>
      </div>
    </div>
  );
  
  if (!currentProduct) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => history.goBack()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Shop
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={currentProduct.images[0]?.url || 'https://via.placeholder.com/400'}
            alt={currentProduct.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentProduct.name}</h1>
          </div>
          
          <p className="text-gray-600">{currentProduct.description}</p>
          
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderRatingStars(currentProduct.rating)}
            </div>
            <span className="text-gray-500">({currentProduct.rating} rating)</span>
          </div>
          
          <div className="text-2xl font-bold text-gray-900">
            ${currentProduct.price.toFixed(2)}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Stock:</span>
              <span className={`font-medium ${currentProduct.stock < 50 ? 'text-red-500' : 'text-green-500'}`}>
                {currentProduct.stock} units
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Total Sales:</span>
              <span className="font-medium">{currentProduct.sell_count} units</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={currentProduct.stock === 0}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg text-white
                ${currentProduct.stock === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <ShoppingCart size={20} />
              <span>{currentProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductDetailPage);
