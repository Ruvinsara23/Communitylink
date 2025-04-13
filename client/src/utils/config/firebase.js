import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey:  "AIzaSyCkSBqj4pn2f0bP4Jfyg5RRQjZmarg9ocU",
  authDomain: "communitylink-ae115.firebaseapp.com",
  projectId: "communitylink-ae115",
  storageBucket: "communitylink-ae115.firebasestorage.app",
  messagingSenderId: "721649901900",
  appId: "1:721649901900:web:fc9452faf8debc1231efe9",
  measurementId: "G-E8EZYHNKZP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const provider= new GoogleAuthProvider();
export default app;
