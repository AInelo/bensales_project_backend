import React, { useState, useEffect } from 'react';
import { getUserData, saveUserData } from '../services/userService';
import {getCarrouselData, saveCarrouselData} from "../services/carrouselService"

const AdminPage = () => {
  const [userData, setUserData] = useState(null);
//   const [carrouselData, setCarrouselData] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData('qkwBuoEernVFsBDq7bqFrTwa0ru1'); 
      setUserData(user);
    //   const carrousel = await getCarrouselData('carrouselId');
    //   setCarrouselData(carrousel.images);
    };
    fetchData();
  }, []);

  const handleSaveUser = async () => {
    if (logoFile && aboutImageFile) {
      await saveUserData('qkwBuoEernVFsBDq7bqFrTwa0ru1', { email, password }, logoFile, aboutImageFile);
    } else {
      await saveUserData('qkwBuoEernVFsBDq7bqFrTwa0ru1', { email, password });
    }
  };

//   const handleSaveCarrousel = async (imageFiles) => {
//     await saveCarrouselData('carrouselId', imageFiles);
//   };

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <h1>Admin Page</h1>
      <div className='flex flex-col items-center justify-center'>
        <h2>Manage User</h2>

        <label htmlFor='name'>Ton email</label>
        <input 
          type="email"
          id='email'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />

        <label > ton Mot de pass </label>
        <input 
          type="password"
          id='password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />

        <label htmlFor='logo' > Ton Logo</label>
        <input 
          type="file"
          id='logo'
          onChange={(e) => setLogoFile(e.target.files[0])} 
          accept="image/*" 
        />

        <label htmlFor='aboutPageImage'> Ton image de la page About</label>
        <input 
          type="file"
          id='aboutPageImage'
          onChange={(e) => setAboutImageFile(e.target.files[0])} 
          accept="image/*" 
        />
        <button  onClick={handleSaveUser}>Save User Data</button>
      </div>

      {/* <div>
        <h2>Manage Carrousel</h2>
        <button onClick={() => handleSaveCarrousel()}>Save Carrousel Data</button>
      </div> */}
    </div>
  );
};

export default AdminPage;
