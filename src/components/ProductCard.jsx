import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div data-slot="card" className="text-card-foreground flex flex-col rounded-xl border group gap-2 pb-10 border-none shadow-none">
      <div data-slot="card-header" className="flex flex-col gap-1.5 p-0">
        <div className="relative overflow-hidden">
          <Link className="block" to={`/product/${product.id}`}>
            <div data-radix-aspect-ratio-wrapper="" style={{ position: 'relative', width: '100%', paddingBottom: '133.333%' }}>
              <div data-slot="aspect-ratio" className="overflow-hidden" style={{ position: 'absolute', inset: 0 }}>
                <img
                  alt={product.name}
                  className="w-full h-full object-cover"
                  src={product.image}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div data-slot="card-content" className="text-center p-0">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mt-1">{product.category}</div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-blue-600">{product.price} ₺</span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {product.colors?.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-300 transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
