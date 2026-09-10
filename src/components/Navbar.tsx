import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleTranslate from './GoogleTranslate';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/get-involved', label: 'Get Involved' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <img
              src="/bakhanyiselwa_logo.png"
              alt="George Bakhanyiselwa Nguwe Bawo NPC"
              className="h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isScrolled 
                    ? isActive(link.path) 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                    : isActive(link.path)
                      ? 'bg-white/20 text-white' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                } ${isActive(link.path) ? 'font-semibold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            
            {currentUser && isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Dashboard
              </Link>
            )}
            
            {currentUser && isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-gray-600 hover:text-primary-500 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            )}
            <div className="ml-2">
              <GoogleTranslate />
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <GoogleTranslate />
            <button
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/10 text-white'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
           </button>
           </div>
         </div>

        {isOpen && (
          <div className="lg:hidden pb-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg -mx-4 px-4 mt-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {currentUser && isAdmin && (
                <>
                  <Link
                    to="/admin"
                    className="px-4 py-3 rounded-lg font-medium text-sm text-gray-600 hover:text-primary-500 hover:bg-gray-50 transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 transition-all duration-300 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;