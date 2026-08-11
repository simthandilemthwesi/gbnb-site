# Deployment Guide: GBNB NPC Website

This guide provides step-by-step instructions for deploying the GBNB NPC website to Firebase Hosting.

## Prerequisites

Before starting, ensure you have:
1. Node.js 18+ installed
2. Firebase CLI installed: `npm install -g firebase-tools`
3. A Firebase project created at https://console.firebase.google.com
4. All Firebase services enabled (Firestore, Auth, Storage, Functions)

## Step 1: Firebase Project Setup

### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `bakhanyiselwa`
4. Follow the setup wizard
5. Once created, you'll be redirected to the project dashboard

### Enable Firebase Services

In your Firebase Console:

#### 1. Firestore Database
- Go to "Firestore Database" in the sidebar
- Click "Create database"
- Select "Start in production mode"
- Choose a location close to your users
- Click "Enable"

#### 2. Authentication
- Go to "Authentication" in the sidebar
- Click "Get started"
- Enable the following providers:
  - **Google**: Toggle enabled, select project support email
  - **Email/Password**: Toggle enabled, enable "Email link (passwordless sign-in)" if desired

#### 3. Storage
- Go to "Storage" in the sidebar
- Click "Get started"
- Select "Start in production mode"
- Choose the same location as Firestore
- Click "Enable"

#### 4. Hosting (optional, for custom domain)
- Go to "Hosting" in the sidebar
- Click "Get started"
- Follow the instructions (we'll handle this via CLI later)

## Step 2: Project Configuration

### 1. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click the Web icon (`</>`)
4. Register your app with nickname: `GBNB Website`
5. Copy the `firebaseConfig` object

### 2. Create Environment File

Create a file named `.env` in the project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase configuration from step 1.

### 3. Initialize Firebase CLI

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init
```

When prompted, select:
- **Hosting**: Configure and deploy Firebase Hosting sites
- **Functions**: Configure and deploy Cloud Functions
- **Firestore**: Deploy rules and create indexes
- **Storage**: Deploy rules

For each service:
1. Select your Firebase project
2. Accept default options or configure as needed
3. Don't overwrite existing files

### 4. Update Firebase Configuration

The `firebase init` command should have created/updated:
- `firebase.json` - Firebase configuration
- `.firebaserc` - Project aliases
- `firestore.rules` - Database security rules
- `storage.rules` - Storage security rules
- `functions/` - Cloud Functions directory

## Step 3: Security Rules

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### Deploy Storage Rules

```bash
firebase deploy --only storage:rules
```

### Manual Rule Configuration

If you prefer to configure rules manually:

1. Go to Firebase Console > Firestore > Rules
2. Replace with content from `firestore.rules`
3. Click "Publish"

For Storage:
1. Go to Firebase Console > Storage > Rules
2. Replace with content from `storage.rules`
3. Click "Publish"

## Step 4: Database Setup

### Create Collections and Sample Data

You can use the Firebase Console or Firebase CLI to add data.

#### Via Firebase Console:

1. Go to Firestore Database
2. Click "Start collection"
3. Create the following collections with sample data:

**Collection: `programs`**
```json
{
  "id": "1",
  "title": "Faith & Worship Unity",
  "description": "Building spiritual foundations through prayer, worship, and biblical teaching that strengthens individual faith journeys.",
  "icon": "🙏",
  "details": "Weekly worship services, prayer meetings, and Bible study groups",
  "order": 1
}
```

**Collection: `announcements`**
```json
{
  "id": "1",
  "title": "3rd Year Anniversary Celebration",
  "content": "Join us as we celebrate three years of faith, fellowship, and community service.",
  "isActive": true
}
```

#### Via Firebase CLI (Advanced):

```bash
# Import data from a JSON file
firebase firestore:import ./firestore-backup.json
```

## Step 5: Authentication Setup

### Create Admin Users

1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter email and password for admin users

### Configure User Roles

In Firestore, create a `users` collection:

```json
{
  "uid": "user_uid_from_auth",
  "email": "admin@email.com",
  "displayName": "Admin Name",
  "role": "admin",
  "createdAt": timestamp
}
```

## Step 6: Deploy to Firebase

### Option 1: Deploy Everything

```bash
# Build the React app
npm run build

# Deploy to Firebase
firebase deploy
```

This deploys:
- Hosting (built React app)
- Cloud Functions
- Firestore rules
- Storage rules

### Option 2: Deploy Individual Services

```bash
# Deploy hosting only
firebase deploy --only hosting

# Deploy functions only
firebase deploy --only functions

# Deploy rules only
firebase deploy --only firestore:rules,storage:rules
```

### Option 3: Deploy with Preview Channel

```bash
# Create a preview channel
firebase hosting:channel:create preview-1

# Deploy to preview channel
firebase deploy --only hosting --except functions

# View preview
firebase hosting:channel:open preview-1
```

## Step 7: Custom Domain (Optional)

### In Firebase Console:

1. Go to Hosting
2. Click "Add custom domain"
3. Enter your domain: `bakhanyiselwa.web.app` (or custom domain)
4. Follow DNS verification steps:
   - Add TXT record to your DNS
   - Add A record (after TXT verification)
   - Add AAAA record (optional)
5. Wait for SSL certificate to provision (usually 15-30 minutes)

### DNS Configuration:

Add the following records to your DNS provider:

```
Type    Name    Value
TXT     @       firebase-verification=abc123...
A       @       151.101.1.195
AAAA    @       2001:db8::
```

## Step 8: Verify Deployment

### Check Deployment Status

```bash
# View deployment history
firebase hosting:channel:list
```

### Test Your Site

1. Go to your Firebase Hosting URL (usually: `https://your-project.web.app`)
2. Test all pages:
   - [ ] Home page loads correctly
   - [ ] Navigation works
   - [ ] Forms submit data to Firestore
   - [ ] Admin dashboard accessible (if logged in)
3. Test admin functionality:
   - [ ] Login/logout works
   - [ ] CRUD operations on data
   - [ ] Image uploads work

### Monitor

- View hosting analytics in Firebase Console
- Check Firestore usage
- Monitor Cloud Functions logs

## Troubleshooting

### Common Issues

**1. Build fails with TypeScript errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**2. Firebase configuration not found**
- Ensure `.env` file exists with correct values
- Restart development server after creating `.env`

**3. Deployment fails**
```bash
# Check Firebase CLI version
firebase --version

# Update Firebase CLI
npm install -g firebase-tools
```

**4. Authentication not working**
- Verify Authentication providers are enabled
- Check Firestore security rules allow authenticated users

**5. Storage uploads failing**
- Verify Storage security rules
- Check file size is under 10MB
- Ensure file type is allowed

### Firebase Console Links

- **Firestore**: https://console.firebase.google.com/project/your-project/firestore
- **Authentication**: https://console.firebase.google.com/project/your-project/authentication
- **Storage**: https://console.firebase.google.com/project/your-project/storage
- **Hosting**: https://console.firebase.google.com/project/your-project/hosting

## Maintenance

### Regular Tasks

1. **Update dependencies**
```bash
npm update
```

2. **Monitor usage** - Check Firebase Console for usage patterns

3. **Backup data** - Regular Firestore backups recommended

4. **Update security rules** - Review and update as needed

### Performance Optimization

- Enable Firebase Performance Monitoring
- Use CDN for static assets
- Optimize images before upload
- Enable caching headers in hosting config

## Support

For issues:
1. Check Firebase documentation: https://firebase.google.com/docs
2. Check project documentation in README.md
3. Review Firebase status page

## Quick Reference

### Useful Commands

```bash
# Development
npm start              # Start dev server
npm run build          # Build for production

# Firebase
firebase login         # Login to Firebase
firebase init          # Initialize Firebase
firebase deploy        # Deploy everything
firebase emulators:start  # Run local emulators

# Firestore
firebase firestore:export ./backup  # Export data
firebase firestore:import ./backup  # Import data

# Functions
firebase functions:log   # View function logs
firebase functions:shell  # Interactive function testing
```

### File Locations

- **Public assets**: `/public/`
- **Source code**: `/src/`
- **Functions**: `/functions/`
- **Config**: `firebase.json`, `.firebaserc`

### Environment Variables

Development: `.env`
Production: Set in Firebase Console > Project Settings

---

## Congratulations! 🎉

Your GBNB NPC website is now deployed and ready for use!

**Live URL**: https://bakhanyiselwa.web.app

**Admin Dashboard**: https://bakhanyiselwa.web.app/admin

Remember to:
- Keep your `.env` file secure (add to `.gitignore`)
- Regularly update dependencies
- Monitor Firebase usage and costs
- Backup your Firestore data regularly
