import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserInfosManagePage from "./pages/UserInfosManagePage";
import ProjectManagePage from "./pages/ProjectManagePage";
import CarrouselManagePage from "./pages/CarrouselManagePage";
import { auth } from "./config/firebase";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Si l'utilisateur est déjà connecté, redirige vers /admin */}
        <Route
          path="/login"
          element={user ? <Navigate to="/admin" /> : <LoginPage />}
        />

        <Route
          path="/admin/user-manage"
          element={<PrivateRoute element={<UserInfosManagePage />} />}
        />

        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPage />} />}
        />

        <Route
          path="/admin/carousel-manage"
          element={<PrivateRoute element={<CarrouselManagePage />} />}
        />
        <Route
          path="/admin/project-manage"
          element={<PrivateRoute element={<ProjectManagePage />} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

// Composant PrivateRoute pour protéger les routes
const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

export default App;
