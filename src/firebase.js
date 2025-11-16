// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq5DIkc9QMIYMhPHrT-O748-a3O7G6h4A",
  authDomain: "frontend-project-c3a3e.firebaseapp.com",
  projectId: "frontend-project-c3a3e",
  storageBucket: "frontend-project-c3a3e.firebasestorage.app",
  messagingSenderId: "254852311028",
  appId: "1:254852311028:web:c15739f21ebc1493303ba1",
  measurementId: "G-HVMWP9SH2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);