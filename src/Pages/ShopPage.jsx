import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = [
    { name: 'CLOTHING', itemCount: 5, image: 'https://picsum.photos/300/400?random=1' },
    { name: 'SHOES', itemCount: 5, image: 'https://picsum.photos/300/400?random=2' },
    { name: 'ACCESSORIES', itemCount: 5, image: 'https://picsum.photos/300/400?random=3' },
    { name: 'BAGS', itemCount: 5, image: 'https://picsum.photos/300/400?random=4' },
    { name: 'JEWELRY', itemCount: 5, image: 'https://picsum.photos/300/400?random=5' }
  ];

  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: 'Graphic Design',
    department: 'English Department',
    price: 16.48,
    oldPrice: 6.48,
    image: `https://picsum.photos/400/500?random=${index + 1}`,
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  }));

  const brands = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/100/50?random=${index + 1}`
  }));

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
              <li><span className="text-gray-400 mx-2">›</span></li>
              <li><span className="text-gray-900">Shop</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-9/11 mx-auto px-4">
        {categories.map((category, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="aspect-[1/1] overflow-hidden h-full w-full">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <h3 className="text-base md:text-xl font-bold">{category.name}</h3>
                <p className="mt-2 text-xs md:text-sm">{category.itemCount} Items</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and View Options */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
          <div className="flex items-center justify-between md:justify-start gap-4">
            <span className="text-sm text-gray-500">Showing all {products.length} results</span>
            <div className="flex items-center gap-2">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'}`}
                onClick={() => setViewMode('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid3x3">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M3 15h18"/>
                  <path d="M9 3v18"/>
                  <path d="M15 3v18"/>
                </svg>
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'}`}
                onClick={() => setViewMode('list')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                  <path d="M3 12h.01"/>
                  <path d="M3 18h.01"/>
                  <path d="M3 6h.01"/>
                  <path d="M8 12h13"/>
                  <path d="M8 18h13"/>
                  <path d="M8 6h13"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4">
            <select 
              className="w-full md:w-auto border rounded-md px-3 py-2 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              Filter
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full">
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'} gap-4 md:gap-6`}>
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className={`${viewMode === 'grid' ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">{product.department}</div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between space-x-4 items-center">
            {brands.map((brand) => (
              <div key={brand.id} className="grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={brand.image}
                  alt={`Brand ${brand.id}`}
                  className="h-40 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r border-gray-300 text-sm md:text-base">
              First
            </button>
            <button className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r border-gray-300 text-sm md:text-base">
              1
            </button>
            <button className="px-4 md:px-6 py-2 bg-blue-500 text-white text-sm md:text-base">
              2
            </button>
            <button className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l border-gray-300 text-sm md:text-base">
              3
            </button>
            <button className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l border-gray-300 text-sm md:text-base">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
