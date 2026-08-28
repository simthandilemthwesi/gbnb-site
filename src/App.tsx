import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import Admin from './pages/Admin';
import FirebaseSetup from './pages/FirebaseSetup';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Chatbot from './components/Chatbot';
import './index.css';

const BASE_URL = 'https://bakhanyiselwa.web.app';

const SEO_DATA = {
  home: {
    title: 'George Bakhanyiselwa Nguwe Bawo NPC | Faith-Based Nonprofit',
    description: 'George Bakhanyiselwa Nguwe Bawo NPC - Faith-based nonprofit organization. Guided by Faith, United in Purpose. Serving communities through spiritual growth, youth empowerment, and community development in South Africa.',
    keywords: 'George Bakhanyiselwa Nguwe Bawo NPC, faith nonprofit, Christian organization, community development South Africa, youth empowerment, spiritual growth, nonprofit company',
    canonical: BASE_URL,
    type: 'website'
  },
  about: {
    title: 'About Us | George Bakhanyiselwa Nguwe Bawo NPC',
    description: 'Learn about George Bakhanyiselwa Nguwe Bawo NPC\'s mission, vision, and values. Founded on faith principles, we are united in purpose to serve communities through various outreach programs.',
    keywords: 'George Bakhanyiselwa Nguwe Bawo NPC about, nonprofit mission, faith organization, community service, Nguwe Bawo history',
    canonical: `${BASE_URL}/about`,
    type: 'website'
  },
  programs: {
    title: 'Our Programs | George Bakhanyiselwa Nguwe Bawo NPC - Youth, Community & Spiritual Programs',
    description: 'Explore George Bakhanyiselwa Nguwe Bawo NPC\'s programs including Youth Empowerment, Community Development, Spiritual Growth, and Fellowship Gatherings. Join us in building stronger communities.',
    keywords: 'youth empowerment programs, community development, spiritual growth programs, fellowship, GBNB programs',
    canonical: `${BASE_URL}/programs`,
    type: 'website'
  },
  gallery: {
    title: 'Gallery | George Bakhanyiselwa Nguwe Bawo NPC - Our Community in Action',
    description: 'View photos and videos of George Bakhanyiselwa Nguwe Bawo NPC\'s programs, events, and community activities. See our faith-based initiatives in action.',
    keywords: 'GBNB gallery, nonprofit photos, community events, faith activities, fellowship images',
    canonical: `${BASE_URL}/gallery`,
    type: 'website'
  },
  getInvolved: {
    title: 'Get Involved | George Bakhanyiselwa Nguwe Bawo NPC - Volunteer & Donate',
    description: 'Join George Bakhanyiselwa Nguwe Bawo NPC in making a difference. Volunteer your time, make a donation, or participate in our fellowship gatherings. Together we are stronger.',
    keywords: 'volunteer nonprofit, donate to charity, faith volunteering, community involvement, GBNB donate',
    canonical: `${BASE_URL}/get-involved`,
    type: 'website'
  },
  contact: {
    title: 'Contact Us | George Bakhanyiselwa Nguwe Bawo NPC - Get in Touch',
    description: 'Contact George Bakhanyiselwa Nguwe Bawo NPC for inquiries, partnerships, or to learn more about our programs. We welcome your questions and look forward to connecting with you.',
    keywords: 'contact nonprofit, George Bakhanyiselwa Nguwe Bawo NPC email, nonprofit inquiry, faith organization contact',
    canonical: `${BASE_URL}/contact`,
    type: 'website'
  }
};

const DefaultSEO = () => (
  <Helmet>
    <title>{SEO_DATA.home.title}</title>
    <meta name="description" content={SEO_DATA.home.description} />
    <meta name="keywords" content={SEO_DATA.home.keywords} />
    <link rel="canonical" href={SEO_DATA.home.canonical} />
    <meta property="og:title" content={SEO_DATA.home.title} />
    <meta property="og:description" content={SEO_DATA.home.description} />
    <meta property="og:type" content={SEO_DATA.home.type} />
    <meta property="og:url" content={SEO_DATA.home.canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO_DATA.home.title} />
    <meta name="twitter:description" content={SEO_DATA.home.description} />
  </Helmet>
);

const AboutSEO = () => (
  <Helmet>
    <title>{SEO_DATA.about.title}</title>
    <meta name="description" content={SEO_DATA.about.description} />
    <meta name="keywords" content={SEO_DATA.about.keywords} />
    <link rel="canonical" href={SEO_DATA.about.canonical} />
    <meta property="og:title" content={SEO_DATA.about.title} />
    <meta property="og:description" content={SEO_DATA.about.description} />
    <meta property="og:type" content={SEO_DATA.about.type} />
    <meta property="og:url" content={SEO_DATA.about.canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO_DATA.about.title} />
    <meta name="twitter:description" content={SEO_DATA.about.description} />
  </Helmet>
);

const ProgramsSEO = () => (
  <Helmet>
    <title>{SEO_DATA.programs.title}</title>
    <meta name="description" content={SEO_DATA.programs.description} />
    <meta name="keywords" content={SEO_DATA.programs.keywords} />
    <link rel="canonical" href={SEO_DATA.programs.canonical} />
    <meta property="og:title" content={SEO_DATA.programs.title} />
    <meta property="og:description" content={SEO_DATA.programs.description} />
    <meta property="og:type" content={SEO_DATA.programs.type} />
    <meta property="og:url" content={SEO_DATA.programs.canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO_DATA.programs.title} />
    <meta name="twitter:description" content={SEO_DATA.programs.description} />
  </Helmet>
);

const GallerySEO = () => (
  <Helmet>
    <title>{SEO_DATA.gallery.title}</title>
    <meta name="description" content={SEO_DATA.gallery.description} />
    <meta name="keywords" content={SEO_DATA.gallery.keywords} />
    <link rel="canonical" href={SEO_DATA.gallery.canonical} />
    <meta property="og:title" content={SEO_DATA.gallery.title} />
    <meta property="og:description" content={SEO_DATA.gallery.description} />
    <meta property="og:type" content={SEO_DATA.gallery.type} />
    <meta property="og:url" content={SEO_DATA.gallery.canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO_DATA.gallery.title} />
    <meta name="twitter:description" content={SEO_DATA.gallery.description} />
  </Helmet>
);

const GetInvolvedSEO = () => (
  <Helmet>
    <title>{SEO_DATA.getInvolved.title}</title>
    <meta name="description" content={SEO_DATA.getInvolved.description} />
    <meta name="keywords" content={SEO_DATA.getInvolved.keywords} />
    <link rel="canonical" href={SEO_DATA.getInvolved.canonical} />
    <meta property="og:title" content={SEO_DATA.getInvolved.title} />
    <meta property="og:description" content={SEO_DATA.getInvolved.description} />
    <meta property="og:type" content={SEO_DATA.getInvolved.type} />
    <meta property="og:url" content={SEO_DATA.getInvolved.canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO_DATA.getInvolved.title} />
    <meta name="twitter:description" content={SEO_DATA.getInvolved.description} />
  </Helmet>
);

const ContactSEO = () => (
  <Helmet>
    <title>{SEO_DATA.contact.title}</title>
    <meta name="description" content={SEO_DATA.contact.description} />
    <meta name="keywords" content={SEO_DATA.contact.keywords} />
    <link rel="canonical" href={SEO_DATA.contact.canonical} />
    <meta property="og:title" content={SEO_DATA.contact.title} />
    <meta property="og:description" content={SEO_DATA.contact.description} />
    <meta property="og:type" content={SEO_DATA.contact.type} />
    <meta property="og:url" content={SEO_DATA.contact.canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO_DATA.contact.title} />
    <meta name="twitter:description" content={SEO_DATA.contact.description} />
  </Helmet>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<><DefaultSEO /><Home /></>} />
              <Route path="/about" element={<><AboutSEO /><About /></>} />
              <Route path="/programs" element={<><ProgramsSEO /><Programs /></>} />
              <Route path="/gallery" element={<><GallerySEO /><Gallery /></>} />
              <Route path="/get-involved" element={<><GetInvolvedSEO /><GetInvolved /></>} />
              <Route path="/contact" element={<><ContactSEO /><Contact /></>} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <Admin />
                  </AdminProtectedRoute>
                }
              />
              <Route path="/firebase-setup" element={<FirebaseSetup />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
