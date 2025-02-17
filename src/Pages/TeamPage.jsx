import React from 'react';
import { Link } from 'react-router-dom';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Gökhan Özdemir',
      role: 'Project Manager',
      image: '/images/gokhan.jpeg',
      social: {
        github: 'https://github.com/gokhanozdemir',
        linkedin: 'https://www.linkedin.com/in/gnozdemir/',
        email: 'gn.ozdemir@gmail.com'
      }
    },
    {
      name: 'Sinem Sevimlikurt',
      role: 'Full Stack Developer',
      image: '/images/sinem.jpg',
      social: {
        github: 'https://github.com/sinemsevimlikurt',
        linkedin: 'https://www.linkedin.com/in/sinemsevimlikurt/',
        email: 'sinemsevimli@gmail.com'
      }
    },
    {
      name: 'Atabey Aykut',
      role: 'Frontend Developer',
      image: '/images/ata.jpg',
      social: {
        github: 'https://github.com/atabeyaykut',
        linkedin: 'https://www.linkedin.com/in/atabeyaykut/',
        email: 'atabeyaykutt@gmail.com'
      }
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            WHAT WE DO
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-6">
            Innovation tailored for you
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Team</span>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        <div className="lg:col-span-2 relative h-[400px] lg:h-170">
          <img
            alt="Fashion model"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://picsum.photos/400/500?random=1"
          />
        </div>
        <div className="lg:col-span-2 grid grid-cols-2">
          {[2, 3, 4, 5].map((num) => (
            <div key={num} className="relative h-[200px] lg:h-85">
              <img
                alt="Fashion model"
                className="absolute inset-0 w-full h-full object-cover"
                src={`https://picsum.photos/250/250?random=${num}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#252B42]">Meet Our Team</h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center space-y-12 lg:space-y-0">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center w-full lg:w-auto">
              <div className="mb-5 relative w-full max-w-[300px] aspect-square overflow-hidden rounded-lg">
                <img
                  alt={member.name}
                  className="w-full h-full object-cover"
                  src={member.image}
                />
              </div>
              <h3 className="text-xl font-semibold text-[#252B42] mb-1">{member.name}</h3>
              <p className="text-blue-600 mb-4">{member.role}</p>
              <div className="flex justify-center gap-4">
                <a href={member.social.github} className="text-[#23A6F0] hover:text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href={member.social.linkedin} className="text-[#23A6F0] hover:text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href={`mailto:${member.social.email}`} className="text-[#23A6F0] hover:text-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-[#252B42] mb-4">
          Start your 14 days free trial
        </h2>
        <p className="text-gray-600 mb-8">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
        </p>
        <button className="bg-[#23A6F0] text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
          Try it free now
        </button>
        <div className="flex justify-center gap-6 mt-8">
          {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
            <a key={social} href="#" className="text-[#23A6F0] hover:text-blue-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {social === 'twitter' && (
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                )}
                {social === 'facebook' && (
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                )}
                {social === 'instagram' && (
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                )}
                {social === 'linkedin' && (
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                )}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
