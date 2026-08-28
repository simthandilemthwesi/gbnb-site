import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { notifyAdmin } from '../services/emailService';
import Captcha from '../components/Captcha';

interface VolunteerFormData {
  name: string;
  email: string;
  message: string;
}

interface DonationFormData {
  name: string;
  email: string;
  message: string;
}

interface VolunteerErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface DonationErrors {
  name?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PARTNERSHIP_FORM_URL = 'https://form.jotform.com/262223901730044';

const GetInvolved: React.FC = () => {
  const [volunteerForm, setVolunteerForm] = useState<VolunteerFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [donationForm, setDonationForm] = useState<DonationFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [volunteerCaptcha, setVolunteerCaptcha] = useState('');
  const [donationCaptcha, setDonationCaptcha] = useState('');
  const [captchaKeys, setCaptchaKeys] = useState({ volunteer: 0, donation: 0 });
  const [volunteerErrors, setVolunteerErrors] = useState<VolunteerErrors>({});
  const [donationErrors, setDonationErrors] = useState<DonationErrors>({});

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: VolunteerErrors = {};
    if (!volunteerForm.name.trim()) {
      errors.name = 'Please enter your full name';
    }
    if (!volunteerForm.email.trim()) {
      errors.email = 'Please enter a valid email address';
    } else if (!EMAIL_REGEX.test(volunteerForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!volunteerForm.message.trim()) {
      errors.message = "Please tell us why you'd like to volunteer";
    }
    if (Object.keys(errors).length > 0) {
      setVolunteerErrors(errors);
      return;
    }
    if (!volunteerCaptcha) {
      setError('Please complete the captcha to verify you are human.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'volunteers'), {
        ...volunteerForm,
        createdAt: Timestamp.now(),
        status: 'pending'
      });

      await notifyAdmin('Volunteer', volunteerForm, volunteerCaptcha);
      setSuccess("Thank you for volunteering! We'll be in touch soon.");
      setVolunteerForm({ name: '', email: '', message: '' });
      setVolunteerErrors({});
      setVolunteerCaptcha('');
      setCaptchaKeys((prev) => ({ ...prev, volunteer: prev.volunteer + 1 }));
      setTimeout(() => { window.location.href = '/thank-you?form=volunteer'; }, 1500);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: DonationErrors = {};
    if (!donationForm.name.trim()) {
      errors.name = 'Please enter your name';
    }
    if (!donationForm.email.trim()) {
      errors.email = 'Please enter a valid email address';
    } else if (!EMAIL_REGEX.test(donationForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (Object.keys(errors).length > 0) {
      setDonationErrors(errors);
      return;
    }
    if (!donationCaptcha) {
      setError('Please complete the captcha to verify you are human.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'donations'), {
        ...donationForm,
        createdAt: Timestamp.now(),
        status: 'pending'
      });

      await notifyAdmin('Donation', donationForm, donationCaptcha);
      setSuccess('Thank you for your donation! Your details have been submitted.');
      setDonationForm({ name: '', email: '', message: '' });
      setDonationErrors({});
      setDonationCaptcha('');
      setCaptchaKeys((prev) => ({ ...prev, donation: prev.donation + 1 }));
      setTimeout(() => { window.location.href = '/thank-you?form=donation'; }, 1500);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const involvementOptions = [
    {
      title: 'Volunteer',
      description: 'Share your time and talents to make a difference in our community.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'from-blue-700 to-blue-900',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Donate',
      description: 'Your contributions help us fund programs and support those in need.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Partner',
      description: 'Collaborate with us to amplify our impact and reach more communities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2c0-.984-.656-1.858-1.536-1.857m-4.464 1.857A3 3 0 1112 18v4m0 0H7m5 0v4m-4-4h8" />
        </svg>
      ),
      color: 'from-slate-400 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Get Involved | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Volunteer, donate, or partner with us to make a difference. Join our mission to build faith-centered communities." />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/get-involved" />
        <meta property="og:title" content="Get Involved | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="Volunteer, donate, or partner with us to make a difference. Join our mission to build faith-centered communities." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Involved | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta name="twitter:description" content="Volunteer, donate, or partner with us to make a difference. Join our mission to build faith-centered communities." />
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
            <span className="text-white">Get Involved</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Get Involved</h1>
          <p className="text-xl text-white/80">Join our mission to build faith-centered communities</p>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Ways to Make a Difference</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Your involvement helps us create lasting positive change</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {involvementOptions.map((option, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color}`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Volunteer With Us</h2>
            <p className="text-gray-600">Share your time and talents to serve our community</p>
          </div>

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

          <form onSubmit={handleVolunteerSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-soft space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={volunteerForm.name}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                placeholder="Full Name * Enter your full name"
                className="input"
              />
              {volunteerErrors.name && (
                <span className="text-sm text-red-600 mt-1 block">{volunteerErrors.name}</span>
              )}
            </div>
            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={volunteerForm.email}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                placeholder="Email * your.email@example.com"
                className="input"
              />
              {volunteerErrors.email && (
                <span className="text-sm text-red-600 mt-1 block">{volunteerErrors.email}</span>
              )}
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea
                rows={4}
                name="message"
                required
                value={volunteerForm.message}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                placeholder={'Message * Tell us why you\'d like to volunteer...\n  Write message like this:\n  My name is..., Email..., Skills/Expertise e.g., Teaching, Music\n  Availability e.g., weekdays, weekend, evenings or flexible'}
                className="input resize-none"
              />
              {volunteerErrors.message && (
                <span className="text-sm text-red-600 mt-1 block">{volunteerErrors.message}</span>
              )}
            </div>
            <div className="flex justify-center">
              <Captcha
                key={captchaKeys.volunteer}
                onVerify={(token) => setVolunteerCaptcha(token)}
                onExpire={() => setVolunteerCaptcha('')}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="py-16 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Make a Donation</h2>
            <p className="text-gray-600">Your generous contribution supports our mission</p>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 md:p-8 text-white mb-8">
            <h3 className="text-xl font-serif font-bold mb-4 text-white">Bank Details</h3>
            <div className="space-y-2 text-white">
              <p><strong>Bank:</strong> First National Bank (FNB)</p>
              <p><strong>Account Name:</strong> George Bakhanyiselwa Nguwe Bawo NPC</p>
              <p><strong>Account Number:</strong> 6306 4661 490</p>
              <p><strong>Branch Code:</strong> 250655</p>
              <p><strong>Reference:</strong> Your Name / Donation</p>
            </div>
          </div>

          <form onSubmit={handleDonationSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-soft space-y-4">
            <div>
              <label className="label">Your Name *</label>
              <input
                type="text"
                name="name"
                required
                value={donationForm.name}
                onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                placeholder="Your Name * Enter your name"
                className="input"
              />
              {donationErrors.name && (
                <span className="text-sm text-red-600 mt-1 block">{donationErrors.name}</span>
              )}
            </div>
            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={donationForm.email}
                onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                placeholder="Email * your.email@example.com"
                className="input"
              />
              {donationErrors.email && (
                <span className="text-sm text-red-600 mt-1 block">{donationErrors.email}</span>
              )}
            </div>
            <div>
              <label className="label">Message (Optional)</label>
              <textarea
                rows={3}
                name="message"
                value={donationForm.message}
                onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                placeholder={'Message (Optional)* Leave a message with your donation...\n  (e.g. Hi, Your Full Name, I have donated Currency, Amount Currency)'}
                className="input resize-none"
              />
            </div>
            <div className="flex justify-center">
              <Captcha
                key={captchaKeys.donation}
                onVerify={(token) => setDonationCaptcha(token)}
                onExpire={() => setDonationCaptcha('')}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Donation Details'}
            </button>
          </form>
        </div>
      </section>

      {/* Partnership */}
      <section id="partner" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Partnership Inquiry</h2>
            <p className="text-gray-600">Let's work together to make a greater impact</p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft text-center">
            <p className="text-gray-600 mb-8">
              Please complete our partnership enquiry form below. It takes less than two minutes and our team will get back to you.
            </p>
            <a
              href={PARTNERSHIP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer no-follow"
              className="inline-block px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
            >
              Open Partnership Enquiry Form
            </a>
            <p className="text-sm text-gray-500 mt-6 mb-4">Or scan the QR code below</p>
            <a href={PARTNERSHIP_FORM_URL} rel="no-follow">
              <img
                src="https://www.jotform.com/uploads/infogbnb/form_files/262223901730044_1786455872_qrcode_muse.png"
                width="200"
                height="200"
                className="mx-auto"
                alt="QR Code for GBNB Partnership Enquiry form"
              />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Questions About Getting Involved?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            We're here to help you find the best way to contribute to our mission.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </>
  );
};

export default GetInvolved;
