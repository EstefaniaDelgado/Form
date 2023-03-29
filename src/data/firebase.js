import firebase from 'firebase/compat/app'
import  "firebase/compat/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_API_KEY,
    authDomain:import.meta.env.VITE_AUTODOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_MESSAGIN_SENDER_ID,
    appId:import.meta.env.VITE_APP_ID
  };
  
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  //Conexion with fb
 export const db = fb.firestore();

 

