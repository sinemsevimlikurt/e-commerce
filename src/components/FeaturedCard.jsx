const FeaturedCard = ({ title, subtitle, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-col h-full">
        {/* Text Content */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-2">{subtitle}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors">
            Explore Items
          </p>
        </div>
        
        {/* Image */}
        <div className="mt-auto flex justify-end">
          <img 
            src={image} 
            alt={title} 
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard; 