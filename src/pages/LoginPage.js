import { auth } from '../config/firebase';


import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Redirection vers la page admin après connexion réussie
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

















// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';


// const LoginPage = ({ history }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       history.push('/admin'); // Redirection vers la page admin après connexion réussie
//     } catch (error) {
//       console.error("Error signing in: ", error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           placeholder="Email" 
//           required 
//         />
//         <input 
//           type="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           placeholder="Password" 
//           required 
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
