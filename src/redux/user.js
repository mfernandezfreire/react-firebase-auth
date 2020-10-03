import { auth, firebase } from "../firebase";

//Initial Data
const initialData = {
  loading: false,
  active: false,
  error: null,
};

//types
const LOADING = "LOADING";
const USER_ERROR = "USER_ERROR";
const USER_ERROR_EMAIL = "USER_ERROR_EMAIL";
const USER_SUCCESS = "USER_SUCCES";
const LOGOUT = "LOGOUT";

//reducer
export default function userReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case USER_ERROR:
      return { ...initialData };
    case USER_ERROR_EMAIL:
      return { ...initialData, error: action.payload };
    case USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, active: true };
    case LOGOUT:
      return { ...initialData };
    default:
      return { ...state };
  }
}

//action
export const setError = (error) => (dispatch) => {
  dispatch({
    type: USER_ERROR_EMAIL,
    payload: error,
  });
};
export const loginUserWithGoogle = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);
    dispatch({
      type: USER_SUCCESS,
      payload: {
        uid: res.user.uid,
        email: res.user.email,
      },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ERROR,
    });
  }
};

export const loginUserWithEmail = (email, pass) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const res = await auth.signInWithEmailAndPassword(email, pass);
    dispatch({
      type: USER_SUCCESS,
      payload: {
        uid: res.user.uid,
        email: res.user.email,
      },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
      })
    );
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      dispatch({
        type: USER_ERROR_EMAIL,
        payload: "Email no valido",
      });
    }
    if (error.code === "auth/user-not-found") {
      dispatch({
        type: USER_ERROR_EMAIL,
        payload: "Email no registrado",
      });
    }
    if (error.code === "auth/wrong-password") {
      dispatch({
        type: USER_ERROR_EMAIL,
        payload: "Contraseña incorrecta",
      });
    }
  }
};

export const signInWithEmail = (email, pass) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const res = await auth.createUserWithEmailAndPassword(email, pass);
    dispatch({
      type: USER_SUCCESS,
      payload: {
        uid: res.user.uid,
        email: res.user.email,
      },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
      })
    );
  } catch (error) {
    console.log(error);
    if (error.code === "auth/invalid-email") {
      dispatch({
        type: USER_ERROR_EMAIL,
        payload: "Email no valido",
      });
    }
    if (error.code === "auth/email-already-in-use") {
      dispatch({
        type: USER_ERROR_EMAIL,
        payload: "Email ya registrado",
      });
    }
    if (error.code === "auth/wrong-password") {
      dispatch({
        type: USER_ERROR_EMAIL,
        payload: "Contraseña incorrecta",
      });
    }
  }
};

export const checkUserActive = () => (dispatch) => {
  if (localStorage.getItem("user")) {
    dispatch({
      type: USER_SUCCESS,
      payload: JSON.parse(localStorage.getItem("user")),
    });
  }
};

export const logOutUser = () => (dispatch) => {
  auth.signOut();
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
};
