import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACyYnI8F0mpljmpIPrA1ULl-QDLKrOEj4",
  authDomain: "clone-2709a.firebaseapp.com",
  projectId: "clone-2709a",
  storageBucket: "clone-2709a.appspot.com",
  messagingSenderId: "624199227506",
  appId: "1:624199227506:web:15fde8ad5c2482a6fb0aeb",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
