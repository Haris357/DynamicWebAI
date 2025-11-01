# Updated Firestore Security Rules

Copy and paste these rules into your Firebase Console:

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

    // Admin Credentials - anyone can read (for login verification), only authenticated users can write
    match /adminCredentials/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // User Websites - only the owner can read/write
    match /userWebsites/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // User Chats - only the owner can read/write
    match /userChats/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Key Changes:

1. **Added `adminCredentials` rule** - Allows anyone to read (needed for login), only authenticated users can write
2. **Fixed `userWebsites` rule** - Added `request.auth != null` check
3. **Fixed `userChats` rule** - Added `request.auth != null` check

## How to Update:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules** tab
4. Replace the entire rules with the code above
5. Click **Publish**

The error should be fixed now! 🔥
