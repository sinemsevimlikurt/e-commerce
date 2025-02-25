import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import { ArrowLeft, Star } from 'lucide-react';
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
          
          <div className="space-y-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductDetailPage);
