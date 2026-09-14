import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Johannesburg',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/get-involved', label: 'Get Involved' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Admin Login' },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/bakhanyiselwa_logo.png"
                alt="George Bakhanyiselwa Nguwe Bawo NPC"
                className="h-16 w-auto"
              />
            </Link>
            <h3 className="font-serif text-lg font-bold mb-3">
              George Bakhanyiselwa<br/>Nguwe Bawo NPC
            </h3>
            <p className="text-accent-300 italic text-sm mb-2">
              "Yizani Sakhe Udonga Lwe Jerusalem"
            </p>
            <p className="text-sm text-accent-200">
              Guided by Faith, United in Purpose
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-accent-200 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm text-accent-200">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Thembalethu, George, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.3.3 2.5.8 3.6L4 20l5.8-2.3c1.1.5 2.3.8 3.6.8 4.4 0 8-3.6 8-8z"/>
                </svg>
                <span>+27 785 78 6134</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info.gbnb@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <span>bakhanyiselwa.web.app</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-200 text-sm mr-1">Follow us</span>
                <a href="https://www.facebook.com/GeorgeBakhanyiselwaNguweBawo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114 5.7h2v2.6h-1.2c-.7 0-1.3.5-1.3 1.2V12H16l-.5 3h-2v7A10 10 0 0022 12z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@georgebakhanyiselwanguwe" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M21 8.5a6.5 6.5 0 01-3.6-1.1v6.9a5.2 5.2 0 11-4.4-5.1v2.2a3 3 0 102.6 3V2h2.2a6.5 6.5 0 003.2 3v3.5z"/></svg>
                </a>
                <a href="https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M23 12s0-3.3-.4-4.9a2 2 0 00-1.4-1.4C19.6 5.3 12 5.3 12 5.3s-7.6 0-9.2.4A2 2 0 001.4 7.1C1 8.7 1 12 1 12s0 3.3.4 4.9a2 2 0 001.4 1.4c1.6.4 9.2.4 9.2.4s7.6 0 9.2-.4a2 2 0 001.4-1.4c.4-1.6.4-4.9.4-4.9zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Find Us</h4>
            <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26460.120963931447!2d22.465975350863285!3d-34.00498623314573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dd61ba793ee65e7%3A0x2a24fac2e495bb46!2sThembalethu%2C%20George%2C%206529!5e0!3m2!1sen!2sza!4v1776775253698!5m2!1sen!2sza" 
                width="100%" 
                height="150" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
            </div>
            <p className="text-sm text-accent-200 mb-4">
              Visit us in Thembalethu, George
            </p>
          </div>

          
        </div>

        <div className="border-t border-primary-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-accent-300">
              &copy; 2023 - {currentYear} George Bakhanyiselwa Nguwe Bawo NPC. All rights reserved.{' '}
              <Link to="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link>{' '}
              <span className="font-medium text-white ml-1">CAT {currentTime}</span>
            </p>
            <a
              href="https://simthandilemthwesi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-300 hover:text-white transition-colors"
            >
              Designed by <span className="font-semibold text-white">Simthandile Mthwesi</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;