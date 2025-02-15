import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const FeaturedPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Healthy Eating Tips for a Balanced Diet",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      image: "https://picsum.photos/seed/healthy/400/300",
      date: "April 20, 2024",
      comments: 10,
    },
    {
      id: 2,
      title: "The Benefits of Organic Produce",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      image: "https://picsum.photos/seed/organic/400/300",
      date: "April 18, 2024",
      comments: 8,
    },
    {
      id: 3,
      title: "Seasonal Cooking: Spring Recipes",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      image: "https://picsum.photos/seed/cooking/400/300",
      date: "April 15, 2024",
      comments: 12,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h5 className="text-center text-[#23856D] font-bold mb-4">Practice Advice</h5>
        <h2 className="text-center text-4xl font-bold text-[#252B42] mb-4">Featured Posts</h2>
        <p className="text-center text-[#737373] mb-12">
          Problems trying to resolve the conflict between the two major realms of Classical physics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden group">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#E74040] text-white px-3 py-1 rounded-md text-sm font-bold">
                  New
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-[#737373] mb-4">
                  <span>Google</span>
                  <span>Trending</span>
                  <span>New</span>
                </div>

                <h3 className="text-xl font-bold text-[#252B42] mb-4 group-hover:text-[#23856D]">
                  {post.title}
                </h3>
                
                <p className="text-[#737373] mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-[#737373]">
                    <Calendar size={16} className="mr-2" />
                    {post.date}
                  </div>
                  <div className="text-sm text-[#737373]">
                    {post.comments} comments
                  </div>
                </div>

                <button className="mt-6 flex items-center text-[#23856D] font-bold hover:text-[#23856D]/80">
                  Learn More
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
