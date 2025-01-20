// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd5e-nh5bcpDke7RDpumLjTJJfx3ND01U",
  authDomain: "task-management-f21d8.firebaseapp.com",
  projectId: "task-management-f21d8",
  storageBucket: "task-management-f21d8.firebasestorage.app",
  messagingSenderId: "800396598132",
  appId: "1:800396598132:web:a20e34ce3188007a112a21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);