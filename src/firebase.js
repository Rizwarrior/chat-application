import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPlvZvJnuB3sb6rLf5oM1JZwDryysBRPw",
  authDomain: "chat-application-13f48.firebaseapp.com",
  projectId: "chat-application-13f48",
  storageBucket: "chat-application-13f48.appspot.com",
  messagingSenderId: "701178012783",
  appId: "1:701178012783:web:a561e9d0945840eea3599a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db= getFirestore(app);