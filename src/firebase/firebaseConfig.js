import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBaDwC5NhXyZ_vna-HPawvvGn9P5s7KmpM",
  authDomain: "gozleme-app.firebaseapp.com",
  projectId: "gozleme-app",
  storageBucket: "gozleme-app.appspot.com",
  messagingSenderId: "46709398572",
  appId: "1:46709398572:web:c73d3fae19aa5984b34589",
  measurementId: "G-TY81TM5034",
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase Authentication nesnesini al
const auth = getAuth(app);

// Firestore nesnesini al
const firestore = getFirestore(app);

// Realtime Database nesnesini al
const db = getDatabase(app);

export { app, auth, firestore, db };
