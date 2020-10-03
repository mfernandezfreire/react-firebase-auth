import React, { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import SecureArea from "../SecureArea/SecureArea";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { auth } from "../../firebase";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(null);
        }
      });
    };
    fetchUser();
  }, []);

  const PrivateRoute = ({ component, path, ...rest }) => {
    if (localStorage.getItem("user")) {
      const usuarioStorage = JSON.parse(localStorage.getItem("user"));
      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to="/login" {...rest} />;
      }
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar />

        <Switch>
          <PrivateRoute component={SecureArea} path="/" exact />
          <Route component={Login} path="/login" exact />
        </Switch>
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;
