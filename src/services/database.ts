import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Program,
  Volunteer,
  ContactSubmission,
  Announcement,
  GalleryItem,
  Donation,
} from '../types';

export const programsCollection = collection(db, 'programs');
export const volunteersCollection = collection(db, 'volunteers');
export const contactsCollection = collection(db, 'contacts');
export const announcementsCollection = collection(db, 'announcements');
export const galleryCollection = collection(db, 'gallery');
export const donationsCollection = collection(db, 'donations');

// Programs
export const getPrograms = async (): Promise<Program[]> => {
  const q = query(programsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Program));
};

export const getProgram = async (id: string): Promise<Program | null> => {
  const docRef = doc(db, 'programs', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Program) : null;
};

export const createProgram = async (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(programsCollection, {
    ...program,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateProgram = async (id: string, program: Partial<Program>): Promise<void> => {
  const docRef = doc(db, 'programs', id);
  await updateDoc(docRef, {
    ...program,
    updatedAt: Timestamp.now(),
  });
};

export const deleteProgram = async (id: string): Promise<void> => {
  const docRef = doc(db, 'programs', id);
  await deleteDoc(docRef);
};

// Volunteers
export const getVolunteers = async (): Promise<Volunteer[]> => {
  const q = query(volunteersCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Volunteer));
};

export const createVolunteer = async (volunteer: Omit<Volunteer, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(volunteersCollection, {
    ...volunteer,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const deleteVolunteer = async (id: string): Promise<void> => {
  const docRef = doc(db, 'volunteers', id);
  await deleteDoc(docRef);
};

// Contacts
export const getContacts = async (): Promise<ContactSubmission[]> => {
  const q = query(contactsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ContactSubmission));
};

export const createContact = async (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>): Promise<string> => {
  const docRef = await addDoc(contactsCollection, {
    ...contact,
    read: false,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const markContactAsRead = async (id: string): Promise<void> => {
  const docRef = doc(db, 'contacts', id);
  await updateDoc(docRef, { read: true });
};

export const deleteContact = async (id: string): Promise<void> => {
  const docRef = doc(db, 'contacts', id);
  await deleteDoc(docRef);
};

// Announcements
export const getAnnouncements = async (activeOnly = false): Promise<Announcement[]> => {
  let q = query(announcementsCollection, orderBy('createdAt', 'desc'));
  if (activeOnly) {
    q = query(announcementsCollection, where('active', '==', true), orderBy('createdAt', 'desc'));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Announcement));
};

export const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(announcementsCollection, {
    ...announcement,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateAnnouncement = async (id: string, announcement: Partial<Announcement>): Promise<void> => {
  const docRef = doc(db, 'announcements', id);
  await updateDoc(docRef, {
    ...announcement,
    updatedAt: Timestamp.now(),
  });
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const docRef = doc(db, 'announcements', id);
  await deleteDoc(docRef);
};

// Gallery
export const getGalleryItems = async (category?: string): Promise<GalleryItem[]> => {
  let q = query(galleryCollection, orderBy('createdAt', 'desc'));
  if (category) {
    q = query(galleryCollection, where('category', '==', category), orderBy('createdAt', 'desc'));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as GalleryItem));
};

export const createGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(galleryCollection, {
    ...item,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
};

// Donations
export const createDonation = async (donation: Omit<Donation, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(donationsCollection, {
    ...donation,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getDonations = async (): Promise<Donation[]> => {
  const q = query(donationsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Donation));
};
