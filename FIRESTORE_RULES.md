# Firestore Security Rules

To fix the "Missing or insufficient permissions" errors and enable full functionality, add these rules to your Firebase Console.

## How to Add Rules:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **Firestore Database** in the left menu
4. Click on the **Rules** tab
5. **Replace ALL existing rules** with the rules below
6. Click **Publish**

## Development Rules (Permissive - Use for Testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Site Settings - allow read for all, write for all (for development)
    match /siteSettings/{document=**} {
      allow read, write: if true;
    }

    // Pages - allow read for all, write for all (for development)
    match /pages/{document=**} {
      allow read, write: if true;
    }

    // Sections - allow read for all, write for all (for development)
    match /sections/{document=**} {
      allow read, write: if true;
    }

    // Navigation - allow read for all, write for all (for development)
    match /navigation/{document=**} {
      allow read, write: if true;
    }

    // Testimonials - allow read for all, write for all (for development)
    match /testimonials/{document=**} {
      allow read, write: if true;
    }

    // Form Submissions - allow read/write for all (for development)
    match /formSubmissions/{document=**} {
      allow read, write: if true;
    }

    // Documents - allow read/write for all (for development)
    match /documents/{document=**} {
      allow read, write: if true;
    }

    // Email Settings - allow read/write for all (for development)
    match /emailSettings/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Production Rules (Secure - Use After Setting Up Authentication):

Once you've implemented authentication, switch to these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Site Settings - read for all, write for authenticated users only
    match /siteSettings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Pages - read for all, write for authenticated users only
    match /pages/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Sections - read for all, write for authenticated users only
    match /sections/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Navigation - read for all, write for authenticated users only
    match /navigation/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Testimonials - read for all, write for authenticated users only
    match /testimonials/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Form Submissions - anyone can create, only authenticated users can read/update
    match /formSubmissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // Documents - authenticated users only
    match /documents/{document=**} {
      allow read, write: if request.auth != null;
    }

    // Email Settings - authenticated users only
    match /emailSettings/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Important Notes:

1. **Start with Development Rules**: Use the development rules first to get everything working
2. **Collections Used**: This application uses these Firestore collections:
   - `siteSettings` - Site configuration and theme settings
   - `pages` - Page content and metadata
   - `sections` - Page sections and components
   - `navigation` - Navigation menu items
   - `testimonials` - Customer testimonials
   - `formSubmissions` - Contact form submissions
   - `documents` - Document management
   - `emailSettings` - Email configuration
3. **Switch to Production Rules**: Once authentication is working, switch to the production rules for better security
4. **After Publishing**: It may take a few seconds for the rules to take effect. Refresh your application after publishing.
