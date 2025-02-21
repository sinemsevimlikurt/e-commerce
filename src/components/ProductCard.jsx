import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { id, name, description, price, rating, images, stock, sell_count } = product;

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={16} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={16} />);
      }
    }
    return stars;
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg">
        <Link to={`/product/${id}`} className="block aspect-w-1 aspect-h-1">
          <img
            src={images[0]?.url}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {stock < 50 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            Low Stock
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <Link to={`/product/${id}`} className="block">
            <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-1">
              {name}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex items-center space-x-1">
          {renderRatingStars()}
          <span className="text-xs text-gray-500 ml-1">({sell_count} sold)</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-blue-600">{price.toFixed(2)} ₺</p>
          {stock > 0 ? (
            <span className="text-sm text-green-600">{stock} in stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
