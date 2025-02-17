import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('#23A6F0');

  const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4'
  ];

  const colors = [
    { id: 1, color: '#23A6F0' },
    { id: 2, color: '#2DC071' },
    { id: 3, color: '#E77C40' },
    { id: 4, color: '#252B42' }
  ];

  const bestsellerProducts = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    name: 'Graphic Design',
    department: 'English Department',
    oldPrice: 16.48,
    newPrice: 6.48,
    image: `https://picsum.photos/400/400?random=${index + 11}`
  }));

  const brands = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/100/50?random=${index + 1}`
  }));

  return (
    <div className="bg-white">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex justify-start mx-4 mb-8">
          <ol className="flex items-center space-x-2 text-md">
            <li><Link to="/" className="text-gray-600 hover:text-gray-900 font-bold">Home</Link></li>
            <li><span className="text-gray-400 mx-2">›</span></li>
            <li><Link to="/shop" className="text-gray-600 hover:text-gray-900 font-bold">Shop</Link></li>
            <li><span className="text-gray-400 mx-2">›</span></li>
            <li><span className="text-gray-400">Monitor Stand</span></li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
              <img 
                src={images[selectedImage]} 
                alt="Monitor stand"
                className="w-full h-full object-contain"
              />
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-6 cursor-pointer h-6 text-gray-800">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-6 cursor-pointer h-6 text-gray-800">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-24 h-24 bg-gray-100 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Monitor stand ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Monitor stand</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-star ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}>
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">12 Reviews</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">$11.99</div>
            <div className="text-sm text-gray-600">
              Availability: <span className="text-blue-600">In Stock</span>
            </div>
            <p className="text-gray-600 border-b-2 border-gray-300 py-4 pb-8">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM minim non desert Alamo est sit cliquey dolor do met sent.
            </p>
            <div className="flex pt-6 items-center space-x-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.id}
                  className={`w-6 h-6 rounded-full focus:outline-none ${selectedColor === colorOption.color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: colorOption.color }}
                  onClick={() => setSelectedColor(colorOption.color)}
                />
              ))}
            </div>
            <div className="flex space-x-3 max-w-sm pt-2">
              <button className="flex-1 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
                Select Options
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  selectedTab === 'description'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab('description')}
              >
                Description
              </button>
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  selectedTab === 'additional'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab('additional')}
              >
                Additional Information
              </button>
              <button
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  selectedTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab('reviews')}
              >
                Reviews (0)
              </button>
            </nav>
          </div>

          {/* Description Content */}
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="aspect-w-4 aspect-h-4 bg-gray-100">
                  <img
                    alt="Product Description"
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/400/400?random=5"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
                <p className="text-gray-600 mb-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
                <p className="text-gray-600 mb-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
                <p className="text-gray-600">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-4 bg-gray-300" />
                        <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-4 bg-gray-300" />
                        <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bestseller Products */}
          <div className="py-16">
            <h2 className="text-2xl font-bold mb-8">BESTSELLER PRODUCTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bestsellerProducts.map((product) => (
                <div key={product.id} className="group">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-w-1 aspect-h-1 mb-4">
                      <img
                        alt={`Product ${product.id}`}
                        className="w-full h-full object-cover"
                        src={product.image}
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.department}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 line-through">${product.oldPrice}</span>
                        <span className="text-green-500 font-medium">${product.newPrice}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between space-x-4 items-center">
            {brands.map((brand) => (
              <div key={brand.id} className="grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  alt={`Brand ${brand.id}`}
                  className="h-40 w-auto object-contain"
                  src={brand.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
