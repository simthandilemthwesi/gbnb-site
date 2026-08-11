import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../contexts/AuthContext';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Admin: React.FC = () => {
  const { currentUser, isAdmin, logout, loginWithGoogle, loginWithEmail } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [photoSubmissions, setPhotoSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      id: 'volunteers',
      label: 'Volunteers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'contacts',
      label: 'Contact Submissions',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    },
    {
      id: 'photoSubmissions',
      label: 'Photo Submissions',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      )
    },
    {
      id: 'programs',
      label: 'Programs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      id: 'donations',
      label: 'Donations',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M8 10h8M8 14h8" />
        </svg>
      )
    },
    {
      id: 'partnerships',
      label: 'Partnerships',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNav]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeNav) {
        case 'volunteers':
          const volunteersQuery = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
          const volunteersSnapshot = await getDocs(volunteersQuery);
          setVolunteers(volunteersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })));
          break;
        case 'contacts':
          const contactsQuery = query(collection(db, 'contact_submissions'), orderBy('createdAt', 'desc'));
          const contactsSnapshot = await getDocs(contactsQuery);
          setContacts(contactsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })));
          break;
        case 'announcements':
          const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
          const announcementsSnapshot = await getDocs(announcementsQuery);
          setAnnouncements(announcementsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })));
          break;
        case 'programs':
          const programsQuery = query(collection(db, 'programs'), orderBy('order', 'asc'));
          const programsSnapshot = await getDocs(programsQuery);
          setPrograms(programsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
          break;
        case 'gallery':
          const galleryQuery = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'));
          const gallerySnapshot = await getDocs(galleryQuery);
          setGalleryItems(gallerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
          break;
        case 'photoSubmissions':
          const submissionsQuery = query(collection(db, 'photo_submissions'), orderBy('uploadedAt', 'desc'));
          const submissionsSnapshot = await getDocs(submissionsQuery);
          setPhotoSubmissions(submissionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
          break;
        case 'donations':
          const donationsQuery = query(collection(db, 'donations'), orderBy('createdAt', 'desc'));
          const donationsSnapshot = await getDocs(donationsQuery);
          setDonations(donationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })));
          break;
        case 'partnerships':
          const partnershipsQuery = query(collection(db, 'partnerships'), orderBy('createdAt', 'desc'));
          const partnershipsSnapshot = await getDocs(partnershipsQuery);
          setPartnerships(partnershipsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })));
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'gallery'), {
          title: file.name.replace(/\.[^/.]+$/, ''),
          imageUrl: downloadURL,
          category,
          uploadedAt: Timestamp.now(),
          type: 'image'
        });
      }
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload files.');
    } finally {
      setUploading(false);
    }
  };

  const updateVolunteerStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'volunteers', id), { status });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'contact_submissions', id), { status });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    try {
      await addDoc(collection(db, 'announcements'), {
        title: newTitle,
        content: newContent,
        isActive: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      setNewTitle('');
      setNewContent('');
      fetchData();
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const renderDashboard = () => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="admin-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>
            {volunteers.length || 0}
          </div>
          <div style={{ color: 'var(--gray-500)' }}>Total Volunteers</div>
        </div>
        <div className="admin-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary-blue)' }}>
            {contacts.length || 0}
          </div>
          <div style={{ color: 'var(--gray-500)' }}>Contact Messages</div>
        </div>
        <div className="admin-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
            {announcements.length || 0}
          </div>
          <div style={{ color: 'var(--gray-500)' }}>Announcements</div>
        </div>
      </div>
      <div className="admin-card">
        <h3 style={{ marginBottom: '1rem' }}>Welcome, {currentUser?.displayName}</h3>
        <p style={{ color: 'var(--gray-600)' }}>
          Use the sidebar to manage volunteers, contact submissions, announcements, gallery, and programs.
        </p>
      </div>
    </div>
  );

  const renderVolunteers = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Volunteer Applications</h3>
      </div>
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : volunteers.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No volunteer applications yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td>{volunteer.fullName}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phone || '-'}</td>
                <td>{volunteer.skills || '-'}</td>
                <td>
                  <span className={`badge badge-${volunteer.status === 'approved' ? 'success' : volunteer.status === 'rejected' ? 'danger' : 'warning'}`}>
                    {volunteer.status || 'pending'}
                  </span>
                </td>
                <td>{volunteer.createdAt?.toLocaleDateString() || '-'}</td>
                <td>
                  <select
                    value={volunteer.status || 'pending'}
                    onChange={(e) => updateVolunteerStatus(volunteer.id, e.target.value)}
                    style={{ marginRight: '0.5rem', padding: '0.25rem' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </select>
                  <button
                    onClick={() => deleteItem('volunteers', volunteer.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--gray-500)', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderContacts = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Contact Form Submissions</h3>
      </div>
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : contacts.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No contact submissions yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject || '-'}</td>
                <td style={{ maxWidth: '200px' }}>{contact.message?.substring(0, 50)}...</td>
                <td>
                  <span className={`badge badge-${contact.status === 'read' ? 'success' : 'warning'}`}>
                    {contact.status || 'unread'}
                  </span>
                </td>
                <td>{contact.createdAt?.toLocaleDateString() || '-'}</td>
                <td>
                  <button
                    onClick={() => updateContactStatus(contact.id, 'read')}
                    style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: 'var(--secondary-blue)', cursor: 'pointer' }}
                  >
                    Mark Read
                  </button>
                  <button
                    onClick={() => deleteItem('contact_submissions', contact.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--gray-500)', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Announcements</h3>
      </div>
      <form onSubmit={handleAddAnnouncement} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '8px' }}>
        <div className="input-group">
          <label>New Announcement Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="input-group">
          <label>Content</label>
          <textarea
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter announcement content"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Announcement</button>
      </form>

      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : announcements.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No announcements yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.title}</td>
                <td style={{ maxWidth: '300px' }}>{announcement.content}</td>
                <td>
                  <span className={`badge badge-${announcement.isActive ? 'success' : 'danger'}`}>
                    {announcement.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={async () => {
                      await updateDoc(doc(db, 'announcements', announcement.id), { isActive: !announcement.isActive });
                      fetchData();
                    }}
                    style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: 'var(--secondary-blue)', cursor: 'pointer' }}
                  >
                    {announcement.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteItem('announcements', announcement.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--gray-500)', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderGallery = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Gallery</h3>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Upload New Images</h4>
        <input
          type="file"
          id="event-upload"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload(e, 'events')}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        <label htmlFor="event-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
          {uploading ? 'Uploading...' : 'Upload Images'}
        </label>
      </div>
      
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : galleryItems.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No gallery images yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {galleryItems.map((item) => (
            <div key={item.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '150px', backgroundColor: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No Image
                </div>
              )}
              <button
                onClick={() => deleteItem('gallery', item.id)}
                style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239,68,68,0.9)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPhotoSubmissions = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Photo Submissions</h3>
      </div>
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : photoSubmissions.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No photo submissions yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {photoSubmissions.map((submission) => (
            <div key={submission.id} style={{ padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {submission.imageUrl && (
                <img src={submission.imageUrl} alt="Submission" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '600' }}>{submission.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                  From: {submission.submittedBy} ({submission.email})
                </p>
                {submission.message && (
                  <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{submission.message}</p>
                )}
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                  Status: {submission.status || 'pending'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {submission.imageUrl && (
                  <a href={submission.imageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>
                    View
                  </a>
                )}
                <button
                  onClick={() => deleteItem('photo_submissions', submission.id)}
                  style={{ padding: '0.5rem', backgroundColor: 'var(--error)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPrograms = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Programs</h3>
      </div>
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : programs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--gray-500)', marginBottom: '1rem' }}>No programs yet. Add your first program!</p>
          <button 
            onClick={() => {
              const title = prompt('Program Title:');
              if (title) {
                const description = prompt('Description:') || '';
                addDoc(collection(db, 'programs'), {
                  title,
                  description,
                  order: programs.length + 1,
                  createdAt: Timestamp.now()
                }).then(() => fetchData());
              }
            }}
            className="btn btn-primary"
          >
            Add Program
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {programs.map((program, index) => (
            <div 
              key={program.id} 
              style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--gray-50)', 
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{program.title}</h4>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>{program.description}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Order: {program.order}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    const newTitle = prompt('Edit Title:', program.title);
                    const newDesc = prompt('Edit Description:', program.description);
                    if (newTitle !== null) {
                      updateDoc(doc(db, 'programs', program.id), {
                        title: newTitle,
                        description: newDesc || program.description
                      }).then(() => fetchData());
                    }
                  }}
                  style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--secondary-blue)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem('programs', program.id)}
                  style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--error)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={() => {
              const title = prompt('New Program Title:');
              if (title) {
                const description = prompt('Description:') || '';
                addDoc(collection(db, 'programs'), {
                  title,
                  description,
                  order: programs.length + 1,
                  createdAt: Timestamp.now()
                }).then(() => fetchData());
              }
            }}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            + Add New Program
          </button>
        </div>
      )}
    </div>
  );

  const renderDonations = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Donations</h3>
      </div>
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : donations.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No donations yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.name || donation.fullName || '-'}</td>
                <td>{donation.email || '-'}</td>
                <td>{donation.amount ? `R${donation.amount}` : '-'}</td>
                <td>{donation.createdAt?.toLocaleDateString() || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderPartnerships = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Partnership Inquiries</h3>
      </div>
      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : partnerships.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem' }}>No partnership inquiries yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {partnerships.map((partner) => (
              <tr key={partner.id}>
                <td>{partner.organization || partner.name || '-'}</td>
                <td>{partner.contactName || '-'}</td>
                <td>{partner.email || '-'}</td>
                <td>{partner.createdAt?.toLocaleDateString() || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return renderDashboard();
      case 'volunteers': return renderVolunteers();
      case 'contacts': return renderContacts();
      case 'announcements': return renderAnnouncements();
      case 'gallery': return renderGallery();
      case 'photoSubmissions': return renderPhotoSubmissions();
      case 'programs': return renderPrograms();
      case 'donations': return renderDonations();
      case 'partnerships': return renderPartnerships();
      default: return renderDashboard();
    }
  };

  if (!currentUser || !isAdmin) {
    return (
      <>
        <Helmet>
          <title>Admin Login | George Bakhanyiselwa Nguwe Bawo NPC</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-md w-full p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <img src="/bakhanyiselwa_logo.png" alt="George Bakhanyiselwa Nguwe Bawo NPC" className="w-24 h-24 mx-auto mb-4 rounded-xl" />
              <h1 className="text-2xl font-serif font-bold text-white">Admin Portal</h1>
              <p className="text-white/70 mt-2">Secure access to dashboard</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => loginWithGoogle()}
                className="w-full py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/50">Or sign in with email</span>
                </div>
              </div>
              
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoginError('');
                  try {
                    await loginWithEmail(loginEmail, loginPassword);
                  } catch (err: any) {
                    setLoginError(err.message || 'Invalid email or password');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-400 text-sm text-center">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | GNB NPC</title>
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
        <div className="admin-layout">
          <aside className="admin-sidebar">
            <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
              <img src="/bakhanyiselwa_logo.png" alt="GNB" style={{ height: '50px' }} />
            </div>
            <nav>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`admin-nav-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--gray-200)', marginTop: 'auto' }}>
              <Link to="/" className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem', display: 'block', textAlign: 'center' }}>
                Back to Site
              </Link>
              <button onClick={logout} className="btn" style={{ width: '100%', backgroundColor: 'var(--gray-100)', color: 'var(--gray-600)' }}>
                Logout
              </button>
            </div>
          </aside>

          <main className="admin-main">
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--gray-800)' }}>
                {navItems.find(n => n.id === activeNav)?.label}
              </h1>
              <p style={{ color: 'var(--gray-500)' }}>
                Logged in as: {currentUser?.email}
              </p>
            </div>
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
}

export default Admin;
