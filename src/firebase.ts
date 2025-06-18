// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Din Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBeUORiUc11TbLhKD2UuBqVwNUBR3EMjkE",
  authDomain: "blogg-project-b8fca.firebaseapp.com",
  projectId: "blogg-project-b8fca",
  storageBucket: "blogg-project-b8fca.appspot.com",
  messagingSenderId: "780733801718",
  appId: "1:780733801718:web:ae7657db722dcf9ea678d7",
};

// Initiera Firebase-appen
const app = initializeApp(firebaseConfig);

// Exportera auth och firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

