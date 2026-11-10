
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFi4gQP0iIpnnETDMhC7-eJfapH5s7GWs",
  authDomain: "testprojectreactlogin.firebaseapp.com",
  projectId: "testprojectreactlogin",
  storageBucket: "testprojectreactlogin.firebasestorage.app",
  messagingSenderId: "810923904623",
  appId: "1:810923904623:web:9572c8ef783ce7ac23879a",
  measurementId: "G-153M8NDZXL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
