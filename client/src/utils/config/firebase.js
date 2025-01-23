import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASEAPI,
  authDomain: "communitylink-176f1.firebaseapp.com",
  projectId: "communitylink-176f1",
  storageBucket: "communitylink-176f1.firebasestorage.app",
  messagingSenderId: "938894552751",
  appId: "1:938894552751:web:5b9c087dd873859e17ae5a",
  measurementId: "G-602FR6E74J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const provider= new GoogleAuthProvider();
export default app;
