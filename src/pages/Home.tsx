import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { testimonials } from '../data/testimonials';

const Home: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const bibleVerses = [
    "Nehemiah 2:17 – Come, let us rebuild the wall of Jerusalem, and we will no longer be in disgrace.",
    "Psalm 133:1 – How good and pleasant it is when God's people live together in unity!",
    "Matthew 18:20 – For where two or three gather in my name, there am I with them.",
    "Acts 2:42 – They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.",
    "Isaiah 58:12 – You will be called Repairer of Broken Walls, Restorer of Streets with Dwellings.",
    "John 17:21 – That all of them may be one, Father, just as you are in me and I am in you.",
    "Hebrews 10:24–25 – Let us consider how we may spur one another on toward love and good deeds.",
    "1 Peter 2:5 – You also, like living stones, are being built into a spiritual house to be a holy priesthood.",
    "Ephesians 4:16 – From him the whole body grows and builds itself up in love.",
    "Colossians 3:14 – And over all these virtues put on love, which binds them all together in perfect unity.",
    "Romans 12:5 – So in Christ we, though many, form one body, and each member belongs to all the others.",
    "Galatians 6:2 – Carry each other's burdens, and in this way you will fulfill the law of Christ.",
    "Philippians 2:2 – Make my joy complete by being like‑minded, having the same love, being one in spirit.",
    "1 Corinthians 3:9 – For we are co‑workers in God's service; you are God's field, God's building.",
    "Jeremiah 29:7 – Seek the peace and prosperity of the city... pray to the Lord for it."
  ];
  
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsQuery = query(
          collection(db, 'announcements'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const snapshot = await getDocs(announcementsQuery);
        setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.log('Using default announcements');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % bibleVerses.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [bibleVerses.length]);

  const defaultAnnouncements = [
    {
      title: '3rd Year Anniversary Celebration',
      content: 'Bakhanyiselwa celebrates its third anniversary in February 2026 — three years of faith, fellowship, and community service.',
      date: 'February 2026'
    },
    {
      title: 'Closing the Year in Thundergate',
      content: 'We will be closing the year in October 2026 at Thundergate, Ntabethemba, Komani, Eastern Cape. Join us as we give thanks and reflect on the year.',
      date: 'October 2026'
    },
    {
      title: 'Youth & Elderly Engagement Program',
      content: 'Connecting generations through mentorship, learning, and shared activities.',
      date: '2026'
    },
    {
      title: 'Digital Ministry Expansion',
      content: 'Bringing our message of faith and hope to online communities.',
      date: '2026'
    }
  ];

  const yearsOfService = new Date().getFullYear() - 2023;
  const stats = [
    { number: `${yearsOfService}+`, label: 'Years of Service' },
    { number: '400+', label: 'Volunteers & Memberships' },
    { number: '1000+', label: 'Lives Impacted' },
    { number: '8', label: 'Core Programs' }
  ];

  const programs = [
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
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        setDbTestimonials(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.log('Using default testimonials');
      }
    };
    fetchTestimonials();
  }, []);

  const displayTestimonials = dbTestimonials.length > 0 ? dbTestimonials : testimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  return (
    <>
      <Helmet>
        <title>George Bakhanyiselwa Nguwe Bawo NPC | Guided by Faith, United in Purpose</title>
        <meta name="description" content="George Bakhanyiselwa Nguwe Bawo NPC - Faith-based nonprofit organization. Guided by Faith, United in Purpose. Join us in building community through faith, fellowship, and service in South Africa." />
        <meta property="og:url" content="https://bakhanyiselwa.web.app" />
        <meta property="og:title" content="George Bakhanyiselwa Nguwe Bawo NPC | Guided by Faith, United in Purpose" />
        <meta property="og:description" content="Faith-based nonprofit organization serving communities through spiritual growth, youth empowerment, and community development in South Africa." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="George Bakhanyiselwa Nguwe Bawo NPC | Guided by Faith, United in Purpose" />
        <meta name="twitter:description" content="Faith-based nonprofit organization serving communities through spiritual growth, youth empowerment, and community development in South Africa." />
      </Helmet>

      {/* Hero Section - Stunning & Professional */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        
        {/* Flying Birds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-8 h-8 text-white/30 animate-holy-dove" style={{ top: '15%', left: '-5%' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.6 6.6c-.7-.8-1.9-.7-2.7 0l-1.5 1.4-2.3-2.1c.5-.8.4-1.9-.3-2.5-.8-.7-2-.6-2.7.2L9.5 5.7 7.3 3.5c-.6-.6-1.5-.7-2.2-.3-.7.4-.9 1.2-.5 1.9l2 2.4-1.5 1.4c-.8.8-.8 2.1 0 2.9l2.9 2.9c.4.4.9.6 1.4.6.5 0 1.1-.2 1.4-.6l1.5-1.4 2.3 2.1c-.5.8-.4 1.9.3 2.5.8.7 2 .6 2.7-.2l1.5-1.5 2.2 2.2c.6.6 1.5.7 2.2.3.7-.4.9-1.2.5-1.9l-2-2.4 1.5-1.4c.8-.8.8-2.1 0-2.9L20.6 6.6z"/>
          </svg>
          <svg className="absolute w-6 h-6 text-white/20 animate-holy-dove" style={{ top: '25%', left: '-5%', animationDelay: '3s', animationDuration: '10s' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.6 6.6c-.7-.8-1.9-.7-2.7 0l-1.5 1.4-2.3-2.1c.5-.8.4-1.9-.3-2.5-.8-.7-2-.6-2.7.2L9.5 5.7 7.3 3.5c-.6-.6-1.5-.7-2.2-.3-.7.4-.9 1.2-.5 1.9l2 2.4-1.5 1.4c-.8.8-.8 2.1 0 2.9l2.9 2.9c.4.4.9.6 1.4.6.5 0 1.1-.2 1.4-.6l1.5-1.4 2.3 2.1c-.5.8-.4 1.9.3 2.5.8.7 2 .6 2.7-.2l1.5-1.5 2.2 2.2c.6.6 1.5.7 2.2.3.7-.4.9-1.2.5-1.9l-2-2.4 1.5-1.4c.8-.8.8-2.1 0-2.9L20.6 6.6z"/>
          </svg>
          <svg className="absolute w-10 h-10 text-white/25 animate-holy-dove" style={{ top: '20%', left: '-5%', animationDelay: '6s', animationDuration: '12s' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.6 6.6c-.7-.8-1.9-.7-2.7 0l-1.5 1.4-2.3-2.1c.5-.8.4-1.9-.3-2.5-.8-.7-2-.6-2.7.2L9.5 5.7 7.3 3.5c-.6-.6-1.5-.7-2.2-.3-.7.4-.9 1.2-.5 1.9l2 2.4-1.5 1.4c-.8.8-.8 2.1 0 2.9l2.9 2.9c.4.4.9.6 1.4.6.5 0 1.1-.2 1.4-.6l1.5-1.4 2.3 2.1c-.5.8-.4 1.9.3 2.5.8.7 2 .6 2.7-.2l1.5-1.5 2.2 2.2c.6.6 1.5.7 2.2.3.7-.4.9-1.2.5-1.9l-2-2.4 1.5-1.4c.8-.8.8-2.1 0-2.9L20.6 6.6z"/>
          </svg>
        </div>

        {/* Animated Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-32 h-12 bg-white/5 rounded-full blur-xl animate-cloud" style={{ top: '10%', animationDuration: '30s' }} />
          <div className="absolute w-40 h-16 bg-white/5 rounded-full blur-xl animate-cloud" style={{ top: '20%', animationDelay: '10s', animationDuration: '35s' }} />
          <div className="absolute w-28 h-10 bg-white/5 rounded-full blur-xl animate-cloud" style={{ top: '15%', animationDelay: '5s', animationDuration: '28s' }} />
        </div>

        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              top: '10%',
              left: '-10%',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
              bottom: '-5%',
              right: '-5%',
              animation: 'float 10s ease-in-out infinite reverse'
            }}
          />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />
        
        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          {/* Animated Cross/Video Placeholder - Replace with your video/gif in public folder */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Animated Cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-40 h-40 text-blue-400 animate-pulse drop-shadow-lg" viewBox="0 0 24 36" fill="currentColor">
                <rect x="10" y="0" width="4" height="36" rx="2" />
                <rect x="0" y="12" width="24" height="4" rx="2" />
              </svg>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, transparent 70%)' }} />
            
            {/* 
            TO USE A VIDEO/GIF INSTEAD:
            1. Add your video/gif to public folder (e.g., /public/hero-animation.mp4)
            2. Uncomment below:
            
            <video autoPlay loop muted playsInline className="w-full h-full object-cover rounded-full">
              <source src="/hero-animation.mp4" type="video/mp4" />
            </video>
            
            OR for GIF:
            <img src="/hero-animation.gif" alt="Animation" className="w-full h-full object-contain" />
            */}
          </div>
          
          {/* Logo with Glow Effect */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 blur-xl opacity-30" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)' }} />
            <img 
              src="/bakhanyiselwa_logo.png" 
              alt="George Bakhanyiselwa Nguwe Bawo NPC Logo" 
              className="w-56 h-28 mx-auto object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
            George Bakhanyiselwa
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              Nguwe Bawo NPC
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Building faith-centered communities through fellowship, worship, and service to one another
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
              to="/get-involved" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              Join Us
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Bible Verses Slider - White bg, Blue text */}
      <section className="py-10 bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative min-h-[80px] flex items-center justify-center">
            <p 
              key={currentWord}
              className="text-lg md:text-xl font-serif text-blue-900 font-bold animate-fade-in leading-relaxed px-4"
            >
              "{bibleVerses[currentWord]}"
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {bibleVerses.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentWord(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentWord ? 'bg-blue-600 w-8' : 'bg-blue-200 hover:bg-blue-300'
                }`}
                aria-label={`Verse ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Embed Placeholder */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Watch Our Latest Service</h2>
            <p className="text-blue-600">Experience fellowship and worship with us</p>
          </div>
          <div className="relative w-full max-w-3xl mx-auto" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/IKfv7uCJt1g?si=MrhIqSU72L1Ki-jx"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="text-center text-blue-500 text-sm mt-4">
            <a
              href="https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-blue-700"
            >
              Subscribe to our YouTube channel for more videos
            </a>
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      {!loading && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
              <p className="text-gray-600">Stay updated with our latest news and events</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {(announcements.length > 0 ? announcements : defaultAnnouncements).map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.content}</p>
                  <p className="text-gray-400 text-sm">{item.date || new Date().getFullYear()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore how we serve our community through faith-based initiatives</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={program.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/programs" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
              View All Programs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto md:mx-0 mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-white font-semibold text-lg leading-relaxed">
                To build a faith-centered community that empowers individuals through fellowship, worship, and service to one another.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto md:mx-0 mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-white font-semibold text-lg leading-relaxed">
                A world where faith bridges divides, communities grow stronger through unity, and every individual finds purpose in the family of God.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Learn Our Story
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Testimonials</h2>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <svg className="w-10 h-10 text-blue-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed text-center">
              "{displayTestimonials[currentTestimonial].preview}"
            </p>
            <div className="text-center">
              <Link
                to="/gallery#testimonials"
                className="inline-block font-semibold text-blue-600 hover:text-blue-700 mb-3"
              >
                {displayTestimonials[currentTestimonial].author} — Read more
              </Link>
              <div className="text-gray-500 text-sm">
                {displayTestimonials[currentTestimonial].role}
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Involved Today</h2>
          <p className="text-gray-600 mb-8">Join our community of faith, fellowship, and service</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-involved" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-600/25">
              Volunteer With Us
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;