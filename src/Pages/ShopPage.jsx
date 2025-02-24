import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Grid3x3, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProducts } from '../store/slices/productSlice';
import ReactPaginate from 'react-paginate';

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
  const itemsPerPage = 8; 

  // Update URL with current filters and pagination
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
    setCurrentPage(1); 
    updateURL({ filter: value, sort, page: 1 });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    setCurrentPage(1); 
    updateURL({ filter, sort: value, page: 1 });
  };

  // Handle page change
  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
    updateURL({ filter, sort, page: newPage });
    window.scrollTo(0, 0);
  };

  const { products, loading, error, totalProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ 
      page: currentPage, 
      itemsPerPage,
      filter,
      sort,
      categoryId 
    }));
  }, [dispatch, currentPage, filter, sort, categoryId]);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading products: {error}
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Get current page's products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination flex justify-center gap-2'}
                activeClassName={'active bg-indigo-600 text-white'}
                pageClassName={'page-item px-3 py-2 rounded-md border hover:bg-gray-50'}
                previousClassName={'page-item px-3 py-2 rounded-md border hover:bg-gray-50'}
                nextClassName={'page-item px-3 py-2 rounded-md border hover:bg-gray-50'}
                breakClassName={'page-item px-3 py-2'}
                disabledClassName={'opacity-50 cursor-not-allowed'}
                forcePage={currentPage - 1}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
