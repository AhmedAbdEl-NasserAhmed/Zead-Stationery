// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeNViuT06DR5HqoExuXUhutTo96DmTwME",
  authDomain: "zead-stationery.firebaseapp.com",
  projectId: "zead-stationery",
  storageBucket: "zead-stationery.appspot.com",
  messagingSenderId: "581504857580",
  appId: "1:581504857580:web:61c7aad6705ae08c6b3cc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
