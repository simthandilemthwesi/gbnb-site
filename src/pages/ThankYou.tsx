import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const form = params.get('form');

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const titles: Record<string, string> = {
    volunteer: "Thank You for Volunteering!",
    donation: "Thank You for Your Donation!",
    contact: "Thank You for Contacting Us!",
    photo: "Thank You for Your Photos!"
  };

  const title = (form && titles[form]) || "Thank You!";

  return (
    <>
      <Helmet>
        <title>Thank You | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-soft p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-600 mb-8">
            We have received your submission and will get back to you shortly. A confirmation has been sent to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-900 transition-colors">
              Back to Home
            </Link>
            <Link to="/get-involved" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
