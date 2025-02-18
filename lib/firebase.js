// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhtDJ9lO556xc0d_59TG-Kaaig6pvG-gc",
  authDomain: "seg-forum-1169f.firebaseapp.com",
  projectId: "seg-forum-1169f",
  storageBucket: "seg-forum-1169f.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "726495646928",
  appId: "1:726495646928:web:23e2611196c517ba9e7ad5",
  measurementId: "G-RLEYMHT78Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Prevents analytics error in SSR

// Export Firebase services
export { app, auth, db, analytics };
