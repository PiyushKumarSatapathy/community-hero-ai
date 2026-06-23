import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyArlvYlpWXxff850Q4FjFg7qdvkH026oFY",
  authDomain: "community-hero-ai-eb64e.firebaseapp.com",
  projectId: "community-hero-ai-eb64e",
  storageBucket: "community-hero-ai-eb64e.firebasestorage.app",
  messagingSenderId: "157606837191",
  appId: "1:157606837191:web:0369a234668478829637e2",
  measurementId: "G-3V3DWCVS1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export default app;