import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Programs: React.FC = () => {
  const highlightPrograms = [
    {
      title: 'Faith & Worship',
      description: 'Building spiritual connections through prayer, worship, and collective faith activities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Coding & Robotics',
      description: 'Programming, robotics, and digital literacy to prepare youth for the future.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Intro to AI',
      description: 'Machine learning fundamentals and real-world AI applications made simple.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a4 4 0 105.656 0l2.829-2.829a4 4 0 00-5.656-5.656l-2.829 2.829" />
        </svg>
      )
    },
    {
      title: 'Generative AI',
      description: 'Create content and art with ChatGPT and AI image generation tools.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Digital Literacy',
      description: 'Essential computer, internet, and online safety skills for all ages.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-1.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )
    },
    {
      title: 'Web Dev',
      description: 'Learn to build websites and web applications with modern tools and frameworks.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-1.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )
    },
    {
      title: 'Psycho-Soul Therapy',
      description: 'Nurturing mental wellness and spiritual healing in a safe, caring space.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      title: 'Community Development',
      description: 'Uplifting communities through education, support, and sustainable outreach initiatives.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2c0-.984-.656-1.858-1.536-1.857m-4.464 1.857A3 3 0 1112 18v4m0 0H7m5 0v4m-4-4h8" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>Programs | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Explore our faith-based programs and initiatives - Faith & Worship, Coding & Robotics, AI, Digital Literacy, Web Dev, and Psycho-Soul Therapy." />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/programs" />
        <meta property="og:title" content="Programs | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="Explore our faith-based programs and initiatives - Faith & Worship, Coding & Robotics, AI, Digital Literacy, Web Dev, and Psycho-Soul Therapy." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programs | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta name="twitter:description" content="Explore our faith-based programs and initiatives - Faith & Worship, Coding & Robotics, AI, Digital Literacy, Web Dev, and Psycho-Soul Therapy." />
      </Helmet>

      {/* Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Programs</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Programs</h1>
          <p className="text-xl text-white/80">Faith-Based Initiatives for Community Transformation</p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">More Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover how we serve our community through faith-based initiatives including coding, robotics, AI, and more</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {highlightPrograms.map((program, index) => (
              <div key={index} className="group bg-primary-700 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="p-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">{program.title}</h3>
                  </div>
                </div>
                <div className="p-6 bg-primary-800">
                  <p className="text-white/90">{program.description}</p>
                  <Link 
                    to="/get-involved" 
                    className="inline-flex items-center gap-2 mt-4 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                  >
                    Get Involved
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '3+', label: 'Years of Service' },
              { number: '100+', label: 'Volunteers' },
              { number: '500+', label: 'Lives Impacted' },
              { number: '7', label: 'Core Programs' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl font-serif font-bold text-primary-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Ready to Get Involved?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join us in making a difference. Whether through volunteering, donating, or participating, your contribution matters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/get-involved" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
            >
              Join Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold rounded-xl transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
