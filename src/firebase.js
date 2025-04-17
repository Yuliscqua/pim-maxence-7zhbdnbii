// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACBO8dceV2bIZFLuE4YRUGBBwO3bAykZo",
  authDomain: "indielink-9a72a.firebaseapp.com",
  projectId: "indielink-9a72a",
  storageBucket: "indielink-9a72a.firebasestorage.app",
  messagingSenderId: "953426050503",
  appId: "1:953426050503:web:b697e5f7da6c86faf8ede2",
  measurementId: "G-L28VF21X0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);