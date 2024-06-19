// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaK59WwSH5jdycp9rFE-O5aBkDtw37sys",
  authDomain: "proyectojs-ad330.firebaseapp.com",
  projectId: "proyectojs-ad330",
  storageBucket: "proyectojs-ad330.appspot.com",
  messagingSenderId: "153484334786",
  appId: "1:153484334786:web:25cbacd253ea6cbe714d5b",
  measurementId: "G-GRFZHJFH3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc };
