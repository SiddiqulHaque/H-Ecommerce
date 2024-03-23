import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZORq6Y5IGBbAzHpjj4LFhOUozsMGxUGQ",
  authDomain: "h-ecommerce-aab8d.firebaseapp.com",
  projectId: "h-ecommerce-aab8d",
  storageBucket: "h-ecommerce-aab8d.appspot.com",
  messagingSenderId: "226454099263",
  appId: "1:226454099263:web:8845f68672978d1eb96f8a",
  measurementId: "G-PD7CYX5JZJ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
