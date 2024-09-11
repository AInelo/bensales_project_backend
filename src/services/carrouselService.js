// /* eslint-disable import/no-anonymous-default-export */
// import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage } from '../config/firebase';

// // Créer ou mettre à jour les données du carrousel
// export const saveCarrouselData = async (carrouselId, imageFiles) => {
//   try {
//     const imageURLs = [];
//     for (const file of imageFiles) {
//       const imageRef = ref(storage, `carousels/${carrouselId}/${file.name}`);
//       await uploadBytes(imageRef, file);
//       const imageURL = await getDownloadURL(imageRef);
//       imageURLs.push(imageURL);
//     }
//     await setDoc(doc(db, "carousels", carrouselId), {
//       images: imageURLs
//     });
//   } catch (error) {
//     console.error("Error saving carrousel data: ", error);
//   }
// };

// // Récupérer les données du carrousel
// export const getCarrouselData = async (carrouselId) => {
//   try {
//     const docRef = doc(db, "carousels", carrouselId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.error("Error getting carrousel data: ", error);
//   }
// };

// // Mettre à jour les données du carrousel
// export const updateCarrouselData = async (carrouselId, imageFiles) => {
//   try {
//     const imageURLs = [];
//     for (const file of imageFiles) {
//       const imageRef = ref(storage, `carousels/${carrouselId}/${file.name}`);
//       await uploadBytes(imageRef, file);
//       const imageURL = await getDownloadURL(imageRef);
//       imageURLs.push(imageURL);
//     }
//     await updateDoc(doc(db, "carousels", carrouselId), {
//       images: imageURLs
//     });
//   } catch (error) {
//     console.error("Error updating carrousel data: ", error);
//   }
// };


// // export default { saveCarrouselData, getCarrouselData, updateCarrouselData }


/* eslint-disable import/no-anonymous-default-export */
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firebase';

// Créer ou mettre à jour les données du carrousel
export const saveCarrouselData = async (carrouselId, imageFiles) => {
  try {
    const imageURLs = [];
    for (const file of imageFiles) {
      const imageRef = ref(storage, `carousels/${carrouselId}/${file.name}`);
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      imageURLs.push(imageURL);
    }
    await setDoc(doc(db, "carousels", carrouselId), {
      images: imageURLs
    });
  } catch (error) {
    console.error("Error saving carrousel data: ", error);
  }
};

// Récupérer les données du carrousel
export const getCarrouselData = async (carrouselId) => {
  try {
    const docRef = doc(db, "carousels", carrouselId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document! Creating a new one...");
      return { images: [] }; // Renvoie une structure par défaut
    }
  } catch (error) {
    console.error("Error getting carrousel data: ", error);
  }
};

// Mettre à jour les données du carrousel
export const updateCarrouselData = async (carrouselId, imageFiles) => {
  try {
    const imageURLs = [];
    for (const file of imageFiles) {
      const imageRef = ref(storage, `carousels/${carrouselId}/${file.name}`);
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      imageURLs.push(imageURL);
    }
    await updateDoc(doc(db, "carousels", carrouselId), {
      images: imageURLs
    });
  } catch (error) {
    console.error("Error updating carrousel data: ", error);
  }
};
