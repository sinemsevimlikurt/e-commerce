const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-400">Your trusted grocery delivery service</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@bestshop.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Shop St.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
