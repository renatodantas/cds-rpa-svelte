// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGDEqZWLW7g3CXsorvWbTdFqbOYdiv7-c",
  authDomain: "cds-rpa.firebaseapp.com",
  databaseURL: "https://cds-rpa-default-rtdb.firebaseio.com",
  projectId: "cds-rpa",
  storageBucket: "cds-rpa.appspot.com",
  messagingSenderId: "43651692855",
  appId: "1:43651692855:web:96a310edfb4f63f04182b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);