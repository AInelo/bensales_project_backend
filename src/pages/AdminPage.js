import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import  getUserData  from '../services/userService';
import  saveUserData  from '../services/userService';
import  getCarrouselData from '../services/carrouselService';
import  saveCarrouselData  from '../services/carrouselService';

const AdminPage = () => {
  const [userData, setUserData] = useState(null);
  const [carrouselData, setCarrouselData] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData('uniqueUserId'); // Utilisez un ID d'utilisateur unique pour récupérer les données
      setUserData(user);
      const carrousel = await getCarrouselData('carrouselId'); // Utilisez un ID de carrousel pour récupérer les données
      setCarrouselData(carrousel.images);
    };
    fetchData();
  }, []);

  const handleSaveUser = async () => {
    if (logoFile && aboutImageFile) {
      await saveUserData('uniqueUserId', { email, password }, logoFile, aboutImageFile);
    } else {
      await saveUserData('uniqueUserId', { email, password });
    }
  };

  const handleSaveCarrousel = async (imageFiles) => {
    await saveCarrouselData('carrouselId', imageFiles);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Manage User</h2>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <input 
          type="file" 
          onChange={(e) => setLogoFile(e.target.files[0])} 
          accept="image/*" 
        />
        <input 
          type="file" 
          onChange={(e) => setAboutImageFile(e.target.files[0])} 
          accept="image/*" 
        />
        <button onClick={handleSaveUser}>Save User Data</button>
      </div>

      <div>
        <h2>Manage Carrousel</h2>
        {/* Ajouter des inputs pour uploader des images du carrousel */}
        <button onClick={() => handleSaveCarrousel(/* liste des fichiers image */)}>Save Carrousel Data</button>
      </div>
    </div>
  );
};

export default AdminPage;
