import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      category: 'Fresh Fruits',
      price: 4.99,
      oldPrice: 6.99,
      image: 'https://picsum.photos/seed/bananas/400/500',
      rating: 5
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 3.99,
      oldPrice: 5.99,
      image: 'https://picsum.photos/seed/tomatoes/400/500',
      rating: 4
    },
    {
      id: 3,
      name: 'Organic Apples',
      category: 'Fresh Fruits',
      price: 2.99,
      oldPrice: 4.99,
      image: 'https://picsum.photos/seed/apples/400/500',
      rating: 5
    },
    {
      id: 4,
      name: 'Fresh Bread',
      category: 'Bakery',
      price: 1.99,
      oldPrice: 3.99,
      image: 'https://picsum.photos/seed/bread/400/500',
      rating: 4
    },
    {
      id: 5,
      name: 'Fresh Salmon',
      category: 'Meat & Fish',
      price: 12.99,
      oldPrice: 15.99,
      image: 'https://picsum.photos/seed/salmon/400/500',
      rating: 5
    },
    {
      id: 6,
      name: 'Organic Carrots',
      category: 'Vegetables',
      price: 2.49,
      oldPrice: 3.99,
      image: 'https://picsum.photos/seed/carrots/400/500',
      rating: 4
    },
    {
      id: 7,
      name: 'Fresh Eggs',
      category: 'Dairy',
      price: 3.99,
      oldPrice: 5.99,
      image: 'https://picsum.photos/seed/eggs/400/500',
      rating: 5
    },
    {
      id: 8,
      name: 'Organic Milk',
      category: 'Dairy',
      price: 4.49,
      oldPrice: 6.99,
      image: 'https://picsum.photos/seed/milk/400/500',
      rating: 4
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#252B42] mb-4">Featured Products</h2>
        <p className="text-center text-[#737373] mb-12">Shop our best sellers and popular picks</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#23856D] hover:text-white">
                    <Heart size={20} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#23856D] hover:text-white">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-base font-bold text-[#252B42]">{product.name}</h3>
                <p className="text-sm text-[#737373] mb-2">{product.category}</p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-[#BDBDBD] line-through">${product.oldPrice}</span>
                  <span className="text-[#23856D] font-bold">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
