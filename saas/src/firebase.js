// Firebase initialization with placeholder config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCA-tckQLIZ5H60EuNUXKHca_TOX8YYS2g",
  authDomain: "saas-2a430.firebaseapp.com",
  projectId: "saas-2a430",
  storageBucket: "saas-2a430.firebasestorage.app",
  messagingSenderId: "692161508243",
  appId: "1:692161508243:web:2a14443dd58b9dd3f66e66",
  measurementId: "G-GRDZ8HV1XH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
