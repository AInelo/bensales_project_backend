// import logo from './logo.svg';
// import './App.css';
// import { Auth } from './components/auth';
// function App() {
//   return (
//     <div className="">
//       <Auth/>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { auth } from './config/firebase';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/admin" component={AdminPage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

// Composant PrivateRoute pour la protection des routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = auth.currentUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
