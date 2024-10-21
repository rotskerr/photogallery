import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUBtt6Dk2dNuEIkaa-Hn6cACari788LRk",
  authDomain: "photogallery-c3c17.firebaseapp.com",
  projectId: "photogallery-c3c17",
  storageBucket: "photogallery-c3c17.appspot.com",
  messagingSenderId: "150403057720",
  appId: "1:150403057720:web:03fea67c9cee4cc0963ecd",
};

let app;
let auth, storage, db, firestore;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
  db = getFirestore(app);
  firestore = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase: ", error);
}

export { app, auth, storage, db, firestore };
