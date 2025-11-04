import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Prefer env vars, but fall back to provided project config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCA-tckQLIZ5H60EuNUXKHca_TOX8YYS2g",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "saas-2a430.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "saas-2a430",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "saas-2a430.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "692161508243",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:692161508243:web:2a14443dd58b9dd3f66e66",
  // Optional: analytics
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-GRDZ8HV1XH",
};

// Avoid initializing Firebase on the server during pre-render/build.
let app: FirebaseApp | undefined;

if (typeof window !== "undefined") {
  // Only run in the browser
  app = getApps()[0] || initializeApp(firebaseConfig);
}

// Export services - they'll only be used in the browser anyway due to "use client"
export const auth: Auth = typeof window !== "undefined" && app ? getAuth(app) : (null as unknown as Auth);
export const db: Firestore = typeof window !== "undefined" && app ? getFirestore(app) : (null as unknown as Firestore);
export const storage: FirebaseStorage = typeof window !== "undefined" && app ? getStorage(app) : (null as unknown as FirebaseStorage);