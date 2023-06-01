// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBU5CcdBgZZrBczIDQbqbF7QSJJCT_fdwg",
  authDomain: "datlichkhambenh-8b0b2.firebaseapp.com",
  projectId: "datlichkhambenh-8b0b2",
  storageBucket: "datlichkhambenh-8b0b2.appspot.com",
  messagingSenderId: "170451686759",
  appId: "1:170451686759:web:dbbe68aec3a20f5b188bc2",
  measurementId: "G-R77XK28D76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db }