import React from 'react';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  showCTA?: boolean;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title = 'George Bakhanyiselwa Nguwe Bawo NPC',
  subtitle = '"Yizani Sakhe Udonga Lwe Jerusalem"',
  tagline = 'Guided by Faith, United in Purpose',
  showCTA = true,
}) => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-blue-900 text-white py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/bakhanyiselwa_logo.png"
            alt="George Bakhanyiselwa Nguwe Bawo NPC Logo"
            className="mx-auto mb-8 h-32 w-auto animate-fade-in"
          />

          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-2xl md:text-3xl font-serif italic text-accent mb-4">
            {subtitle}
          </p>

          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {tagline}
          </p>

          {showCTA && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/get-involved"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-accent hover:text-primary transition-all transform hover:scale-105 shadow-lg"
              >
                Join Us
              </Link>
              <Link
                to="/get-involved#donate"
                className="bg-accent text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-lg"
              >
                Donate
              </Link>
              <Link
                to="/about"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
              >
                Learn More
              </Link>
            </div>
          )}

          <div className="mt-12 flex justify-center space-x-6">
            <a
              href="https://facebook.com/bakhanyiselwa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com/@bakhanyiselwa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="TikTok"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59,6.69a4.83,4.83,0,0,1-3.77-4.25V2h-3.45v13.67a2.89,2.89,0,0,1-5.2,1.74,2.89,2.89,0,0,1,2.31-4.64,2.93,2.93,0,0,1,.88.13V9.4a6.84,6.84,0,0,0-1-.05A6.33,6.33,0,0,0,5,20.1a6.34,6.34,0,0,0,10.86-4.43v-7a8.16,8.16,0,0,0,4.77,1.52v-3.4A4.85,4.85,0,0,1,19.59,6.69Z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="YouTube"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.5,3.5,12,3.5,12,3.5s-7.5,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.59,31.59,0,0,0,0,12a31.59,31.59,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14C4.5,20.5,12,20.5,12,20.5s7.5,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.59,31.59,0,0,0,24,12,31.59,31.59,0,0,0,23.5,6.19ZM9.75,15.02V8.98L15.5,12Z" />
              </svg>
            </a>
            <a
              href="https://wa.me/27785786134"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472,14.382c-0.297-0.149-1.758-0.867-2.03-0.967c-0.273-0.099-0.471-0.148-0.67,0.15c-0.197,0.297-0.767,0.966-0.94,1.164c-0.173,0.199-0.347,0.223-0.644,0.075c-0.297-0.15-1.255-0.463-2.39-1.475c-0.883-0.788-1.48-1.761-1.653-2.059c-0.173-0.297-0.018-0.458,0.13-0.606c0.134-0.133,0.298-0.347,0.446-0.52c0.149-0.174,0.198-0.298,0.298-0.498c0.099-0.198,0.05-0.371-0.025-0.52c-0.075-0.149-0.669-1.612-0.916-2.207c-0.242-0.579-0.487-0.5-0.669-0.51c-0.173-0.008-0.371-0.01-0.57-0.01c-0.198,0-0.52,0.074-0.792,0.372c-0.272,0.297-1.04,1.016-1.04,2.479c0,1.462,1.065,2.875,1.213,3.074c0.149,0.198,2.096,3.2,5.077,4.487c0.709,0.306,1.262,0.489,1.694,0.625c0.712,0.227,1.36,0.195,1.871,0.118c0.571-0.085,1.758-0.719,2.006-1.413c0.248-0.694,0.248-1.289,0.173-1.413c-0.074-0.124-0.272-0.198-0.57-0.347m-5.421,7.403h-0.004a9.87,9.87,0,0,1-5.031-1.378l-0.361-0.214l-3.741,0.981l0.008,0.006a9.86,9.86,0,0,1-3.13,1.125a9.82,9.82,0,0,1-2.876-0.533a9.85,9.85,0,0,1-2.875-1.544a9.85,9.85,0,0,1-1.538-2.285a9.89,9.89,0,0,1-.532-2.878a9.87,9.87,0,0,1,1.543-5.285a9.88,9.88,0,0,1,4.42-3.817a9.88,9.88,0,0,1,5.033-1.38a9.87,9.87,0,0,1,5.033,1.378a9.88,9.88,0,0,1,3.13,1.125a9.82,9.82,0,0,1,2.876,0.533a9.85,9.85,0,0,1,1.538,2.285a9.89,9.89,0,0,1,.532,2.878a9.87,9.87,0,0,1-1.543,5.285a9.88,9.88,0,0,1-4.42,3.817m-2.141-14.27a7.26,7.26,0,0,0-5.033,1.378a7.28,7.28,0,0,0-3.13-1.125a7.26,7.26,0,0,0-7.287,7.287a7.26,7.26,0,0,0,1.378,5.033a7.28,7.28,0,0,0-1.125,3.13a7.29,7.29,0,0,0,7.288,7.288a7.27,7.27,0,0,0,5.032-1.378a7.28,7.28,0,0,0,3.13,1.125a7.26,7.26,0,0,0,7.288-7.288a7.27,7.27,0,0,0-1.378-5.033a7.28,7.28,0,0,0,1.125-3.13a7.29,7.29,0,0,0-7.288-7.287" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
