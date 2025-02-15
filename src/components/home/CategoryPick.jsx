import React from 'react';

const CategoryPick = () => {
  const categories = [
    { id: 1, name: 'Fresh Fruits', image: 'https://picsum.photos/seed/fruits/400/300' },
    { id: 2, name: 'Vegetables', image: 'https://picsum.photos/seed/vegetables/400/300' },
    { id: 3, name: 'Meat & Fish', image: 'https://picsum.photos/seed/meat/400/300' },
    { id: 4, name: 'Bakery', image: 'https://picsum.photos/seed/bakery/400/300' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#252B42] mb-12">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="relative group cursor-pointer overflow-hidden rounded-lg">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPick;
