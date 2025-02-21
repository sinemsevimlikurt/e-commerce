import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3x3, List, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const categories = [
  { id: 1, name: 'Tişört', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_tişört.jpg' },
  { id: 2, name: 'Ayakkabı', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_ayakkabı.jpg' },
  { id: 3, name: 'Ceket', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_ceket.jpg' },
  { id: 4, name: 'Elbise', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_elbise.jpg' },
  { id: 5, name: 'Etek', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_etek.jpg' },
  { id: 6, name: 'Gömlek', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_gömlek.jpg' },
  { id: 7, name: 'Kazak', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_kazak.jpg' },
  { id: 8, name: 'Pantalon', image: 'https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_pantalon.jpg' },
];

const products = [
  {
    id: 2,
    name: 'Siyah %100 Pamuk',
    category: 'Graphic Design',
    price: '145.99',
    image: 'https://cdn.dsmcdn.com/ty155/product/media/images/20210806/13/116221695/81629339/1/1_org_zoom.jpg',
    colors: ['rgb(0, 0, 0)', 'rgb(59, 130, 246)', 'rgb(239, 68, 68)', 'rgb(16, 185, 129)']
  },
  {
    id: 3,
    name: 'Beyaz %100 Pamuk',
    category: 'Graphic Design',
    price: '140.99',
    image: 'https://cdn.dsmcdn.com/ty155/product/media/images/20210806/13/116221695/81629339/1/1_org_zoom.jpg',
    colors: ['rgb(0, 0, 0)', 'rgb(59, 130, 246)', 'rgb(239, 68, 68)', 'rgb(16, 185, 129)']
  },
  // Add more products as needed
];

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex-grow">
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/" className="text-gray-500 hover:text-gray-700">
                      Home
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-400 mx-2">›</span>
                  </li>
                  <li>
                    <span className="text-gray-900">Shop</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-9/11 mx-auto px-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md min-h-[220px] min-w-[200px] w-1/2 md:w-1/5"
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-2xl font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-primary">
                <Grid3x3 size={20} />
              </button>
              <button className="p-2 text-gray-500">
                <List size={20} />
              </button>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <div className="w-full md:w-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Default Sorting</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="rating:asc">Rating: Low to High</option>
                <option value="rating:desc">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-gray-100 text-gray-400 cursor-not-allowed text-sm font-medium"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border text-sm font-medium z-10 bg-blue-50 border-blue-500 text-blue-600">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-gray-500 hover:bg-gray-50 text-sm font-medium">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
