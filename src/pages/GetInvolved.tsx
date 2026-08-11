import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { notifyAdmin } from '../services/emailService';
import Captcha from '../components/Captcha';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  message: string;
}

interface DonationFormData {
  donorName: string;
  email: string;
  amount: string;
  currency: string;
  message: string;
}

interface PartnershipFormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}

const GetInvolved: React.FC = () => {
  const [volunteerForm, setVolunteerForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    message: ''
  });
  const [donationForm, setDonationForm] = useState<DonationFormData>({
    donorName: '',
    email: '',
    amount: '',
    currency: 'ZAR',
    message: ''
  });
  const [partnershipForm, setPartnershipForm] = useState<PartnershipFormData>({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [volunteerCaptcha, setVolunteerCaptcha] = useState('');
  const [donationCaptcha, setDonationCaptcha] = useState('');
  const [partnershipCaptcha, setPartnershipCaptcha] = useState('');
  const [captchaKeys, setCaptchaKeys] = useState({ volunteer: 0, donation: 0, partnership: 0 });

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setSuccess('Thank you for volunteering! We will be in touch soon.');
      setVolunteerForm({
        fullName: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        message: ''
      });
      setVolunteerCaptcha('');
      setCaptchaKeys((prev) => ({ ...prev, volunteer: prev.volunteer + 1 }));
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        amount: parseFloat(donationForm.amount),
        createdAt: Timestamp.now(),
        status: 'pending'
      });
      
      await notifyAdmin('Donation', donationForm, donationCaptcha);
      setSuccess('Thank you for your generous donation! We will contact you with payment details.');
      setDonationForm({
        donorName: '',
        email: '',
        amount: '',
        currency: 'ZAR',
        message: ''
      });
      setDonationCaptcha('');
      setCaptchaKeys((prev) => ({ ...prev, donation: prev.donation + 1 }));
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePartnershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnershipCaptcha) {
      setError('Please complete the captcha to verify you are human.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'partnerships'), {
        ...partnershipForm,
        createdAt: Timestamp.now(),
        status: 'pending'
      });
      
      await notifyAdmin('Partnership', partnershipForm, partnershipCaptcha);
      setSuccess('Thank you for your partnership interest! We will be in touch soon.');
      setPartnershipForm({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        partnershipType: '',
        message: ''
      });
      setPartnershipCaptcha('');
      setCaptchaKeys((prev) => ({ ...prev, partnership: prev.partnership + 1 }));
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={volunteerForm.fullName}
                  onChange={(e) => setVolunteerForm({...volunteerForm, fullName: e.target.value})}
                  placeholder="Enter your full name"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  required
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                  placeholder="your.email@example.com"
                  className="input"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                  placeholder="+27 XX XXX XXXX"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Skills/Expertise</label>
                <input
                  type="text"
                  value={volunteerForm.skills}
                  onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                  placeholder="e.g., Teaching, Music"
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="label">Availability</label>
              <select
                value={volunteerForm.availability}
                onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                className="input"
              >
                <option value="">Select your availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="label">Message</label>
              <textarea
                rows={4}
                value={volunteerForm.message}
                onChange={(e) => setVolunteerForm({...volunteerForm, message: e.target.value})}
                placeholder="Tell us why you'd like to volunteer..."
                className="input resize-none"
              />
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
            <h3 className="text-xl font-serif font-bold mb-4">Bank Details</h3>
            <div className="space-y-2 text-white/90">
              <p><strong>Bank:</strong> First National Bank (FNB)</p>
              <p><strong>Account Name:</strong> George Bakhanyiselwa Nguwe Bawo NPC</p>
              <p><strong>Account Number:</strong> 6306 4661 490</p>
              <p><strong>Branch Code:</strong> 250655</p>
              <p><strong>Reference:</strong> Your Name / Donation</p>
            </div>
          </div>

          <form onSubmit={handleDonationSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-soft space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Your Name *</label>
                <input
                  type="text"
                  required
                  value={donationForm.donorName}
                  onChange={(e) => setDonationForm({...donationForm, donorName: e.target.value})}
                  placeholder="Enter your name"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  required
                  value={donationForm.email}
                  onChange={(e) => setDonationForm({...donationForm, email: e.target.value})}
                  placeholder="your.email@example.com"
                  className="input"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Amount *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={donationForm.amount}
                  onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                  placeholder="Enter amount"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Currency</label>
                <select
                  value={donationForm.currency}
                  onChange={(e) => setDonationForm({...donationForm, currency: e.target.value})}
                  className="input"
                >
                  <option value="ZAR">ZAR (South African Rand)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Message (Optional)</label>
              <textarea
                rows={3}
                value={donationForm.message}
                onChange={(e) => setDonationForm({...donationForm, message: e.target.value})}
                placeholder="Leave a message with your donation..."
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

          <form onSubmit={handlePartnershipSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-soft space-y-4">
            <div>
              <label className="label">Organization Name *</label>
              <input
                type="text"
                required
                value={partnershipForm.organizationName}
                onChange={(e) => setPartnershipForm({...partnershipForm, organizationName: e.target.value})}
                placeholder="Your organization name"
                className="input"
              />
            </div>
            <div>
              <label className="label">Contact Person *</label>
              <input
                type="text"
                required
                value={partnershipForm.contactPerson}
                onChange={(e) => setPartnershipForm({...partnershipForm, contactPerson: e.target.value})}
                placeholder="Your name"
                className="input"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  required
                  value={partnershipForm.email}
                  onChange={(e) => setPartnershipForm({...partnershipForm, email: e.target.value})}
                  placeholder="contact@organization.com"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  value={partnershipForm.phone}
                  onChange={(e) => setPartnershipForm({...partnershipForm, phone: e.target.value})}
                  placeholder="+27 XX XXX XXXX"
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="label">Partnership Type</label>
              <select
                value={partnershipForm.partnershipType}
                onChange={(e) => setPartnershipForm({...partnershipForm, partnershipType: e.target.value})}
                className="input"
              >
                <option value="">Select partnership type</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="event">Event Partnership</option>
                <option value="program">Program Collaboration</option>
                <option value="media">Media Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea
                rows={4}
                required
                value={partnershipForm.message}
                onChange={(e) => setPartnershipForm({...partnershipForm, message: e.target.value})}
                placeholder="Tell us about your partnership ideas..."
                className="input resize-none"
              />
            </div>
            <div className="flex justify-center">
              <Captcha
                key={captchaKeys.partnership}
                onVerify={(token) => setPartnershipCaptcha(token)}
                onExpire={() => setPartnershipCaptcha('')}
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
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