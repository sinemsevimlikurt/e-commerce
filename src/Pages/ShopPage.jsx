import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const location = useLocation();
  const { gender, categoryName, categoryId } = useParams();
  
  // Get URL search params
  const searchParams = new URLSearchParams(location.search);
  
  const [filter, setFilter] = useState(searchParams.get('filter') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const productsPerPage = 12;

  // Update URL with current filters
  const updateURL = (newParams) => {
    const currentParams = new URLSearchParams(location.search);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    const search = currentParams.toString();
    const newURL = `${location.pathname}${search ? '?' + search : ''}`;
    history.push(newURL);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    updateURL({ filter: value, sort });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    updateURL({ filter, sort: value });
  };

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    // Construct query parameters
    const params = new URLSearchParams();
    if (categoryId) params.append('category', categoryId);
    if (filter) params.append('filter', filter);
    if (sort) params.append('sort', sort);
    
    // Make API request with all parameters
    dispatch(fetchProducts(params.toString()));
  }, [dispatch, categoryId, filter, sort]);

  if (loading) return <LoadingSpinner />;
  
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
              <h1 className="text-3xl font-bold text-gray-900">
                {categoryName ? `${gender} - ${categoryName}` : 'Shop'}
              </h1>
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
                    <Link to="/shop" className="text-gray-500 hover:text-gray-700">
                      Shop
                    </Link>
                  </li>
                  {categoryName && (
                    <>
                      <li>
                        <span className="text-gray-400 mx-2">›</span>
                      </li>
                      <li>
                        <span className="text-gray-900">{categoryName}</span>
                      </li>
                    </>
                  )}
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Filter and Sort Section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Filter products..."
                value={filter}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="w-48">
              <select
                value={sort}
                onChange={handleSortChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Sort by...</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="rating:asc">Rating: Low to High</option>
                <option value="rating:desc">Rating: High to Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
