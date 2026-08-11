import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsQuery = query(collection(db, 'programs'), orderBy('order', 'asc'));
        const snapshot = await getDocs(programsQuery);
        if (!snapshot.empty) {
          const dbPrograms = snapshot.docs.map(doc => doc.data());
          setPrograms(dbPrograms);
        } else {
          setPrograms(defaultPrograms);
        }
      } catch (error) {
        setPrograms(defaultPrograms);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const defaultPrograms = [
    {
      title: 'Faith & Worship Unity',
      description: 'Prayer, worship, and collective faith activities',
      fullDescription: 'Building spiritual connections through prayer, worship, and collective faith activities. Join our fellowship sessions and grow together in faith.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-9-9 9-9m9 9l9-9m-9 9V3" />
        </svg>
      )
    },
    {
      title: 'Community Development',
      description: 'Education, support, and sustainable initiatives',
      fullDescription: 'Making a tangible difference through outreach, charitable work, and community support initiatives.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      title: 'Youth Empowerment',
      description: 'Mentorship and shared experiences',
      fullDescription: 'Bridging generations through mentorship, learning, and shared activities. Building meaningful connections between young and old.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2c0-.984-.656-1.858-1.536-1.857m-4.464 1.857A3 3 0 1112 18v4m0 0H7m5 0v4m-4-4h8" />
        </svg>
      )
    },
    {
      title: 'Digital Ministry',
      description: 'Online fellowship and digital community building',
      fullDescription: 'Reaching the world through technology and online platforms for global fellowship and spiritual growth.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Coding & Robotics',
      description: 'Programming, robotics, and digital literacy',
      fullDescription: 'Empowering youth with essential tech skills. Learn programming, robotics, and digital literacy to prepare for the future.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Introduction to AI',
      description: 'Machine learning fundamentals and AI applications',
      fullDescription: 'Discover the world of Artificial Intelligence. Learn the fundamentals of AI, machine learning, and how AI is changing our world.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a4 4 0 105.656 0l2.829-2.829a4 4 0 00-5.656-5.656l-2.829 2.829" />
        </svg>
      )
    },
    {
      title: 'Generative AI',
      description: 'ChatGPT and AI image generation tools',
      fullDescription: 'Learn to use generative AI tools like ChatGPT and AI image generators. Create content, art, and solutions with cutting-edge technology.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Music & Arts Ministry',
      description: 'Creative worship through music, dance, and drama',
      fullDescription: 'Express your faith through music, dance, drama, and visual arts. Join our creative worship team.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: 'Elderly Care & Support',
      description: 'Visits, assistance, and companionship',
      fullDescription: 'Caring for our elderly community members through visits, assistance, and companionship programs.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      title: 'Food & Relief Programs',
      description: 'Food parcels, meals, and emergency relief',
      fullDescription: 'Providing food parcels, meals, and emergency relief to families in need within our community.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      )
    },
    {
      title: 'Sports & Recreation',
      description: 'Sports events, tournaments, and fitness activities',
      fullDescription: 'Organizing sports events, tournaments, and recreational activities for youth and community fitness.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      )
    },
    {
      title: 'Education & Tutoring',
      description: 'After-school tutoring and homework help',
      fullDescription: 'After-school tutoring, homework help, and educational support for students of all ages.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      title: 'Bible Study & Discipleship',
      description: 'Weekly Bible study, discipleship, and spiritual growth groups',
      fullDescription: 'Growing deeper in faith through weekly Bible study, discipleship groups, and practical application of God\u2019s Word in daily life.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      title: 'Women\u2019s Fellowship',
      description: 'Empowerment, prayer, and support for women',
      fullDescription: 'A sisterhood of faith offering women\u2019s prayer groups, empowerment workshops, and mutual support in every season of life.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: 'Men\u2019s Fellowship',
      description: 'Brotherhood, mentorship, and accountability',
      fullDescription: 'Building godly men through brotherhood, mentorship, prayer breakfasts, and accountability that strengthens families and community.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Counselling & Support',
      description: 'Pastoral care, counselling, and grief support',
      fullDescription: 'Walking alongside those in need through pastoral counselling, grief support, and prayer ministry in a safe and caring environment.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25c0-5.385-4.03-9.75-9-9.75s-9 4.365-9 9.75c0 2.546.915 4.93 2.44 6.787l-.69 2.213 3.126-.782a9.53 9.53 0 004.124.532m7.17-2.5c.432-.71.75-1.498.94-2.332.23-.99.298-2.02.288-3.043m-2.16 2.51l-.482 2.874a9.68 9.68 0 002.64-3.874c-.345 0-.697-.042-1.044-.064" />
        </svg>
      )
    },
    {
      title: 'Children & Sunday School',
      description: 'Bible lessons, crafts, and activities for children',
      fullDescription: 'Nurturing the next generation through fun, faith-filled Sunday school lessons, crafts, and activities that plant seeds of hope.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813 2.846a4.5 4.5 0 00-3.09 3.09L2.25 22.5l2.846-.813a4.5 4.5 0 003.09-3.09l2.846-.813a4.5 4.5 0 003.09-3.09l2.846-.813a4.5 4.5 0 003.09-3.09l2.846-.813M21 9l.813 2.846a4.5 4.5 0 003.09 3.09L27.75 15.75l-2.846.813a4.5 4.5 0 00-3.09 3.09L21 22.5m-9-18.75l.813 2.846a4.5 4.5 0 003.09 3.09L18.75 9l-2.846.813a4.5 4.5 0 00-3.09 3.09L12 15.75" />
        </svg>
      )
    },
    {
      title: 'Environment & Sustainability',
      description: 'Tree planting, clean-ups, and green initiatives',
      fullDescription: 'Caring for God\u2019s creation through tree planting, community clean-ups, recycling drives, and sustainability education.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-3.866 0-7-3.134-7-7 0-4.97 5-10 7-12 2 2 7 7.03 7 12 0 3.866-3.134 7-7 7zm0 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>Programs | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Explore our faith-based programs and initiatives - Faith & Worship, Community Development, Youth & Elderly Engagement, and Digital Ministry." />
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

      {/* Our Programs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore how we serve our community through faith-based initiatives</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Faith & Worship',
                description: 'Building spiritual connections through prayer, worship, and collective faith activities.',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              },
              {
                title: 'Community Development',
                description: 'Empowering communities through education, support, and sustainable initiatives.',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2c0-.984-.656-1.858-1.536-1.857m-4.464 1.857A3 3 0 1112 18v4m0 0H7m5 0v4m-4-4h8'
              },
              {
                title: 'Youth Empowerment',
                description: 'Creating meaningful connections between generations through mentorship.',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
              },
              {
                title: 'Digital Ministry',
                description: 'Extending our reach through technology and digital community building.',
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={program.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </div>
            ))}
          </div>
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
            {programs.map((program, index) => (
              <div key={index} className="group bg-primary-700 rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="p-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      {program.icon || defaultPrograms[index % defaultPrograms.length].icon}
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
              { number: '18', label: 'Core Programs' }
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