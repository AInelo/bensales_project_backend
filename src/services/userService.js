
/* eslint-disable import/no-anonymous-default-export */
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject,uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firebase';
import { auth } from "../config/firebase";

// Créer ou mettre à jour les données utilisateur
// export const saveUserData = async (userId, userData, logoFile, aboutImageFile) => {
//   try {
    
//     await setDoc(doc(db, "users", userId), {
//       ...userData,
//       logo: await formatUrlLinkToImage(logoFile, userId) || userData.logo,
//       aboutImage: await formatUrlLinkToImage(aboutImageFile, userId) || userData.aboutImage
//     }, { merge: true }); // Merge pour ne pas écraser les anciennes données
//   } catch (error) {
//     console.error("Error saving user data: ", error);
//   }
// };

// const formatUrlLinkToImage = async (imageFile, userId) => {
//   let imageUrl = "";
//   if (imageFile) {
//     const logoRef = ref(storage, `logos/${userId}/${imageFile.name}`);
//     await uploadBytes(logoRef, imageFile);
//     imageUrl = await getDownloadURL(logoRef);
//   }

//   return imageUrl
// }


export const saveUserData = async (userId, userData, logoFile, aboutImageFile) => {
  try {
    // Obtenez les données utilisateur existantes pour vérifier les anciennes images
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const existingUserData = userDoc.data();
    
    // Supprimer les anciennes images si elles existent
    if (existingUserData) {
      if (existingUserData.logo) {
        const oldLogoRef = ref(storage, existingUserData.logo);
        await deleteObject(oldLogoRef);
      }
      if (existingUserData.aboutImage) {
        const oldAboutImageRef = ref(storage, existingUserData.aboutImage);
        await deleteObject(oldAboutImageRef);
      }
    }

    // Télécharger les nouvelles images et obtenir les URLs
    const newLogoUrl = await formatUrlLinkToImage(logoFile, userId, 'logos');
    const newAboutImageUrl = await formatUrlLinkToImage(aboutImageFile, userId, 'aboutImages');

    // Mettre à jour les données utilisateur dans Firestore
    await setDoc(userDocRef, {
      ...userData,
      logo: newLogoUrl || userData.logo,
      aboutImage: newAboutImageUrl || userData.aboutImage
    }, { merge: true });

  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

const formatUrlLinkToImage = async (imageFile, userId, folder) => {
  let imageUrl = "";
  if (imageFile) {
    const imageRef = ref(storage, `${folder}/${userId}/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    imageUrl = await getDownloadURL(imageRef);
  }

  return imageUrl;
}







export const getUserData = async (userId) => {
  try {
    const userDetailFromAuth = getUserDetailFromAuthentification(userId); // Cette fonction peut être synchrone
    const userDetailFromFirestore = await getUserDetailFromFirestore(userId); // Assurez-vous que c'est bien une promesse

    // Si les emails correspondent, retourner les détails Firestore, sinon null
    if (userDetailFromAuth && userDetailFromFirestore && userDetailFromAuth.email === userDetailFromFirestore.email) {
      return userDetailFromFirestore;
    } else {
      return null; // Si les emails ne correspondent pas ou en cas d'erreur
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
    return null;
  }
};

const getUserDetailFromAuthentification = (userId) => {
  const user = auth.currentUser;

  if (user && user.uid === userId) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    };
  } else {
    console.error("Utilisateur non authentifié ou mauvais ID utilisateur.");
    return null;
  }
};

const getUserDetailFromFirestore = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data(); 
    } else {
      console.error("Aucun utilisateur trouvé dans Firestore pour cet ID.");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des détails depuis Firestore :", error);
    return null;
  }
};
















const defaultDataProvider = async (userId) => {
  const docRef = doc(db, "users", userId);
  console.log("No such document! Creating a new one...");
  const defaultData = {
    logo: "",
    textAboutFirst: "",
    textAboutSecond: "",
    linkBehance: "",
    linkLinkedIn: "",
    linkInstagram: "",
    email: "tony@example.com",
    aboutImage: "",
    password: ""
  };
  await setDoc(docRef, defaultData);
  return defaultData;
}






// Mettre à jour les données utilisateur
export const updateUserData = async (userId, userData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
};
