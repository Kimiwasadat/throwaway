
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNptGtdhRXIsnK9ocxTdx5zETO9WZYTaQ",
  authDomain: "flashcardsaas-45bc7.firebaseapp.com",
  projectId: "flashcardsaas-45bc7",
  storageBucket: "flashcardsaas-45bc7.appspot.com",
  messagingSenderId: "21924763642",
  appId: "1:21924763642:web:17bf0ab76e243ae773b643",
  measurementId: "G-83YVHS5D8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };