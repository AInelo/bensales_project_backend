// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGKg_DnAsuJLxE1IZROfctDDMTZZGkU74",
  authDomain: "tony-portfolio-e4e57.firebaseapp.com",
  projectId: "tony-portfolio-e4e57",
  storageBucket: "tony-portfolio-e4e57.appspot.com",
  messagingSenderId: "766985326008",
  appId: "1:766985326008:web:1bb7e775948033c7ef934d",
  measurementId: "G-D9W18HRP9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const userData = {
//   logo : "lien de l'image vers le logo dans FireStorage",
//   textAboutFirst : "texte",
//   textAboutSecond : "Texte",
//   linkBehance : "lien vers son Behance",
//   linkLinkedInd : "lien vers son linkedIn",
//   linkInstagram : "lien vers son Instagram",
//   email : "email",
//   aboutImage: "lien vers l'image About dans FireStorage",
//   password : ""
// }

// const carrouselData = [
  
// ]