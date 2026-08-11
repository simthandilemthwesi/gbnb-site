export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  order: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  uploadedAt: Date;
  type: 'image' | 'video';
  videoUrl?: string;
}

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  message: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  message?: string;
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'editor';
  createdAt: Date;
}

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}
