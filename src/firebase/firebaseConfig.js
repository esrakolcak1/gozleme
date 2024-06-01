import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAz0h7Ea_UL3sFZH80SBMenETSYP0awM8A",
  authDomain: "gozleme-cc975.firebaseapp.com",
  databaseURL: "https://gozleme-cc975-default-rtdb.firebaseio.com",
  projectId: "gozleme-cc975",
  storageBucket: "gozleme-cc975.appspot.com",
  messagingSenderId: "565702657746",
  appId: "1:565702657746:web:0280dd69c9f81af0378f0b",
  measurementId: "G-DQLHY5ED02",
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
