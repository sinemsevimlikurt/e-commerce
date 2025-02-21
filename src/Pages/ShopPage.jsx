import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid3x3, List, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProducts } from '../store/slices/productSlice';

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

const ShopPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, total } = useSelector((state) => state.product);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price:asc':
        return a.price - b.price;
      case 'price:desc':
        return b.price - a.price;
      case 'rating:asc':
        return a.rating - b.rating;
      case 'rating:desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-8 px-4">
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
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 size={20} />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewMode('list')}
              >
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
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {currentProducts.length} of {total} products
                {searchQuery && (
                  <span className="ml-2">
                    (Filtered from {products.length} total products)
                  </span>
                )}
              </div>
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                  : 'flex flex-col space-y-6'
              }`}>
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {currentProducts.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No products found matching your search criteria.
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-8 mb-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight size={20} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
