# Firebase Security Rules (Final - Query Optimized)

To ensure your FinFlow application is secure and functional, you need to apply these security rules in your Firebase Console. These rules are optimized for role-based querying (User vs Contractor).

### Instructions:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Build** > **Firestore Database**.
3. Click on the **Rules** tab at the top.
4. Replace everything in the editor with the code below.
5. Click **Publish**.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: Check if user document exists in contractors collection
    function isContractor() {
      return exists(/databases/$(database)/documents/contractors/$(request.auth.uid));
    }

    // Profiles: Users
    match /users/{userId} {
      // Allow user to read own, or contractor to query/list users assigned to them
      allow read: if request.auth != null && (
        request.auth.uid == userId || 
        isContractor()
      );
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Profiles: Contractors
    match /contractors/{contractorId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == contractorId;
    }

    // Data Collections (Properties, Loans, Transactions, Scenarios)
    match /{collectionName}/{docId} {
      allow read, write: if request.auth != null && (
        // Access if the document belongs to the user
        (resource != null && resource.data.userId == request.auth.uid) || 
        // Access if creating a new document for themselves
        (request.resource != null && request.resource.data.userId == request.auth.uid) ||
        // Access if the user is a contractor
        isContractor()
      );
      
      // Special case for initial creation where resource doesn't exist yet
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### Important: Indexing Requirement
Because the application filters transactions by `userId` and sorts them by `date`, Firestore requires a **Composite Index**. 

If you see an error in the browser console regarding a missing index, **click the link provided in that error message** to automatically create it in the Firebase Console.
