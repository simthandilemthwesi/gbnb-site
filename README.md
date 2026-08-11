# George Bakhanyiselwa Nguwe Bawo NPC Website

A production-ready, professional, responsive, faith-based nonprofit website built with React, TypeScript, Firebase, and TailwindCSS.

## 🎯 Project Overview

**Domain**: https://bakhanyiselwa.web.app

This website showcases the GBNB NPC organization, providing information about their faith-based programs, community initiatives, and ways to get involved.

## ✨ Features

### Public Pages
- **Home** - Hero banner with animated elements, dynamic announcements, impact statistics
- **About Us** - Mission & vision, organizational timeline (2023-2026), leadership profiles
- **Programs** - 5 core programs with expandable details and icons
- **Gallery** - Responsive image grid with category filtering
- **Get Involved** - Volunteer sign-up, donation system, partnership inquiries
- **Contact** - Contact form, organization details, Google Maps, QR code display

### Admin Dashboard (Protected)
- Firebase Authentication (Google + Email/Password)
- Role-based access control (Admin, Editor)
- Manage volunteers, contacts, announcements
- Media upload to Firebase Storage
- Real-time data management

## 🛠 Tech Stack

- **Frontend**: React 18.2 + TypeScript
- **Styling**: TailwindCSS 3.3 + Custom CSS
- **Routing**: React Router DOM v6
- **Backend**: Firebase (Firestore, Functions, Storage, Auth)
- **Hosting**: Firebase Hosting
- **SEO**: React Helmet
- **Icons**: Custom SVG + Lucide React (optional)

## 📁 Project Structure

```
gbnb-site/
├── public/                     # Static assets
│   ├── bakhanyiselwa_logo.png
│   ├── bakhanyiselwa_icon.png
│   ├── qr_code.png
│   └── index.html
├── src/
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── GalleryCarousel.tsx
│   │   ├── ContactForm.tsx
│   │   └── QRCodeDisplay.tsx
│   ├── pages/                 # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Programs.tsx
│   │   ├── Gallery.tsx
│   │   ├── GetInvolved.tsx
│   │   ├── Contact.tsx
│   │   └── AdminDashboard.tsx
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx
│   │   └── NotificationContext.tsx
│   ├── services/             # Firebase services
│   │   ├── firebase.ts
│   │   ├── database.ts
│   │   └── storage.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # Entry point
│   └── index.css             # Global styles
├── functions/                 # Firebase Cloud Functions
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── firestore.rules            # Firestore security rules
├── storage.rules              # Storage security rules
├── firebase.json              # Firebase configuration
├── tailwind.config.js        # TailwindCSS configuration
├── postcss.config.js         # PostCSS configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project with enabled services:
  - Firestore
  - Authentication (Google + Email/Password)
  - Storage
  - Functions

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gbnb-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update Firebase configuration**

Edit `.env` with your Firebase credentials:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
# Start development server
npm start

# Run tests (if configured)
npm test

# Build for production
npm run build
```

The app runs at `http://localhost:3000`

## 🔥 Firebase Setup

### 1. Initialize Firebase

```bash
firebase login
firebase init
```

Select:
- Hosting (configure existing directory)
- Functions (TypeScript)
- Firestore (start in production mode)
- Storage

### 2. Configure Firestore Rules

Edit `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Configure Storage Rules

Edit `storage.rules`:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Enable Authentication

In Firebase Console:
1. Go to Authentication > Sign-in method
2. Enable Google
3. Enable Email/Password

### 5. Create Admin User

```bash
firebase functions:shell
```

Or add admin manually in Firestore:
```javascript
// Collection: users
{
  uid: "user_uid",
  email: "admin@email.com",
  displayName: "Admin Name",
  role: "admin",
  createdAt: timestamp
}
```

## 📊 Database Collections

### Firestore Collections

- `volunteers` - Volunteer applications
- `contacts` - Contact form submissions  
- `contact_submissions` - Legacy contact submissions
- `donations` - Donation records
- `partnerships` - Partnership inquiries
- `announcements` - Homepage announcements
- `gallery` - Gallery media items
- `programs` - Program descriptions
- `users` - User profiles & roles

### Sample Data

Create sample programs in Firestore:

```javascript
// Collection: programs
{
  id: "1",
  title: "Faith & Worship Unity",
  description: "Building spiritual foundations...",
  icon: "🙏",
  details: "Weekly worship services...",
  order: 1,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🎨 Design System

### Colors

```css
Primary Blue: #0B3D91
Primary Blue Light: #2c5282  
Primary Blue Dark: #0a2d6b
Secondary Blue: #3182ce
Accent Silver: #C0C0C0
Accent Gold: #d4af37
```

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🔐 Security Features

- Firebase Authentication with Google & Email
- Role-based access control (admin, editor)
- Protected admin routes
- Input validation on all forms
- Firestore security rules
- Storage security rules

## 🌐 Deployment

### Deploy to Firebase

```bash
# Build the app
npm run build

# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy functions only
firebase deploy --only functions
```

### Custom Domain (Optional)

1. In Firebase Console > Hosting
2. Add custom domain
3. Follow DNS verification steps
4. Enable HTTPS

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔍 SEO Optimization

- React Helmet for meta tags
- Open Graph tags for social sharing
- Semantic HTML structure
- Image alt text
- Fast load times
- Mobile-first design

## 📊 Analytics

Integrate Firebase Analytics:
```javascript
import { analytics } from 'firebase/analytics';

// Track events
analytics().logEvent('page_view', {
  page_location: window.location.href,
  page_title: document.title
});
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📝 License

Private - George Bakhanyiselwa Nguwe Bawo NPC

## 📞 Contact

- **Phone**: +27 785 78 6134
- **Email**: info.gbnb@gmail.com
- **Website**: https://bakhanyiselwa.web.app
- **Facebook**: https://facebook.com/bakhanyiselwa
- **TikTok**: https://tiktok.com/@bakhanyiselwa
- **YouTube**: https://youtube.com/@bakhanyiselwa
- **WhatsApp**: https://wa.me/27785786134

## 🙏 Acknowledgments

- Firebase for providing excellent backend services
- React team for the amazing framework
- TailwindCSS for utility-first styling
- All contributors and supporters of GBNB NPC

---

**Built with ❤️ and ☕**
=======
# gbnb-site
"Yizani Sakhe Udonga Lwe Jerusalem"  Guided by Faith, United in Purpose