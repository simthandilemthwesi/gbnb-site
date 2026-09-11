import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const About: React.FC = () => {
  const objectives = [
    {
      title: 'Faith',
      description: 'Building spiritual foundations through prayer, worship, and biblical teaching that strengthens individual faith journeys.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-9-9 9-9m9 9l9-9m-9 9V3" />
        </svg>
      )
    },
    {
      title: 'Fellowship',
      description: 'Creating genuine connections through shared experiences, community events, and supportive relationships that uplift and encourage.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2c0-.984-.656-1.858-1.536-1.857m-4.464 1.857A3 3 0 1112 18v4m0 0H7m5 0v4m-4-4h8" />
        </svg>
      )
    },
    {
      title: 'Community Development',
      description: 'Empowering communities through education, skill development, and sustainable initiatives that create lasting positive change.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Digital Ministry',
      description: 'Extending our reach through technology, online platforms, and digital resources to connect with seekers and believers worldwide.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Foundation',
      description: 'George Bakhanyiselwa Nguwe Bawo NPC was officially established, marking the beginning of our journey to build a faith-centered community.'
    },
    {
      year: '2024',
      title: 'Program Launch',
      description: 'We launched our core programs including Faith & Worship Unity, Youth Engagement, and Community Development initiatives.'
    },
    {
      year: '2025',
      title: 'Digital Expansion',
      description: 'Introduction of our Digital Ministry program, bringing fellowship and worship to online communities across borders.'
    },
    {
      year: '2026',
      title: '3rd Year Anniversary',
      description: 'Celebrating three years of impact with the 3rd Year Anniversary Celebration, reflecting on growth and looking toward the future.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Learn about our mission, vision, and the history of George Bakhanyiselwa Nguwe Bawo NPC - a faith-based nonprofit organization." />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/about" />
        <meta property="og:title" content="About Us | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="Learn about our mission, vision, and the history of George Bakhanyiselwa Nguwe Bawo NPC - a faith-based nonprofit organization." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta name="twitter:description" content="Learn about our mission, vision, and the history of George Bakhanyiselwa Nguwe Bawo NPC - a faith-based nonprofit organization." />
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
            <Link to="/" className="text-white hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-white/80 font-serif italic">"Yizani Sakhe Udonga Lwe Jerusalem" - Come and Build the Wall of Jerusalem</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              To build a faith-centered community that empowers individuals through fellowship, worship, and service to one another.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Our Vision</h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              A world where faith bridges divides, communities grow stronger through unity, and every individual finds purpose in the family of God.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Objectives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The pillars that guide our mission and work</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-4">
                  {obj.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{obj.title}</h3>
                <p className="text-gray-600 text-sm">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our History</h2>
            <p className="text-gray-600">From vision to reality - our journey of faith</p>
          </div>
          
          <div className="relative">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 pb-12 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center text-white font-serif font-bold text-lg shrink-0">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary-100 mt-4" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Founder */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Founder</h2>
            <p className="text-gray-600">The vision behind our mission</p>
          </div>

          <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8 md:p-12 text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-primary-500 shadow-lg">
              <img
                src="/images/mrs-mthwesi.jpg"
                alt="Mrs Daniswa Mthwesi, Founder of George Bakhanyiselwa Nguwe Bawo NPC"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Mrs Daniswa Mthwesi</h3>
            <p className="text-primary-500 font-medium mb-6">Founder, George Bakhanyiselwa Nguwe Bawo NPC</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Guided by faith and a deep love for community, Mrs Daniswa Mthwesi founded George Bakhanyiselwa Nguwe Bawo NPC to build faith-centered communities through fellowship, worship, and service to one another.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Together, we can build stronger communities through faith, fellowship, and service. Your involvement makes a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/get-involved" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
            >
              Get Involved
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

export default About;