const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 mb-2">{product.department}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
          <span className="text-green-600">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
