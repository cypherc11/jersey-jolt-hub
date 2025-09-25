import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCgfjF7RfPb5hYf82dnqyefkWe1NIyq38E",
  authDomain: "jersey-jolt.firebaseapp.com",
  projectId: "jersey-jolt",
  storageBucket: "jersey-jolt.firebasestorage.app",
  messagingSenderId: "1003348389286",
  appId: "1:1003348389286:web:ac86356aa3141eb7e13367",
  measurementId: "G-3ECLTZHYQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
export const db = getFirestore(app);
//export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);