// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "onlinequiz-8ee63.firebaseapp.com",
  projectId: "onlinequiz-8ee63",
  storageBucket: "onlinequiz-8ee63.appspot.com",
  messagingSenderId: "993835842793",
  appId: "1:993835842793:web:42948fc532d066c2218478",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
