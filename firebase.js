// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmonae2RrmtmOStWwO0bl0V1JoBhcgUp8",
  authDomain: "hitchhike-61616.firebaseapp.com",
  projectId: "hitchhike-61616",
  storageBucket: "hitchhike-61616.firebasestorage.app",
  messagingSenderId: "952331734738",
  appId: "1:952331734738:web:023a24d765bcbe436ee70b",
  measurementId: "G-D8MYM281H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
