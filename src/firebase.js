import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6jG4mDgpFFJw99zbq7X6AJBJ_87n7hic",
  authDomain: "react-firebase-auth-7b48a.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-7b48a.firebaseio.com",
  projectId: "react-firebase-auth-7b48a",
  storageBucket: "react-firebase-auth-7b48a.appspot.com",
  messagingSenderId: "401508977493",
  appId: "1:401508977493:web:28e255b17fa45e83ed3ddc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };
