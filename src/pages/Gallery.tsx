import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { collection, getDocs, query, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { notifyAdmin } from '../services/emailService';
import Captcha from '../components/Captcha';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  uploadedAt: Date;
  type: 'image' | 'video';
  videoUrl?: string;
  submittedBy?: string;
  email?: string;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitData, setSubmitData] = useState({ name: '', email: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitFileRef = useRef<HTMLInputElement>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const galleryQuery = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'));
      const snapshot = await getDocs(galleryQuery);
      if (!snapshot.empty) {
        setGalleryItems(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          uploadedAt: doc.data().uploadedAt?.toDate() || new Date()
        })) as GalleryItem[]);
      }
    } catch (error) {
      console.log('Using sample gallery');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'events', label: 'Events' },
    { id: 'worship', label: 'Worship' },
    { id: 'community', label: 'Community' },
    { id: 'youth', label: 'Youth' },
    { id: 'elderly', label: 'Elderly' },
    { id: 'digital', label: 'Digital Ministry' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleAdminUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'gallery'), {
          title: file.name.replace(/\.[^/.]+$/, ''),
          imageUrl: downloadURL,
          category: 'events',
          uploadedAt: Timestamp.now(),
          type: 'image'
        });
      }
      await fetchGalleryItems();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!captchaToken) {
      setSubmitError('Please complete the captcha to verify you are human.');
      return;
    }

    const files = submitFileRef.current?.files;
    if (!files || files.length === 0) {
      setSubmitError('Please select at least one photo to upload');
      return;
    }

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `gallery_submissions/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'photo_submissions'), {
          title: submitData.name || 'Photo Submission',
          imageUrl: downloadURL,
          submittedBy: submitData.name,
          email: submitData.email,
          message: submitData.message,
          category: 'events',
          uploadedAt: Timestamp.now(),
          type: 'image',
          status: 'pending'
        });
      }
      setSubmitSuccess('Thank you! Your photos have been submitted for review.');
      setSubmitData({ name: '', email: '', message: '' });
      if (submitFileRef.current) submitFileRef.current.value = '';
      setShowSubmitForm(false);
      
      // Send email notification
      await notifyAdmin('Photo Submission', submitData, captchaToken);
      setCaptchaToken('');
      setCaptchaKey((prev) => prev + 1);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError('Failed to submit photos. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Gallery | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Explore our photo gallery showcasing events, worship services, and community activities." />
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
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Gallery</h1>
          <p className="text-xl text-white/80">Capturing moments of faith, fellowship, and community</p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">3rd Year Anniversary Celebration</h2>
          <p className="text-white/80">Celebrating three years of faith, fellowship, and service</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-500'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Admin upload */}
          {isAdmin && (
            <div className="text-center mb-8">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAdminUpload}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Images'}
              </button>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gray-200 hover:shadow-medium transition-all duration-300"
                  onClick={() => setSelectedImage(item)}
                >
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-white/70 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center">
              {selectedImage.imageUrl ? (
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              ) : (
                <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              )}
            </div>
            <div className="text-center mt-4">
              <p className="text-white text-xl font-serif font-semibold">{selectedImage.title}</p>
              <p className="text-white/60 capitalize mt-1">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA - Submit Photos */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showSubmitForm ? (
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">Share Your Moments</h2>
              <p className="text-gray-600 mb-6">Have photos from our events? Share them with us!</p>
              <button 
                onClick={() => setShowSubmitForm(true)}
                className="inline-block px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
              >
                Submit Photos
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Submit Your Photos</h2>
                <button 
                  onClick={() => setShowSubmitForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                  {submitSuccess}
                </div>
              )}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {submitError}
                </div>
              )}

              <form onSubmit={handlePhotoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={submitData.name}
                    onChange={(e) => setSubmitData({...submitData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={submitData.email}
                    onChange={(e) => setSubmitData({...submitData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Photos *</label>
                  <input
                    type="file"
                    ref={submitFileRef}
                    accept="image/*"
                    multiple
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    rows={3}
                    value={submitData.message}
                    onChange={(e) => setSubmitData({...submitData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us about these photos..."
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
                  disabled={isUploading}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isUploading ? 'Submitting...' : 'Submit Photos'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

    </>
  );
};

export default Gallery;