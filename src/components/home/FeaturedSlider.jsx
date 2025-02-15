import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';

const FeaturedSlider = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Strawberries",
      category: "Fresh Fruits",
      price: 3.99,
      oldPrice: 5.99,
      image: "https://picsum.photos/seed/strawberry/400/500",
      rating: 5
    },
    {
      id: 2,
      name: "Organic Avocados",
      category: "Fresh Fruits",
      price: 4.99,
      oldPrice: 6.99,
      image: "https://picsum.photos/seed/avocado/400/500",
      rating: 4
    },
    {
      id: 3,
      name: "Fresh Oranges",
      category: "Fresh Fruits",
      price: 2.99,
      oldPrice: 4.99,
      image: "https://picsum.photos/seed/orange/400/500",
      rating: 5
    },
    {
      id: 4,
      name: "Fresh Grapes",
      category: "Fresh Fruits",
      price: 3.49,
      oldPrice: 5.49,
      image: "https://picsum.photos/seed/grapes/400/500",
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#252B42] mb-4">Featured Products</h2>
            <p className="text-[#737373]">Problems trying to resolve the conflict between</p>
          </div>
          <button className="px-10 py-4 border-2 border-[#23856D] text-[#23856D] font-bold rounded-md hover:bg-[#23856D] hover:text-white transition-colors">
            LOAD MORE PRODUCTS
          </button>
        </div>

        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#23856D] hover:text-white z-10">
            <ChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white">
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
                
                <div className="mt-4 text-center p-4">
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

          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#23856D] hover:text-white z-10">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;
