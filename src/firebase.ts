import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD99666drVz_ZYI3wx75IAkSDb4Pn8-IwM",
  authDomain: "cis-371-4eff3.firebaseapp.com",
  projectId: "cis-371-4eff3",
  storageBucket: "cis-371-4eff3.firebasestorage.app",
  messagingSenderId: "772947264565",
  appId: "1:772947264565:web:214eb352e7f99894da1d7c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;


