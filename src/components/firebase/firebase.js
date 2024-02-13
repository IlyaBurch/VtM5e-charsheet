// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNN4re12asS_FXF2iCSWmz35pIMADkPhY",
  authDomain: "vtm5e-charsheet.firebaseapp.com",
  projectId: "vtm5e-charsheet",
  storageBucket: "vtm5e-charsheet.appspot.com",
  messagingSenderId: "507385361268",
  appId: "1:507385361268:web:03002d700dd35f6f8b7221",
  measurementId: "G-0P3ZC3B1RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {auth, storage, analytics}