import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: 'Get in touch',
      description: '(480) 555-0103',
      button: 'Submit Request'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      ),
      title: 'Contact Us',
      description: 'example@gmail.com',
      button: 'Submit Request'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Find Us',
      description: '123 Main Street, NY',
      button: 'View Map'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-160 bg-gray-50">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1920/400?random=1"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[40px] font-bold text-[#252B42] mb-4">
            Questions & Answers
          </h1>
          <p className="text-[#737373] text-sm max-w-md mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics.
          </p>
          <button className="mt-6 px-10 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-blue-600 transition-colors">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h6 className="text-[#252B42] font-bold mb-2">VISIT OUR OFFICE</h6>
          <h2 className="text-4xl font-bold text-[#252B42] mb-4">We help small businesses with big ideas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{info.icon}</div>
              <h3 className="text-[#252B42] font-bold text-xl mb-2">{info.title}</h3>
              <p className="text-[#737373] mb-4">{info.description}</p>
              <button className="text-[#23A6F0] font-bold hover:text-blue-700 transition-colors">
                {info.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#252B42] mb-4">Get in touch</h3>
              <p className="text-[#737373]">
                Problems trying to resolve the conflict between the two major realms of Classical physics.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#23A6F0] text-white font-bold py-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
