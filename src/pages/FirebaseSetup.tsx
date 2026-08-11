import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

const FirebaseSetup: React.FC = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const collections = [
    {
      name: 'contact_submissions',
      sample: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Submission',
        message: 'This is a test contact submission to initialize the collection.',
        createdAt: Timestamp.now(),
        status: 'test'
      }
    },
    {
      name: 'donations',
      sample: {
        donorName: 'Test Donor',
        email: 'test@example.com',
        amount: 100,
        currency: 'ZAR',
        message: 'Test donation to initialize the collection.',
        createdAt: Timestamp.now(),
        status: 'test'
      }
    },
    {
      name: 'partnerships',
      sample: {
        organizationName: 'Test Organization',
        contactPerson: 'Test Contact',
        email: 'test@example.com',
        phone: '+27 123 456 789',
        partnershipType: 'Community',
        message: 'Test partnership to initialize the collection.',
        createdAt: Timestamp.now(),
        status: 'test'
      }
    },
    {
      name: 'announcements',
      sample: {
        title: 'Welcome to GNB NPC',
        content: 'Thank you for visiting our website. This is a test announcement to initialize the collection.',
        isActive: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
    },
    {
      name: 'gallery',
      sample: {
        title: 'Welcome Image',
        imageUrl: '',
        category: 'events',
        uploadedAt: Timestamp.now(),
        type: 'image'
      }
    },
    {
      name: 'programs',
      sample: {
        title: 'Faith & Worship',
        description: 'Building spiritual connections through prayer, worship, and collective faith activities.',
        order: 1,
        createdAt: Timestamp.now()
      }
    },
    {
      name: 'photo_submissions',
      sample: {
        title: 'Test Photo',
        imageUrl: '',
        submittedBy: 'Test User',
        email: 'test@example.com',
        message: 'Test photo submission to initialize the collection.',
        category: 'events',
        uploadedAt: Timestamp.now(),
        type: 'image',
        status: 'pending'
      }
    }
  ];

  const createCollections = async () => {
    setLoading(true);
    setStatus([]);

    for (const col of collections) {
      try {
        await addDoc(collection(db, col.name), col.sample);
        setStatus(prev => [...prev, `✅ ${col.name} created successfully`]);
      } catch (error: any) {
        setStatus(prev => [...prev, `❌ ${col.name}: ${error.message}`]);
      }
    }

    setLoading(false);
  };

  const cleanupTestData = async () => {
    setStatus(prev => [...prev, 'ℹ️ Test data will be automatically deleted from admin dashboard']);
  };

  return (
    <>
      <Helmet>
        <title>Firebase Setup | GNB NPC Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <img src="/bakhanyiselwa_logo.png" alt="GNB" className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Firebase Collections Setup</h1>
              <p className="text-gray-600 mt-2">
                Click the button below to create all required collections in Firestore
              </p>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="font-semibold text-blue-900 mb-2">Collections to Create:</h2>
              <ul className="text-sm text-blue-700 space-y-1">
                {collections.map((col, i) => (
                  <li key={i}>• {col.name}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={createCollections}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Creating Collections...' : 'Create All Collections'}
            </button>

            {status.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="font-semibold text-gray-900 mb-2">Status:</h2>
                <ul className="text-sm space-y-1">
                  {status.map((s, i) => (
                    <li key={i} className={s.includes('✅') ? 'text-green-600' : s.includes('❌') ? 'text-red-600' : 'text-gray-600'}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={cleanupTestData}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              >
                I will delete test data from Admin Dashboard
              </button>
            </div>

            <div className="mt-6 text-center">
              <a href="/admin" className="text-blue-600 hover:text-blue-700 font-medium">
                → Go to Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirebaseSetup;