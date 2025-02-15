import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Heart, ShoppingCart, User, Search } from 'lucide-react';

const Header = () => {
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
              <Link to="/shop" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Shop</Link>
              <Link to="/about" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">About</Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Contact</Link>
              <Link to="/pages" className="text-[#737373] hover:text-[#23856D] text-sm font-medium">Pages</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center text-[#23856D] hover:text-[#23856D]/80 text-sm font-medium">
              <User size={16} className="mr-1" />
              Login / Register
            </button>
            <button className="text-[#23856D]">
              <Search size={16} />
            </button>
            <button className="flex items-center text-[#23856D]">
              <ShoppingCart size={16} />
              <span className="ml-1 text-sm">1</span>
            </button>
            <button className="flex items-center text-[#23856D]">
              <Heart size={16} />
              <span className="ml-1 text-sm">1</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
