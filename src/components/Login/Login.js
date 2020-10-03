import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  loginUserWithGoogle,
  loginUserWithEmail,
  signInWithEmail,
  setError,
} from "../../redux/user";

import { withRouter } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();

  const loading = useSelector((store) => store.userloading);
  const active = useSelector((store) => store.user.active);
  const error = useSelector((store) => store.user.error);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [esRegistro, setEsRegistro] = useState(false);

  useEffect(() => {
    if (active) {
      props.history.push("/");
    }
  }, [active, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !pass.trim()) {
      console.log("Datos vacíos email!");
      dispatch(setError("Datos vacíos email!"));
      return;
    }
    if (!pass.trim()) {
      console.log("Datos vacíos pass!");
      dispatch(setError("Datos vacíos pass!"));
      return;
    }
    if (pass.length < 6) {
      console.log("6 o más carácteres");
      dispatch(setError("6 o más carácteres en pass"));
      return;
    }
    dispatch(setError(null));
    if (esRegistro) {
      dispatch(signInWithEmail(email, pass));
    } else {
      dispatch(loginUserWithEmail(email, pass));
    }
  };

  return (
    <div className="mt-5 text-center">
      <h3 className="text-center">{esRegistro ? "Registro" : "Login"}</h3>
      <hr />

      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          {!esRegistro && (
            <button
              className="btn btn-dark btn-block mb-3"
              onClick={() => dispatch(loginUserWithGoogle())}
              disabled={loading}
            >
              Acceder con Google
            </button>
          )}
          <form onSubmit={handleSubmit}>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese Contraseña"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button className="btn btn-lg btn-dark btn-block" type="submit">
              {esRegistro ? "Registrar" : "Acceder"}
            </button>
            <button
              className="btn btn-sm btn-info btn-block"
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {esRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            </button>
            {/* {!esRegistro ? (
              <button
                className="btn btn-lg btn-danger btn-sm mt-2"
                type="button"
                onClick={() => props.history.push("/reset")}
              >
                Recuperar contraseña
              </button>
            ) : null} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
