import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <img 
              src="https://picsum.photos/seed/groceries/800/600" 
              alt="Fresh groceries"
              className="w-full h-[600px] object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1">
            <h5 className="text-[#23856D] font-bold mb-4">SUMMER 2024</h5>
            <h2 className="text-5xl font-bold text-[#252B42] mb-6">Fresh Groceries Delivered to Your Door</h2>
            <p className="text-[#737373] mb-8 text-xl">
              We know how large objects will act, but things on a small scale just do not act that way.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#23856D] flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h6 className="font-bold text-[#252B42] mb-1">Fresh Selection</h6>
                  <p className="text-[#737373]">Hand-picked fresh items from local farms</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#23856D] flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h6 className="font-bold text-[#252B42] mb-1">Fast Delivery</h6>
                  <p className="text-[#737373]">Same-day delivery for orders before 2 PM</p>
                </div>
              </div>
            </div>

            <button className="mt-12 px-10 py-4 bg-[#23856D] text-white font-bold rounded-md hover:bg-[#23856D]/90">
              START SHOPPING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
