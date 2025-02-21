import React from 'react';

const About = () => {
  return (
    <main className="flex-grow">
      <div className="bg-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#252B42] mb-4 lg:mb-6">ABOUT US</h1>
              <p className="text-base lg:text-xl text-gray-600 mb-8">
                We know how large objects will act, but things on a small scale.
              </p>
              <button className="bg-[#23A6F0] text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors mb-8 lg:mb-0">
                Explore More
              </button>
            </div>
            <div className="relative">
              <img
                loading="lazy"
                alt="Shopping woman"
                className="w-full h-auto rounded-lg"
                width="800"
                height="600"
                src="https://picsum.photos/800/600?random=1"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#252B42] mb-2">15K</div>
                <div className="text-sm lg:text-base text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#252B42] mb-2">150K</div>
                <div className="text-sm lg:text-base text-gray-600">Monthly Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#252B42] mb-2">15</div>
                <div className="text-sm lg:text-base text-gray-600">Countries Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#252B42] mb-2">100+</div>
                <div className="text-sm lg:text-base text-gray-600">Top Partners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="relative rounded-lg overflow-hidden">
            <img
              loading="lazy"
              alt="Video thumbnail"
              className="w-full h-auto"
              width="1200"
              height="600"
              src="https://picsum.photos/1200/600?random=2"
            />
            <button className="absolute inset-0 m-auto w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42]">Meet Our Team</h2>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center space-y-8 lg:space-y-0">
            <div className="flex flex-col items-center w-full lg:w-auto">
              <div className="mb-4 lg:mb-5 relative w-full max-w-[300px] aspect-square overflow-hidden rounded-lg">
                <img
                  loading="lazy"
                  alt="Gökhan Özdemir"
                  className="w-full h-full object-cover"
                  width="300"
                  height="300"
                  src="/images/gokhan.jpeg"
                />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-[#252B42] mb-1">Gökhan Özdemir</h3>
              <p className="text-sm lg:text-base text-blue-600 mb-3 lg:mb-4">Project Manager</p>
              <div className="flex justify-center gap-4">
                <SocialLink href="https://github.com/gokhanozdemir" icon={<GitHubIcon />} />
                <SocialLink href="https://www.linkedin.com/in/gnozdemir/" icon={<LinkedInIcon />} />
                <SocialLink href="mailto:gn.ozdemir@gmail.com" icon={<EmailIcon />} />
              </div>
            </div>
            <div className="flex flex-col items-center w-full lg:w-auto">
              <div className="mb-4 lg:mb-5 relative w-full max-w-[300px] aspect-square overflow-hidden rounded-lg">
                <img
                  loading="lazy"
                  alt="Atabey Aykut"
                  className="w-full h-full object-cover"
                  width="300"
                  height="300"
                  src="/images/ata.jpg"
                />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-[#252B42] mb-1">Atabey Aykut</h3>
              <p className="text-sm lg:text-base text-blue-600 mb-3 lg:mb-4">Frontend Developer</p>
              <div className="flex justify-center gap-4">
                <SocialLink href="https://github.com/atabeyaykut" icon={<GitHubIcon />} />
                <SocialLink href="https://www.linkedin.com/in/atabeyaykut/" icon={<LinkedInIcon />} />
                <SocialLink href="mailto:atabeyaykutt@gmail.com" icon={<EmailIcon />} />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-gray-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42] mb-4">Big Companies Are Here</h2>
              <p className="text-sm lg:text-base text-gray-600">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {['Hooli', 'Lyft', 'Stripe', 'AWS', 'Reddit'].map((company) => (
                <img
                  key={company}
                  loading="lazy"
                  alt={company}
                  className="h-8 lg:h-10 w-auto grayscale hover:grayscale-0 transition-all"
                  width="120"
                  height="40"
                  src={`https://placehold.co/200x80/23A6F0/FFFFFF.svg?text=${company}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#23A6F0] text-white p-8 lg:p-16">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Now Let's grow Yours</h2>
              <p className="text-sm lg:text-base mb-6 lg:mb-8">
                The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
              </p>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#23A6F0] transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-auto">
            <img
              loading="lazy"
              alt="Growth illustration"
              className="w-full h-full object-cover"
              width="800"
              height="600"
              src="https://picsum.photos/800/600?random=3"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

// Social Icons Components
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SocialLink = ({ href, icon }) => (
  <a href={href} className="text-[#23A6F0] hover:text-blue-700">
    {icon}
  </a>
);

export default About;
