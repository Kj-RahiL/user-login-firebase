import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDC5NELMRWj_ks5p97Z1uRKK82DQ5-76RA",
    authDomain: "user-login-14735.firebaseapp.com",
    projectId: "user-login-14735",
    storageBucket: "user-login-14735.appspot.com",
    messagingSenderId: "596072172105",
    appId: "1:596072172105:web:00d201811120f10cac8d98"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export default auth;