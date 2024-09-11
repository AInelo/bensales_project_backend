
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Remplace Redirect par Navigate
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { auth } from './config/firebase';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute component={AdminPage} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

// Composant PrivateRoute pour protéger les routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = auth.currentUser;
  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default App;
