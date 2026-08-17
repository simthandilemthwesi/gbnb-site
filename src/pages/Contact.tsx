import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { notifyAdmin } from '../services/emailService';
import Captcha from '../components/Captcha';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setError('Please complete the captcha to verify you are human.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'contact_submissions'), {
        ...formData,
        createdAt: Timestamp.now(),
        status: 'new'
      });
      
      // Send notification
      await notifyAdmin('Contact', formData, captchaToken);
      
      setSuccess('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setCaptchaToken('');
      setCaptchaKey((prev) => prev + 1);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: 'Phone',
      value: '+27 785 78 6134',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      link: 'tel:+27785786134'
    },
    {
      title: 'Email',
      value: 'info.gbnb@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: 'mailto:info.gbnb@gmail.com'
    },
    {
      title: 'Location',
      value: 'Thembalethu, George, South Africa',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: 'https://bakhanyiselwa.web.app'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/bakhanyiselwa',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@bakhanyiselwa',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/27785786134',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Get in touch with George Bakhanyiselwa Nguwe Bawo NPC. We'd love to hear from you." />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/contact" />
        <meta property="og:title" content="Contact Us | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="Get in touch with George Bakhanyiselwa Nguwe Bawo NPC. We'd love to hear from you." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta name="twitter:description" content="Get in touch with George Bakhanyiselwa Nguwe Bawo NPC. We'd love to hear from you." />
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
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/80">We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-600 mb-6">Have questions or want to learn more? Fill out the form and we'll get back to you.</p>

              {success && (
                <div className="p-4 mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                  {success}
                </div>
              )}
              {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help?"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Your message..."
                    className="input resize-none"
                  />
                </div>
                <div className="flex justify-center">
                  <Captcha
                    key={captchaKey}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken('')}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600 mb-6">Reach out to us through any of these channels</p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.title}</p>
                      <p className="font-medium text-gray-900">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp QR */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Scan for WhatsApp</h3>
                <img 
                  src="/qr_code.png" 
                  alt="WhatsApp QR Code" 
                  className="w-32 h-32 mx-auto border-4 border-white rounded-xl"
                />
                <p className="text-center text-gray-500 text-sm mt-4">
                  Or{' '}
                  <a href="https://wa.me/27785786134" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                    click here
                  </a>
                  {' '}to join
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Our Location</h2>
            <p className="text-gray-600">Find us in Thembalethu, George, South Africa</p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-soft">
            <iframe 
              title="Google Maps - George Bakhanyiselwa Nguwe Bawo NPC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105867.6397649245!2d22.355678558741314!3d-33.983189636975446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dd61ad1d896f1bf%3A0x17b84f9af7d3beb3!2sGeorge!5e0!3m2!1sen!2sza!4v1776248473005!5m2!1sen!2sza" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">Located in the beautiful Garden Route region</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or simply learn more, we're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/get-involved" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
            >
              Get Involved
            </Link>
            <Link 
              to="/programs" 
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold rounded-xl transition-all duration-300"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

    </>
  );
};

export default Contact;