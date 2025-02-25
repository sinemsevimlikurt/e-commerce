import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Heart, ShoppingCart, User, Search, ChevronDown, ChevronRight, X } from 'lucide-react';
import { toggleCart, removeFromCart, updateItemCount } from '../store/slices/cartSlice';

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const cartRef = useRef(null);
  const cartTimeoutRef = useRef(null);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timerRef = useRef(null);

  const handleCartMouseEnter = () => {
    if (cartTimeoutRef.current) {
      clearTimeout(cartTimeoutRef.current);
    }
    setIsCartHovered(true);
  };

  const handleCartMouseLeave = () => {
    cartTimeoutRef.current = setTimeout(() => {
      setIsCartHovered(false);
    }, 300);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleUpdateCount = (productId, newCount) => {
    dispatch(updateItemCount({ productId, count: newCount }));
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.count);
  }, 0);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsShopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCartOpen && !event.target.closest('.cart-dropdown')) {
        dispatch(toggleCart());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, dispatch]);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#23856D] text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-sm">
              <Phone size={16} className="mr-1" />
              (225) 555-0118
            </span>
            <span className="flex items-center text-sm">
              <Mail size={16} className="mr-1" />
              michelle.rivera@example.com
            </span>
          </div>
          <p className="text-sm">Follow Us and get a chance to win 80% off</p>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Follow Us :</span>
            <div className="flex space-x-3">
              <Instagram size={16} className="cursor-pointer" />
              <Youtube size={16} className="cursor-pointer" />
              <Facebook size={16} className="cursor-pointer" />
              <Twitter size={16} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#252B42]">Bandage</Link>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Home</Link>
              <div 
                ref={dropdownRef}
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/shop" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <span>Shop</span>
                  <ChevronDown size={16} />
                </Link>
                {isShopDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 -translate-x-1/3">
                    <div className="p-6">
                      <div className="grid grid-cols-4 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Giyim</h3>
                          <ul className="space-y-3">
                            <li><Link to="/shop/elbise" className="text-gray-600 hover:text-blue-600">Elbise</Link></li>
                            <li><Link to="/shop/tisort" className="text-gray-600 hover:text-blue-600">Tişört</Link></li>
                            <li><Link to="/shop/gomlek" className="text-gray-600 hover:text-blue-600">Gömlek</Link></li>
                            <li><Link to="/shop/kazak" className="text-gray-600 hover:text-blue-600">Kazak</Link></li>
                            <li><Link to="/shop/sweatshirt" className="text-gray-600 hover:text-blue-600">Sweatshirt</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alt Giyim</h3>
                          <ul className="space-y-3">
                            <li><Link to="/shop/pantolon" className="text-gray-600 hover:text-blue-600">Pantolon</Link></li>
                            <li><Link to="/shop/etek" className="text-gray-600 hover:text-blue-600">Etek</Link></li>
                            <li><Link to="/shop/sort" className="text-gray-600 hover:text-blue-600">Şort</Link></li>
                            <li><Link to="/shop/jean" className="text-gray-600 hover:text-blue-600">Jean</Link></li>
                            <li><Link to="/shop/tayt" className="text-gray-600 hover:text-blue-600">Tayt</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dış Giyim</h3>
                          <ul className="space-y-3">
                            <li><Link to="/shop/ceket" className="text-gray-600 hover:text-blue-600">Ceket</Link></li>
                            <li><Link to="/shop/mont" className="text-gray-600 hover:text-blue-600">Mont</Link></li>
                            <li><Link to="/shop/trenchcoat" className="text-gray-600 hover:text-blue-600">Trençkot</Link></li>
                            <li><Link to="/shop/kaban" className="text-gray-600 hover:text-blue-600">Kaban</Link></li>
                            <li><Link to="/shop/yagmurluk" className="text-gray-600 hover:text-blue-600">Yağmurluk</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksesuar</h3>
                          <ul className="space-y-3">
                            <li><Link to="/shop/canta" className="text-gray-600 hover:text-blue-600">Çanta</Link></li>
                            <li><Link to="/shop/ayakkabi" className="text-gray-600 hover:text-blue-600">Ayakkabı</Link></li>
                            <li><Link to="/shop/taki" className="text-gray-600 hover:text-blue-600">Takı</Link></li>
                            <li><Link to="/shop/sapka" className="text-gray-600 hover:text-blue-600">Şapka</Link></li>
                            <li><Link to="/shop/cuzdan" className="text-gray-600 hover:text-blue-600">Cüzdan</Link></li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-4 gap-8">
                          <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Öne Çıkanlar</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <Link to="/shop/new" className="group">
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                  <img src="https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_elbise.jpg" alt="Yeni Gelenler" className="object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <p className="mt-2 text-sm font-medium text-gray-900">Yeni Gelenler</p>
                              </Link>
                              <Link to="/shop/trending" className="group">
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                  <img src="https://workintech-fe-ecommerce.onrender.com/assets/category-img/category_kadın_ceket.jpg" alt="Trend Ürünler" className="object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <p className="mt-2 text-sm font-medium text-gray-900">Trend Ürünler</p>
                              </Link>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kampanyalar</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                              <p className="text-sm text-gray-600 mb-4">Yeni sezon ürünlerinde %20'ye varan indirimler!</p>
                              <Link to="/shop/campaign" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                                Kampanyaları Keşfet
                                <ChevronRight size={16} className="ml-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/about" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">About</Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Contact</Link>
              <Link to="/pages" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Pages</Link>
            </div>
            <div className="flex items-center space-x-6 text-[#23A6F0]">
              <Link to="/login" className="flex items-center text-sm font-medium">
                <User size={16} className="mr-1" />
                Login / Register
              </Link>
              <button className="flex items-center">
                <Search size={16} className="mr-1" />
              </button>
              <div 
                className="relative"
                ref={cartRef}
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
              >
                <Link to="/cart" className="flex items-center">
                  <ShoppingCart size={16} className="mr-1" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                
                {isCartHovered && (
                  <div 
                    className="cart-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                    onMouseEnter={handleCartMouseEnter}
                    onMouseLeave={handleCartMouseLeave}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Sepetim ({cartItems.length})</h3>
                      </div>
                      {cartItems.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-gray-500">Sepetiniz boş</p>
                        </div>
                      ) : (
                        <>
                          <div className="max-h-96 overflow-auto">
                            {cartItems.map((item) => (
                              <div key={item.product.id} className="flex items-center py-4 border-b border-gray-100">
                                <img 
                                  src={item.product.images[0] || 'https://via.placeholder.com/100'} 
                                  alt={item.product.name} 
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="ml-4 flex-grow">
                                  <h4 className="text-sm font-medium">{item.product.name}</h4>
                                  <p className="text-sm text-gray-500">{item.product.price} TL</p>
                                  <div className="flex items-center mt-2">
                                    <button 
                                      onClick={() => handleUpdateCount(item.product.id, Math.max(1, item.count - 1))}
                                      className="text-gray-500 hover:text-gray-700 px-2"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2 text-sm">{item.count}</span>
                                    <button 
                                      onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                                      className="text-gray-500 hover:text-gray-700 px-2"
                                    >
                                      +
                                    </button>
                                    <button 
                                      onClick={() => handleRemoveFromCart(item.product.id)}
                                      className="ml-auto text-red-500 hover:text-red-700"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex justify-between mb-4">
                              <span className="font-medium">Toplam:</span>
                              <span className="font-medium">
                                {cartTotal.toFixed(2)} TL
                              </span>
                            </div>
                            <Link
                              to="/cart"
                              className="block w-full bg-gray-900 text-white text-center py-2 rounded-md hover:bg-gray-800"
                            >
                              Sepete Git
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button className="flex items-center">
                <Heart size={16} className="mr-1" />
                <span className="text-xs">1</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
