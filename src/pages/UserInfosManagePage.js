// import React, { useEffect, useState } from "react";
// import { getUserData, saveUserData } from "../services/userService";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage, db } from "../config/firebase"; // Assurez-vous que ces imports sont corrects

// const UserInfosManagePage = () => {
//   const [userData, setUserData] = useState(null);
//   const [email, setEmail] = useState("");
//   const [logoFile, setLogoFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const user = await getUserData("qkwBuoEernVFsBDq7bqFrTwa0ru1");
//       if (user) {
//         setUserData(user);
//         setEmail(user.email);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       setEmail(userData.email);
//     }
//   }, [userData]);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLoading(true);
//       const userId = "qkwBuoEernVFsBDq7bqFrTwa0ru1"; // Assurez-vous que l'ID utilisateur est correct
//       const logoRef = ref(storage, `logos/${userId}/${file.name}`);
//       try {
//         await uploadBytes(logoRef, file);
//         const logoURL = await getDownloadURL(logoRef);
//         await saveUserData(userId, { ...userData, logo: logoURL }, null, null); // Met à jour l'URL du logo dans Firestore
//         setUserData({ ...userData, logo: logoURL });
//       } catch (error) {
//         console.error("Error uploading image: ", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSave = async () => {
//     const userId = "qkwBuoEernVFsBDq7bqFrTwa0ru1"; // Assurez-vous que l'ID utilisateur est correct
//     await saveUserData(userId, { ...userData, email }, null, null);
//   };

//   return (
//     <div>
//       {userData ? (
//         <div>
//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="mb-4"
//           />
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <img
//               className="w-32 h-32 object-cover rounded-md"
//               alt="user-logo"
//               src={userData.logo}
//             />
//           )}
//           <input
//             type="text"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Email"
//             className="p-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p>Mot de passe: {userData.password}</p>
//           <button
//             onClick={handleSave}
//             className="mt-4 p-2 bg-blue-500 text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       ) : (
//         <div>Aucun profil trouvé pour cette ID</div>
//       )}
//     </div>
//   );
// };

// export default UserInfosManagePage;























import React, { useEffect, useState } from "react";
import { getUserData, saveUserData } from "../services/userService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import ImageUpload from "../components/ImageUpload";


const UserInfosManagePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData("qkwBuoEernVFsBDq7bqFrTwa0ru1");
      if (user) {
        setUserData(user);
        setFormData(user); // Initialiser les données du formulaire avec userData
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const userId = "qkwBuoEernVFsBDq7bqFrTwa0ru1"; // Assurez-vous que l'ID utilisateur est correct
      const imageRef = ref(storage, `logos/${userId}/${file.name}`);
      try {
        await uploadBytes(imageRef, file);
        const imageURL = await getDownloadURL(imageRef);
        setFormData((prevData) => ({
          ...prevData,
          logo: imageURL,
        }));
      } catch (error) {
        console.error("Error uploading image: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    const userId = "qkwBuoEernVFsBDq7bqFrTwa0ru1"; // Assurez-vous que l'ID utilisateur est correct
    await saveUserData(userId, formData);
  };

  const renderInputFields = () => {
    return Object.keys(userData).map((key) => {
      const value = formData[key] || ""; // Valeur par défaut vide si pas encore défini
      const isImageField = key === "logo" || key === "aboutImage";

      return (
        <div className="flex flex-col justify-center items-center">
          <div key={key} className="mb-4">
            <label className="block font-medium mb-1">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            {isImageField ? (
              <>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                 {/* <ImageUpload 
                  alt = {key}
                  onChange = {handleImageChange}
                  src = {formData[key]}
                  /> */}
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <img
                    className="w-32 h-32 object-cover rounded-md"
                    alt={key}
                    src={formData[key]}
                  />
                  // <ImageUpload 
                  // alt = {key}
                  // src = {formData[key]}
                  // />
                )}
              </>
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                placeholder={key}
                className="p-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        {userData ? (
          <div>
            {renderInputFields()}

            <button
              onClick={handleSave}
              className="mt-4 p-2 bg- text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div>Aucun profil trouvé pour cette ID</div>
        )}
      </div>
    </div>
  );
};

















export default UserInfosManagePage;
