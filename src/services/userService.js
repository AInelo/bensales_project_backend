// /* eslint-disable import/no-anonymous-default-export */
// import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage } from '../config/firebase';

// // Créer ou mettre à jour les données utilisateur
// export const saveUserData = async (userId, userData, logoFile, aboutImageFile) => {
//   try {
//     // Upload des images vers Firebase Storage
//     const logoRef = ref(storage, `logos/${userId}/${logoFile.name}`);
//     const aboutImageRef = ref(storage, `aboutImages/${userId}/${aboutImageFile.name}`);
    
//     await uploadBytes(logoRef, logoFile);
//     await uploadBytes(aboutImageRef, aboutImageFile);

//     const logoURL = await getDownloadURL(logoRef);
//     const aboutImageURL = await getDownloadURL(aboutImageRef);

//     // Mise à jour des données utilisateur avec les URLs des images
//     await setDoc(doc(db, "users", userId), {
//       ...userData,
//       logo: logoURL,
//       aboutImage: aboutImageURL
//     });
//   } catch (error) {
//     console.error("Error saving user data: ", error);
//   }
// };

// // Récupérer les données utilisateur
// export const getUserData = async (userId) => {
//   try {
//     const docRef = doc(db, "users", userId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.error("Error getting user data: ", error);
//   }
// };

// // Mettre à jour les données utilisateur
// export const updateUserData = async (userId, userData) => {
//   try {
//     const docRef = doc(db, "users", userId);
//     await updateDoc(docRef, userData);
//   } catch (error) {
//     console.error("Error updating user data: ", error);
//   }
// };

// // export default {saveUserData, getUserData, updateUserData}





/* eslint-disable import/no-anonymous-default-export */
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firebase';

// Créer ou mettre à jour les données utilisateur
export const saveUserData = async (userId, userData, logoFile, aboutImageFile) => {
  try {
    let logoURL = "";
    let aboutImageURL = "";

    // Upload des images si elles sont fournies
    if (logoFile) {
      const logoRef = ref(storage, `logos/${userId}/${logoFile.name}`);
      await uploadBytes(logoRef, logoFile);
      logoURL = await getDownloadURL(logoRef);
    }

    if (aboutImageFile) {
      const aboutImageRef = ref(storage, `aboutImages/${userId}/${aboutImageFile.name}`);
      await uploadBytes(aboutImageRef, aboutImageFile);
      aboutImageURL = await getDownloadURL(aboutImageRef);
    }

    // Mettre à jour les données avec les URLs des images
    await setDoc(doc(db, "users", userId), {
      ...userData,
      logo: logoURL || userData.logo,
      aboutImage: aboutImageURL || userData.aboutImage
    }, { merge: true }); // Merge pour ne pas écraser les anciennes données
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

// Récupérer les données utilisateur
export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document! Creating a new one...");
      const defaultData = {
        logo: "",
        textAboutFirst: "",
        textAboutSecond: "",
        linkBehance: "",
        linkLinkedIn: "",
        linkInstagram: "",
        email: "default@example.com",
        aboutImage: "",
        password: ""
      };
      await setDoc(docRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
  }
};

// Mettre à jour les données utilisateur
export const updateUserData = async (userId, userData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
};
